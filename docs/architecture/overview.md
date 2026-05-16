# EJISCHOOL Architecture Overview

## Source of truth

The primary product shape follows the W3Schools-style platform architecture:

- Fast tutorial pages
- SEO-first rendering
- Sidebar learning navigation
- Live editor and output
- Exercises, quizzes, certificates
- AI tutor and learning support
- Admin dashboard
- Analytics
- Payments and subscriptions

The supporting enterprise direction is the Golang architecture:

- Go backend services
- Microservice-ready boundaries
- PostgreSQL and Redis
- Event-driven expansion with Kafka or NATS
- Docker and Kubernetes readiness
- Observability with Grafana, Loki, and OpenTelemetry
- Zero-trust API security and RBAC

## Launch sequence

1. Tutorials, layout, SEO, and content system
2. Authentication and learner dashboard
3. Playground and compiler worker isolation
4. Exercises, quizzes, and progress tracking
5. Admin CMS
6. Certificates and payments
7. AI tutor and code intelligence
8. Analytics and monitoring
9. Kubernetes scaling
10. Mobile and enterprise integrations

## Current implementation

The repository contains a runnable Next.js frontend foundation and a Go API service foundation. The code execution service intentionally returns an accepted response until a real isolated compiler worker is connected.
