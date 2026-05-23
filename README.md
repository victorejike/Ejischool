# EJISCHOOL

EJISCHOOL is a W3Schools-style software learning platform with a modern developer experience: tutorial pages, references, exercises, certificates, playgrounds, dashboards, SEO-ready content, and a Go-first backend architecture.

The first build follows the platform architecture document as the source of truth and uses the Golang enterprise architecture as the supporting direction for backend, scalability, security, and infrastructure.

## What is included

- `apps/web` - Next.js App Router frontend with dark-first cyan brand system.
- `services/api` - Go API service with health, tutorial, auth, and playground endpoints.
- `packages/database` - PostgreSQL schema for users, tutorials, progress, certificates, payments, AI conversations, and analytics.
- `infrastructure` - Docker Compose, Kubernetes starter manifests, Nginx gateway, and Terraform placeholder.
- `docs/architecture` - implementation roadmap and system notes.
- `.github/workflows` - CI for frontend and Go service.

## Quick Start

```bash
npm install
npm run dev
```

Run the Go API:

```bash
cd services/api
go run ./cmd/server
```

Run the full database-backed stack:

```bash
cd infrastructure/docker
docker compose up --build
```

The API uses `DATABASE_URL` for PostgreSQL. When it is set, sign up/sign in, admin course edits, course reads, and live server-sent events use the database. Docker Compose wires this automatically with:

```bash
postgres://ejischool:ejischool@postgres:5432/ejischool?sslmode=disable
```

Default local URLs:

- Web: `http://localhost:3000`
- API: `http://localhost:8080`

## Verification

Run these before every deployment:

```bash
npm run typecheck
npm run build
npm run api:test
```

The CI workflow in `.github/workflows/ci.yml` runs the same web and API checks on pushes and pull requests.

## Production Environment

Copy `.env.example` into your host, CI secret store, or Kubernetes secrets/config and replace every placeholder:

- `NEXT_PUBLIC_API_URL` - public API origin used by the Next.js app.
- `DATABASE_URL` - production PostgreSQL URL.
- `JWT_SECRET` - long random signing secret. Do not reuse the local Docker value.
- `ADMIN_SIGNUP_CODE` - private invite code required to create admin accounts.
- `ALLOWED_ORIGINS` - comma-separated browser origins allowed to call the API.
- `APP_ENV=production` - enables production config validation in the Go API.

In production, the API refuses to boot without `DATABASE_URL`, a real `JWT_SECRET`, and explicit `ALLOWED_ORIGINS`.

## Deployment

Local full-stack smoke test:

```bash
cd infrastructure/docker
docker compose up --build
```

Kubernetes starter manifests live in `infrastructure/kubernetes/api-deployment.yaml`. Before applying them:

1. Replace `ghcr.io/your-org/ejischool-api:latest` and `ghcr.io/your-org/ejischool-web:latest` with your real image names.
2. Replace the sample `ConfigMap` domains with your production domains.
3. Replace the sample `Secret` values or create the secret from your cloud secret manager.
4. Point `DATABASE_URL` at a managed PostgreSQL database with `packages/database/schema.sql` applied.

## Current Product Scope

This repo is now deployable as an MVP learning platform: static tutorial/reference pages, auth, database-backed courses, protected admin course edits, live events, exercises, AI tutor-style guidance, Docker, Kubernetes starters, and CI.

Still treat these as future product expansions after the first deployment:

- Real isolated compiler workers for executing arbitrary user code.
- Payment provider integration and certificate issuance.
- Provider-backed AI tutor responses.
- Full analytics, search indexing, OAuth, email magic links, MFA, and mobile apps.

## Build Order

1. Design system
2. Frontend layout
3. Tutorial engine
4. Code playground
5. Authentication API foundation
6. Database schema
7. Admin dashboard shell
8. SEO foundation
9. AI tutor shell
10. Certificates and payments shell
