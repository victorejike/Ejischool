# Security Architecture

- HTTPS everywhere at the edge.
- Rate limiting at CDN and API gateway.
- Input validation on every public endpoint.
- JWT access tokens and refresh token rotation.
- OAuth2 providers for Google and GitHub.
- MFA and magic link support after base authentication.
- RBAC for learners, instructors, admins, and support staff.
- Audit logs for admin and payment actions.
- Sandboxed containers for code execution.
- No network access from compiler containers by default.
- Encrypted secrets through a managed secret store.
- PostgreSQL least-privilege service users.
