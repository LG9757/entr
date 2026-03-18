import { createServer } from 'node:http'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')
const dataFile = join(dataDir, 'store.json')

const catalog = {
  'recognising-ai-content-in-finance': {
    slug: 'recognising-ai-content-in-finance',
    title: 'Recognising AI Content in Finance',
    access: 'included',
    modules: [
      { moduleNumber: 1, lessons: 10, title: 'Introduction to AI in Finance' },
      { moduleNumber: 2, lessons: 8, title: 'Detecting AI-Generated Reports' },
      { moduleNumber: 3, lessons: 7, title: 'AI in Market Analysis' },
      { moduleNumber: 4, lessons: 7, title: 'Financial News Authentication' },
      { moduleNumber: 5, lessons: 8, title: 'Regulatory Compliance' },
      { moduleNumber: 6, lessons: 7, title: 'Case Studies and Applications' },
    ],
  },
  'real-vs-ai': {
    slug: 'real-vs-ai',
    title: 'Real vs AI: Master the Art of Detection',
    access: 'premium',
    modules: [
      { moduleNumber: 1, lessons: 8, title: 'Text Detection Fundamentals' },
      { moduleNumber: 2, lessons: 10, title: 'Image Analysis Techniques' },
      { moduleNumber: 3, lessons: 7, title: 'Audio and Voice Cloning Detection' },
      { moduleNumber: 4, lessons: 9, title: 'Video Verification Workflows' },
      { moduleNumber: 5, lessons: 8, title: 'Prompting, Provenance, and Metadata' },
      { moduleNumber: 6, lessons: 9, title: 'Real-World Case Studies' },
      { moduleNumber: 7, lessons: 9, title: 'Team Playbooks and Review Operations' },
      { moduleNumber: 8, lessons: 9, title: 'Capstone Assessment' },
    ],
  },
}

function ensureStore() {
  mkdirSync(dataDir, { recursive: true })

  if (!existsSync(dataFile)) {
    const initial = {
      users: [],
      sessions: [],
      enrollments: [],
      lessonProgress: [],
      moduleProgress: [],
    }

    writeFileSync(dataFile, JSON.stringify(initial, null, 2))
  }
}

function readStore() {
  ensureStore()
  return JSON.parse(readFileSync(dataFile, 'utf8'))
}

function writeStore(store) {
  writeFileSync(dataFile, JSON.stringify(store, null, 2))
}

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  })
  res.end(JSON.stringify(payload))
}

function notFound(res) {
  json(res, 404, { error: 'Not found' })
}

function badRequest(res, message) {
  json(res, 400, { error: message })
}

function unauthorized(res) {
  json(res, 401, { error: 'Unauthorized' })
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk
      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'))
      }
    })

    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    req.on('error', reject)
  })
}

function makeId(prefix) {
  return `${prefix}_${randomBytes(8).toString('hex')}`
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = scryptSync(password, salt, 64).toString('hex')
  return { salt, hash }
}

