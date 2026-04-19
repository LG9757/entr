import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AppHeader from '../components/AppHeader'
import { getAuthToken, getCourseAccess } from '../lib/api'
import { getStoredPremiumPurchaseOption, premiumCourse } from '../lib/premiumCourse'

type Employee = {
  id: string
  name: string
  email: string
  team: string
  progress: number
  completedModules: number
  lastActive: string
  status: 'On track' | 'Needs support' | 'Completed'
}

const seatCapByPlan: Record<string, number> = {
  bronze: 20,
  silver: 200,
  gold: 1000,
}

const baseEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ava Carter',
    email: 'ava.carter@gmail.com',
    team: 'Finance Ops',
    progress: 84,
    completedModules: 7,
    lastActive: 'Today',
    status: 'On track',
  },
  {
    id: 'emp-2',
    name: 'Noah Patel',
    email: 'noah.patel@gmail.com',
    team: 'Risk',
    progress: 66,
    completedModules: 5,
    lastActive: 'Yesterday',
    status: 'On track',
  },
  {
    id: 'emp-3',
    name: 'Isla Bennett',
    email: 'isla.bennett@gmail.com',
    team: 'Compliance',
    progress: 31,
    completedModules: 2,
    lastActive: '2 days ago',
    status: 'Needs support',
  },
  {
    id: 'emp-4',
    name: 'Ethan Roberts',
    email: 'ethan.roberts@gmail.com',
    team: 'Trading',
    progress: 100,
    completedModules: 8,
    lastActive: 'Today',
    status: 'Completed',
  },
  {
    id: 'emp-5',
    name: 'Mia Hughes',
    email: 'mia.hughes@gmail.com',
    team: 'Finance Ops',
    progress: 47,
    completedModules: 4,
    lastActive: 'Today',
    status: 'On track',
  },
  {
    id: 'emp-6',
    name: 'Leo Wilson',
    email: 'leo.wilson@gmail.com',
    team: 'Audit',
    progress: 22,
    completedModules: 1,
    lastActive: '4 days ago',
    status: 'Needs support',
  },
  {
    id: 'emp-7',
    name: 'Grace Morgan',
    email: 'grace.morgan@gmail.com',
    team: 'Risk',
    progress: 76,
    completedModules: 6,
    lastActive: 'Today',
    status: 'On track',
  },
  {
    id: 'emp-8',
    name: 'Lucas Shah',
    email: 'lucas.shah@gmail.com',
    team: 'Compliance',
    progress: 58,
    completedModules: 4,
    lastActive: 'Yesterday',
    status: 'On track',
  },
]

const moduleAdoption = [
  { label: 'M1', completion: 94 },
  { label: 'M2', completion: 86 },
  { label: 'M3', completion: 73 },
  { label: 'M4', completion: 61 },
  { label: 'M5', completion: 48 },
  { label: 'M6', completion: 38 },
  { label: 'M7', completion: 25 },
  { label: 'M8', completion: 14 },
]

const weeklyActivity = [18, 23, 27, 31, 29, 36, 40]

