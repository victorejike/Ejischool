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

## Quick start

```bash
npm install
npm run dev
```

Run the Go API:

```bash
cd services/api
go run ./cmd/server
```

Default local URLs:

- Web: `http://localhost:3000`
- API: `http://localhost:8080`

## Build order

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