function verifyPassword(password, salt, expectedHash) {
  const actual = scryptSync(password, salt, 64)
  const expected = Buffer.from(expectedHash, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

function getAuthToken(req) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return null
  return header.slice('Bearer '.length)
}

function getAuthenticatedUser(req, store) {
  const token = getAuthToken(req)
  if (!token) return null

  const session = store.sessions.find(item => item.token === token)
  if (!session) return null

  return store.users.find(user => user.id === session.userId) ?? null
}

function ensureDefaultEnrollment(store, userId) {
  const existing = store.enrollments.find(
    enrollment => enrollment.userId === userId && enrollment.courseSlug === 'recognising-ai-content-in-finance'
  )

  if (existing) return

  store.enrollments.push({
    id: makeId('enrollment'),
    userId,
    courseSlug: 'recognising-ai-content-in-finance',
    status: 'active',
    purchasedAt: new Date().toISOString(),
  })
}

function getEnrollment(store, userId, courseSlug) {
  return store.enrollments.find(
    enrollment => enrollment.userId === userId && enrollment.courseSlug === courseSlug && enrollment.status === 'active'
  )
}

function getCourseProgress(store, userId, courseSlug) {
  const course = catalog[courseSlug]
  if (!course) return null

  const passedModuleNumbers = new Set(
    store.moduleProgress
      .filter(entry => entry.userId === userId && entry.courseSlug === courseSlug)
      .map(entry => entry.moduleNumber)
  )

  const completedLessonIds = new Set(
    store.lessonProgress
      .filter(entry => entry.userId === userId && entry.courseSlug === courseSlug)
      .map(entry => entry.lessonId)
  )

  const modules = course.modules.map(module => {
    const unlocked = module.moduleNumber === 1 || passedModuleNumbers.has(module.moduleNumber - 1)
    return {
      moduleNumber: module.moduleNumber,
      title: module.title,
      lessons: module.lessons,
      unlocked,
      passed: passedModuleNumbers.has(module.moduleNumber),
    }
  })

  return {
    courseSlug,
    completedLessons: completedLessonIds.size,
    totalLessons: course.modules.reduce((sum, module) => sum + module.lessons, 0),
    passedModules: passedModuleNumbers.size,
    totalModules: course.modules.length,
    modules,
  }
}

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    notFound(res)
    return
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    })
    res.end()
    return
  }

  const url = new URL(req.url, 'http://localhost')
  const pathname = url.pathname
  const store = readStore()

  try {
    if (req.method === 'GET' && pathname === '/health') {
      json(res, 200, { status: 'ok' })
      return
    }

    if (req.method === 'GET' && pathname === '/catalog') {
      json(res, 200, { courses: Object.values(catalog) })
      return
    }

    if (req.method === 'POST' && pathname === '/auth/register') {
      const body = await parseBody(req)
      const email = String(body.email ?? '').trim().toLowerCase()
      const password = String(body.password ?? '')
      const name = String(body.name ?? '').trim()

      if (!email || !password || !name) {
        badRequest(res, 'name, email, and password are required')
        return
      }

      if (store.users.some(user => user.email === email)) {
        badRequest(res, 'A user with that email already exists')
        return
      }

      const { salt, hash } = hashPassword(password)
      const user = {
        id: makeId('user'),
        name,
        email,
        passwordSalt: salt,
        passwordHash: hash,
        createdAt: new Date().toISOString(),
      }

      store.users.push(user)
      ensureDefaultEnrollment(store, user.id)
      const token = randomBytes(24).toString('hex')
      store.sessions.push({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      })
      writeStore(store)

      json(res, 201, {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      return
    }

    if (req.method === 'POST' && pathname === '/auth/login') {
      const body = await parseBody(req)
      const email = String(body.email ?? '').trim().toLowerCase()
      const password = String(body.password ?? '')
      const user = store.users.find(item => item.email === email)

      if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
        unauthorized(res)
        return
      }

      ensureDefaultEnrollment(store, user.id)
      const token = randomBytes(24).toString('hex')
      store.sessions.push({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      })
      writeStore(store)

      json(res, 200, {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      return
    }

    if (req.method === 'GET' && pathname === '/me') {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const enrollments = store.enrollments.filter(entry => entry.userId === user.id && entry.status === 'active')
      json(res, 200, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        enrollments,
      })
      return
    }

    const accessMatch = pathname.match(/^\/courses\/([^/]+)\/access$/)
    if (req.method === 'GET' && accessMatch) {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const courseSlug = accessMatch[1]
      const course = catalog[courseSlug]
      if (!course) {
        notFound(res)
        return
      }

      const enrollment = getEnrollment(store, user.id, courseSlug)
      json(res, 200, {
        courseSlug,
        hasAccess: Boolean(enrollment),
        enrollment: enrollment ?? null,
      })
      return
    }

    const progressMatch = pathname.match(/^\/courses\/([^/]+)\/progress$/)
    if (req.method === 'GET' && progressMatch) {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const courseSlug = progressMatch[1]
      const enrollment = getEnrollment(store, user.id, courseSlug)
      if (!enrollment) {
        unauthorized(res)
        return
      }

      const progress = getCourseProgress(store, user.id, courseSlug)
      json(res, 200, progress)
      return
    }

    const enrollMatch = pathname.match(/^\/courses\/([^/]+)\/enroll$/)
    if (req.method === 'POST' && enrollMatch) {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const courseSlug = enrollMatch[1]
      const course = catalog[courseSlug]
      if (!course) {
        notFound(res)
        return
      }

      const existing = getEnrollment(store, user.id, courseSlug)
      if (!existing) {
        store.enrollments.push({
          id: makeId('enrollment'),
          userId: user.id,
          courseSlug,
          status: 'active',
          purchasedAt: new Date().toISOString(),
        })
        writeStore(store)
      }

      json(res, 200, {
        courseSlug,
        hasAccess: true,
      })
      return
    }

    const lessonCompleteMatch = pathname.match(/^\/courses\/([^/]+)\/lessons\/([^/]+)\/complete$/)
    if (req.method === 'POST' && lessonCompleteMatch) {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const courseSlug = lessonCompleteMatch[1]
      const lessonId = Number(lessonCompleteMatch[2])
      const body = await parseBody(req)
      const moduleNumber = Number(body.moduleNumber)

      if (!getEnrollment(store, user.id, courseSlug)) {
        unauthorized(res)
        return
      }

      if (!Number.isFinite(lessonId) || !Number.isFinite(moduleNumber)) {
        badRequest(res, 'lessonId and moduleNumber are required')
        return
      }

      const existing = store.lessonProgress.find(
        entry =>
          entry.userId === user.id &&
          entry.courseSlug === courseSlug &&
          entry.lessonId === lessonId &&
          entry.moduleNumber === moduleNumber
      )

      if (!existing) {
        store.lessonProgress.push({
          id: makeId('lesson_progress'),
          userId: user.id,
          courseSlug,
          moduleNumber,
          lessonId,
          completedAt: new Date().toISOString(),
        })
        writeStore(store)
      }

      json(res, 200, getCourseProgress(store, user.id, courseSlug))
      return
    }

    const modulePassMatch = pathname.match(/^\/courses\/([^/]+)\/modules\/([^/]+)\/pass$/)
    if (req.method === 'POST' && modulePassMatch) {
      const user = getAuthenticatedUser(req, store)
      if (!user) {
        unauthorized(res)
        return
      }

      const courseSlug = modulePassMatch[1]
      const moduleNumber = Number(modulePassMatch[2])
      if (!getEnrollment(store, user.id, courseSlug)) {
        unauthorized(res)
        return
      }

      if (!Number.isFinite(moduleNumber)) {
        badRequest(res, 'moduleNumber must be a number')
        return
      }

      const existing = store.moduleProgress.find(
        entry => entry.userId === user.id && entry.courseSlug === courseSlug && entry.moduleNumber === moduleNumber
      )

      if (!existing) {
        store.moduleProgress.push({
          id: makeId('module_progress'),
          userId: user.id,
          courseSlug,
          moduleNumber,
          passedAt: new Date().toISOString(),
        })
        writeStore(store)
      }

      json(res, 200, getCourseProgress(store, user.id, courseSlug))
      return
    }

    notFound(res)
  } catch (error) {
    json(res, 500, {
      error: error instanceof Error ? error.message : 'Unknown server error',
    })
  }
})

const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(`Backend prototype listening on http://localhost:${port}`)
})
