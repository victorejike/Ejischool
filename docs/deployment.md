# Deployment

This project is ready for a split production deploy:

- Frontend: Netlify, using the Next.js app in `apps/web`.
- Backend: Render, using the Go API in `services/api`.

## Netlify

The repository includes `netlify.toml`, so Netlify can build from the repository root.

Use these settings if entering them manually:

```text
Build command: npm --workspace=@ejischool/web run build
Publish directory: apps/web/.next
Node version: 20
```

Set these environment variables in Netlify:

```text
NEXT_PUBLIC_SITE_URL=https://your-netlify-site.netlify.app
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com
```

Replace both values with your real production domains when they are connected.

## Render

The repository includes `render.yaml` for Render Blueprints. It creates:

- `ejischool-api`, a Go web service.
- `ejischool-db`, a PostgreSQL database.

Set these secret environment variables in Render:

```text
ADMIN_SIGNUP_CODE=use-a-private-admin-invite-code
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
```

Render generates `JWT_SECRET` automatically from `render.yaml`.

If you connect a custom frontend domain, update `ALLOWED_ORIGINS` to that exact origin. If you use more than one frontend origin, separate them with commas.

If you create the Render API service manually instead of from the Blueprint, use these settings:

```text
Service type: Web Service
Language: Go
Root Directory: services/api
Build Command: GOCACHE=/tmp/go-build go build -o bin/ejischool-api ./cmd/server
Start Command: ./bin/ejischool-api
Health Check Path: /healthz
```

If Render logs show a Next.js build or `bash: line 1: run: command not found`, the service is configured as the frontend or has the wrong start command. Change the service settings above, or delete that Render service and recreate it from `render.yaml`.

## Database

Render creates the database and passes its connection string to the API as `DATABASE_URL`. The API applies `services/api/internal/database/schema.sql` automatically when it starts.

## Pre-Deploy Checks

Run these before deploying:

```bash
npm run typecheck
npm run build
npm run api:test
```
