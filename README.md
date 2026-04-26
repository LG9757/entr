# One Guard

`One Guard` is our group project learning platform. It is a React + Vite frontend with a small Node backend prototype for auth, course access, and progress tracking.

The project currently includes:
- a login / signup flow
- a learner dashboard
- a finance course with lesson progress and module unlocking
- a premium course flow with pricing, payment, and a business dashboard
- an `Our Team` page

## Running locally

Install dependencies first:

```powershell
npm install
```

Then use two terminals from [C:\uni\entr](C:\uni\entr).

Terminal 1:

```powershell
npm run server
```

This starts the backend on:
- `http://localhost:4010`

Terminal 2:

```powershell
npm run dev
```

This starts the frontend on:
- `http://localhost:5173`

Open the frontend URL in your browser.

This is enough to test:
- sign up / login
- course access
- lesson completion
- module unlocking
- premium course flows
- business dashboard mock data

## Helpful note for local testing

If the backend is unavailable while working locally, the login page includes a dev bypass button in development mode so the UI can still be tested.

Some reset / dev controls are intentionally restricted and only appear for the admin account.

## Main scripts

```powershell
npm run dev
npm run server
npm run build
```

## Important folders

Frontend:
- [`src/pages`](/C:/uni/entr/src/pages) page-level screens
- [`src/components`](/C:/uni/entr/src/components) shared UI pieces
- [`src/lib/api.ts`](/C:/uni/entr/src/lib/api.ts) frontend API layer
- [`src/lib/courseProgress.ts`](/C:/uni/entr/src/lib/courseProgress.ts) finance course helpers
- [`src/lib/premiumCourse.ts`](/C:/uni/entr/src/lib/premiumCourse.ts) premium course content and pricing data
- [`src/App.css`](/C:/uni/entr/src/App.css) shared styling

Backend:
- [`backend/server.js`](/C:/uni/entr/backend/server.js) backend prototype server
- [`backend/schema.sql`](/C:/uni/entr/backend/schema.sql) suggested future database shape
- `backend/data/store.json` local runtime data store

Assets:
- [`src/assets`](/C:/uni/entr/src/assets) logos and frontend images
- `public` static files used directly in builds, such as tab icons

## Where to edit things

If you want to change course content:
- update the module files in [`src/pages`](/C:/uni/entr/src/pages)

If you want to change progress or unlock logic:
- start with [`src/components/ModulePage.tsx`](/C:/uni/entr/src/components/ModulePage.tsx)
- then check [`src/pages/course.tsx`](/C:/uni/entr/src/pages/course.tsx)
- then check [`backend/server.js`](/C:/uni/entr/backend/server.js)

If you want to change premium pricing, payment, or business flow:
- [`src/lib/premiumCourse.ts`](/C:/uni/entr/src/lib/premiumCourse.ts)
- [`src/pages/premium-pricing.tsx`](/C:/uni/entr/src/pages/premium-pricing.tsx)
- [`src/pages/premium-payment.tsx`](/C:/uni/entr/src/pages/premium-payment.tsx)
- [`src/pages/premium-business-dashboard.tsx`](/C:/uni/entr/src/pages/premium-business-dashboard.tsx)

If you want to change login or API behaviour:
- frontend calls live in [`src/lib/api.ts`](/C:/uni/entr/src/lib/api.ts)
- backend routes live in [`backend/server.js`](/C:/uni/entr/backend/server.js)

## Deployment

We are using:
- frontend -> GitHub Pages
- backend -> Render

### Branch workflow

Use `main` as the source-of-truth branch.

When you want the live site updated:
1. Push your finished work to `main`
2. Sync `main` into `github-pages`
3. Push `github-pages` to trigger the GitHub Pages deploy

### Typical deploy commands

Push your latest work to `main`:

```powershell
git add .
git commit -m "Your message"
git push origin main
```

Then sync the deploy branch:

```powershell
git switch github-pages
git pull --rebase origin github-pages
git merge main
git push origin github-pages
```

After that:
- GitHub Actions will run the Pages workflow
- the live frontend will update when the workflow goes green

## Backend deployment

The backend lives in [`backend/server.js`](/C:/uni/entr/backend/server.js).

A simple Render setup is:
1. Deploy it as a Web Service
2. Build command: `npm install`
3. Start command: `npm run server`
4. Health check path: `/health`
5. Copy the Render URL into the GitHub repository variable `VITE_API_URL`

Once both are deployed:
- GitHub Pages serves the frontend
- Render serves the backend
- login, enrolment, progress, and premium access work against the live backend

## Notes for collaborators

- `backend/data/*.json` is ignored by git, so local test accounts and runtime data should not be committed
- if you clone the repo fresh, the backend will create its local data file automatically when you run `npm run server`
- the backend is still a prototype, not a production-ready auth system
- if a port is already in use, you can override it with environment variables

Example:

```powershell
$env:PORT=4020
npm run server
```

and in the frontend terminal:

```powershell
$env:VITE_API_URL="http://localhost:4020"
npm run dev
```

I acknowledge that this work is my own. I used OpenAI ChatGPT (OpenAI, https://chat.openai.com/) and Anthropic Claude (Anthropic, https://claude.ai)to support parts of the development process including code suggestions, bug fixes, README suggestions, and assistance in the setup of the backend and frontend.  All final decisions, testing, and submitted content are my own.
