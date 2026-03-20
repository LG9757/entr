# entr

`entr` is a React + Vite learning platform prototype.

It currently includes:
- a course dashboard
- a finance course with module and lesson progress
- a premium course flow with overview, curriculum, and mock payment
- a simple backend prototype for auth, course access, and progress tracking

This is still a prototype, so some parts are intentionally lightweight, but the structure is now good enough to build on properly.

## Testing locally

You need two terminals.

Terminal 1: start the backend

```powershell
cd C:\uni\entr
npm run server
```

The backend runs on:
- `http://localhost:4010`

Terminal 2: start the frontend

```powershell
cd C:\uni\entr
npm run dev
```

The frontend usually runs on:
- `http://localhost:5173`

Open the frontend URL in your browser, not the backend one.

This is enough to test the app locally, including:
- sign up and login
- course access
- lesson completion
- module unlocking
- progress tracking

## Useful scripts

```powershell
npm run dev
npm run server
npm run build
```

## Deploying globally

This project is split into two parts:
- frontend -> GitHub Pages
- backend -> a separate Node host - Render

GitHub Pages can host the frontend only.

This project includes a GitHub Actions workflow at [`.github/workflows/deploy.yml`](/C:/uni/entr/.github/workflows/deploy.yml) that builds the Vite app and deploys `dist` to Pages.

Typical flow:
1. Push your deployment changes to the `github-pages` branch
2. In GitHub, go to `Settings > Pages`
3. Set the source to `GitHub Actions`
4. Add the `VITE_API_URL` repository variable
5. Make sure the `github-pages` environment allows the `github-pages` branch
6. Push to `github-pages`
7. Wait for the deploy workflow to finish

Useful deploy commands:

```powershell
git add .
git commit -m "Your deploy message"
git push origin github-pages
```

If you also want the same code on `main` afterwards:

```powershell
git switch main
git merge github-pages
git push origin main
```

## Backend deployment

The backend lives in [`backend/server.js`](/C:/uni/entr/backend/server.js).

A simple setup is:
1. Deploy it to Render as a web service
2. Build command: `npm install`
3. Start command: `npm run server`
4. Health check path: `/health`
5. Copy the Render URL into the GitHub `VITE_API_URL` repository variable

Once both are deployed:
- frontend runs on GitHub Pages
- backend runs on Render
- login, enrollment, and progress work against the live backend

## Project structure

Frontend:
- [`src/pages`](/C:/uni/entr/src/pages) page-level screens
- [`src/components`](/C:/uni/entr/src/components) shared UI pieces
- [`src/lib/api.ts`](/C:/uni/entr/src/lib/api.ts) frontend API client
- [`src/lib/courseProgress.ts`](/C:/uni/entr/src/lib/courseProgress.ts) finance course metadata
- [`src/lib/premiumCourse.ts`](/C:/uni/entr/src/lib/premiumCourse.ts) premium course metadata
- [`src/App.css`](/C:/uni/entr/src/App.css) shared styling

Backend:
- [`backend/server.js`](/C:/uni/entr/backend/server.js) backend prototype server
- [`backend/schema.sql`](/C:/uni/entr/backend/schema.sql) suggested database schema
- [`backend/data/store.json`](/C:/uni/entr/backend/data/store.json) local prototype data store

## What is stored where

Right now:
- auth, enrollments, and progress are handled by the backend prototype
- some local storage is still used as a fallback while the frontend is being migrated

The long-term direction should be:
- backend/database as the source of truth
- local storage only for temporary UI support, or not at all

## Where to change things

If you want to add or edit lessons:
- update the module files in [`src/pages`](/C:/uni/entr/src/pages)

If you want to change access rules or progress logic:
- start with [`src/components/ModulePage.tsx`](/C:/uni/entr/src/components/ModulePage.tsx)
- then check [`src/pages/course.tsx`](/C:/uni/entr/src/pages/course.tsx)
- then check [`backend/server.js`](/C:/uni/entr/backend/server.js)

If you want to change login or API behavior:
- frontend calls live in [`src/lib/api.ts`](/C:/uni/entr/src/lib/api.ts)
- backend endpoints live in [`backend/server.js`](/C:/uni/entr/backend/server.js)

## Notes

- `backend/data/*.json` is ignored by git, so local user data should not be committed
- the backend is a prototype, not a production-ready auth system
- if a port is already in use, change it with an environment variable before running

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

## Git notes

`backend/data/*.json` is ignored by git, so local test accounts and runtime data will not be committed.

If you clone the repo fresh, the backend will create its local data file automatically when you run `npm run server`.

