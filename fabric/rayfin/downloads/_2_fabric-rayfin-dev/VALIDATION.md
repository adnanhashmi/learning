# Validation

Updated October 30, 2026.

Passed:

- Syntax checks for `index.js`, `start-container.mjs`, and `healthcheck.mjs`.
- Installed dependency graph: Rayfin client and CLI are both 1.36.2. No npm
  dependencies were added for the editor; Docker installs its standalone release.
- Compose configuration parsing with a supplied password, two loopback-only
  published ports, and four persistent volumes. Missing `PASSWORD` is rejected.
- Nine new startup and health checks: missing password; conflicting/invalid app
  ports; sibling cleanup after service exit and executable lookup failure;
  real launcher with substituted service executables checking password handling,
  editor bind arguments, and isolation from the app's PORT/HOST; health checks
  with both HTTP services available, editor HTTP failure, and editor unavailable.
- Twelve original HTTP/configuration checks, including the installed Rayfin SDK
  calling a local mock GraphQL backend, bearer token forwarding, invalid settings,
  missing credentials, and error redaction.
- Release archive names and SHA-256 values checked against Coder's published
  code-server 4.144.0 GitHub release metadata (Linux amd64/arm64).

Remaining limitations:

- Docker engine access is denied by this execution sandbox. The image build,
  Linux process-group shutdown, actual code-server binary startup, browser login,
  editor terminal, and volume persistence have not been run end to end here.
  The launcher tests substitute the unavailable editor executable; they do not
  claim to test the editor itself.
- A real Fabric data query requires the user's backend, schema, workspace access,
  and valid application session token. Mock backend tests do not verify these.

To verify locally, set `PASSWORD`, run `docker compose up --build -d`, check
`docker compose ps`, sign in at http://localhost:8080, and open
http://localhost:3000/health. Save an edit to `index.js` and confirm it restarts.
Use `docker compose down` followed by `docker compose up -d` to confirm saved
workspace files and editor settings persist.