export default function PremiumBusinessDashboard() {
  const navigate = useNavigate()
  const selectedOption = getStoredPremiumPurchaseOption()
  const [employees, setEmployees] = useState<Employee[]>(baseEmployees)
  const [displayName, setDisplayName] = useState('')
  const [department, setDepartment] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteError, setInviteError] = useState('')

  const seatCap = seatCapByPlan[selectedOption.id] ?? 20
  const seatsUsed = employees.length
  const seatsRemaining = Math.max(0, seatCap - seatsUsed)

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/')
      return
    }

    if (selectedOption.category !== 'Purchase for your business') {
      navigate('/premium-course/pricing')
      return
    }

    let cancelled = false
    void getCourseAccess(premiumCourse.slug)
      .then(result => {
        if (!cancelled && !result.hasAccess) {
          navigate('/premium-course/payment')
        }
      })
      .catch(() => {
        if (!cancelled) {
          navigate('/premium-course/payment')
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate, selectedOption.category])

  const averageProgress = useMemo(() => {
    if (!employees.length) return 0
    return Math.round(employees.reduce((sum, employee) => sum + employee.progress, 0) / employees.length)
  }, [employees])

  const learnersNeedingSupport = useMemo(
    () => employees.filter(employee => employee.status === 'Needs support').length,
    [employees]
  )

  const completedLearners = useMemo(
    () => employees.filter(employee => employee.status === 'Completed').length,
    [employees]
  )

  const newJoiners = useMemo(
    () => employees.filter(employee => employee.lastActive === 'Just added').length,
    [employees]
  )

  const topPerformers = useMemo(
    () => [...employees].sort((left, right) => right.progress - left.progress).slice(0, 3),
    [employees]
  )

  const handleInvite = (event: FormEvent) => {
    event.preventDefault()
    setInviteError('')

    const name = displayName.trim()
    const departmentName = department.trim()
    const email = inviteEmail.trim().toLowerCase()

    if (!name) {
      setInviteError('Please enter a display name for the employee.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteError('Please enter a valid work email address.')
      return
    }

    if (!departmentName) {
      setInviteError('Please enter a department for this employee.')
      return
    }

    if (seatsUsed >= seatCap) {
      setInviteError('Seat limit reached for this plan. Upgrade to add more employees.')
      return
    }

    if (employees.some(employee => employee.email.toLowerCase() === email)) {
      setInviteError('This employee already exists.')
      return
    }

    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name,
      email,
      team: departmentName,
      progress: 0,
      completedModules: 0,
      lastActive: 'Just added',
      status: 'On track',
    }

    setEmployees(previous => [newEmployee, ...previous])
    setDisplayName('')
    setDepartment('')
    setInviteEmail('')
  }

  return (
    <div className="premium-page-root premium-business-root">
      <AppHeader
        title="Business Learning Dashboard"
        subtitle={`${selectedOption.name} plan | ${selectedOption.audience}`}
        backLabel="Back to Premium Course"
        onBack={() => navigate('/premium-course')}
      />

      <main className="business-dashboard-layout">
        <section className="business-kpi-grid">
          <article className="business-kpi-card">
            <div className="business-kpi-label">Seat usage</div>
            <div className="business-kpi-value">
              {seatsUsed}/{seatCap}
            </div>
            <div className="business-kpi-sub">{seatsRemaining} seats available</div>
          </article>

          <article className="business-kpi-card">
            <div className="business-kpi-label">Average progress</div>
            <div className="business-kpi-value">{averageProgress}%</div>
            <div className="business-kpi-sub">{completedLearners} learners fully completed</div>
          </article>

          <article className="business-kpi-card">
            <div className="business-kpi-label">Needs support</div>
            <div className="business-kpi-value">{learnersNeedingSupport}</div>
            <div className="business-kpi-sub">Flagged for manager follow-up</div>
          </article>

          <article className="business-kpi-card">
            <div className="business-kpi-label">New joiners</div>
            <div className="business-kpi-value">{newJoiners}</div>
            <div className="business-kpi-sub">Added in this testing session</div>
          </article>
        </section>

        <section className="business-panel-grid">
          <article className="business-panel">
            <div className="business-panel-title-row">
              <h2>Add employees</h2>
              <span className="business-pill">{selectedOption.name} plan</span>
            </div>
            <p className="business-panel-copy">
              Add team members by display name and email. New entries are added directly to active employees.
            </p>

            <form className="business-invite-form" onSubmit={handleInvite}>
              <input
                type="text"
                className="business-input"
                placeholder="Display name"
                value={displayName}
                onChange={event => {
                  setDisplayName(event.target.value)
                  if (inviteError) setInviteError('')
                }}
              />
              <input
                type="text"
                className="business-input"
                placeholder="Department"
                value={department}
                onChange={event => {
                  setDepartment(event.target.value)
                  if (inviteError) setInviteError('')
                }}
              />
              <input
                type="email"
                className="business-input"
                placeholder="employee@gmail.com"
                value={inviteEmail}
                onChange={event => {
                  setInviteEmail(event.target.value)
                  if (inviteError) setInviteError('')
                }}
              />
              <button type="submit" className="business-invite-btn">
                Add to employees
              </button>
            </form>
            {inviteError && <p className="business-error-text">{inviteError}</p>}
          </article>

          <article className="business-panel">
            <h2>Team analytics</h2>
            <p className="business-panel-copy">Quick snapshots to track completion momentum across your organisation.</p>

            <div className="business-chart-block">
              <div className="business-chart-title">Module adoption</div>
              <div className="business-module-chart">
                {moduleAdoption.map(item => (
                  <div key={item.label} className="business-module-row">
                    <span>{item.label}</span>
                    <div className="business-module-track">
                      <div className="business-module-fill" style={{ width: `${item.completion}%` }} />
                    </div>
                    <span>{item.completion}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="business-chart-block">
              <div className="business-chart-title">Weekly active learners</div>
              <div className="business-activity-bars">
                {weeklyActivity.map((count, index) => (
                  <div key={`${index}-${count}`} className="business-activity-column">
                    <div className="business-activity-value" style={{ height: `${Math.max(22, count * 2)}px` }} />
                    <span>W{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="business-panel">
          <div className="business-panel-title-row">
            <h2>Employee progress</h2>
            <span className="business-muted-text">{employees.length} active employees</span>
          </div>
          <div className="business-table-wrap">
            <table className="business-progress-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Modules</th>
                  <th>Progress</th>
                  <th>Last active</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td>
                      <div className="business-employee-name">{employee.name}</div>
                      <div className="business-employee-email">{employee.email}</div>
                    </td>
                    <td>{employee.team}</td>
                    <td>{employee.completedModules}/8</td>
                    <td>
                      <div className="business-row-progress">
                        <div className="business-row-progress-track">
                          <div className="business-row-progress-fill" style={{ width: `${employee.progress}%` }} />
                        </div>
                        <span>{employee.progress}%</span>
                      </div>
                    </td>
                    <td>{employee.lastActive}</td>
                    <td>
                      <span
                        className={[
                          'business-status-pill',
                          employee.status === 'Completed'
                            ? 'is-complete'
                            : employee.status === 'Needs support'
                              ? 'is-risk'
                              : 'is-track',
                        ].join(' ')}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="business-panel">
          <div className="business-panel-title-row">
            <h2>Top performers</h2>
            <span className="business-muted-text">Mock leaderboard for testing</span>
          </div>
          <div className="business-leaderboard">
            {topPerformers.map((employee, index) => (
              <div key={employee.id} className="business-leader-item">
                <span className="business-rank">#{index + 1}</span>
                <div>
                  <div className="business-employee-name">{employee.name}</div>
                  <div className="business-employee-email">{employee.team}</div>
                </div>
                <span className="business-leader-score">{employee.progress}%</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
