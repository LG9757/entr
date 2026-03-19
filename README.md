# entr

`entr` is a React + Vite learning platform prototype.

It currently includes:
- a course dashboard
- a finance course with module and lesson progress
- a premium course flow with overview, curriculum, and mock payment
- a simple backend prototype for auth, course access, and progress tracking

This is still a prototype, so some parts are intentionally lightweight, but the structure is now good enough to build on properly.

## Running the project

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

## Useful scripts

```powershell
npm run dev
npm run server
npm run build
```

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

## Good next steps

If you keep developing this project, the next sensible improvements are:
- move fully off local storage for course progress
- replace the file-backed backend store with Postgres
- add proper auth/session handling
- connect the payment flow to real enrollment logic
