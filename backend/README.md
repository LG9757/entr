# Backend prototype

This project now includes a simple Node backend prototype in `backend/server.js`.

It is intentionally lightweight and uses only built-in Node modules so you can start modelling auth, course access, and progress immediately.

## What it does

- Registers and logs in users
- Creates a session token
- Gives every new user access to the included finance course
- Stores premium enrollments
- Tracks lesson completion and module passes
- Returns course access and progress state

## Run it

```bash
npm run server
```

The API runs on `http://localhost:4000` by default.

## Main endpoints

- `GET /health`
- `GET /catalog`
- `POST /auth/register`
- `POST /auth/login`
- `GET /me`
- `GET /courses/:courseSlug/access`
- `GET /courses/:courseSlug/progress`
- `POST /courses/:courseSlug/enroll`
- `POST /courses/:courseSlug/lessons/:lessonId/complete`
- `POST /courses/:courseSlug/modules/:moduleNumber/pass`

## Example register

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex","email":"alex@example.com","password":"secret123"}'
```

## Important note

This is a starting point, not a production backend.

It uses:
- JSON-file persistence instead of a real database
- simple bearer tokens instead of full session infrastructure
- no email verification, reset flow, or webhook payment integration

## Natural next step

Replace the JSON store with Postgres and keep the same high-level tables from `backend/schema.sql`.
Then point the frontend login, enrollment, and progress calls at these endpoints.
