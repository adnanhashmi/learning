# Local backend validation

Updated October 30, 2026.

Verified:

- GHCR anonymous registry access confirms the public runtime tag
  `ghcr.io/microsoft/rayfin/webservice:cli-1.33.0` exists. Its manifest digest is
  `sha256:c707928a827f2f83ce094721657b991ab22f72a0c8e33bb92a173d9a705f470a`.
  The image is Linux amd64. Public tags for 1.36.2 were absent when checked.
- The local package aligns Rayfin CLI, core, client, and their Rayfin dependencies
  to 1.33.0 rather than guessing compatibility with the previous 1.36.2 SDK.
- Bootstrap endpoints and payloads match the installed 1.33.0 CLI's local code:
  `/api/projectRuntimeSettings`, `/api/applyconfig`, `/api/publishable-key`.
- The actual CLI compiles the TypeScript Todo model and generates MSSQL DAB
  configuration with authenticated permissions, id/title fields, and constraints.
  The initial legacy decorator settings were corrected to standard decorators.
- Ten mock-backend bootstrap/integration checks pass: startup retries, service
  settings, schema payload, non-forced apply, key discovery, state writing,
  sample app SDK request, preserving state after failed apply, and invalid inputs.
- Twelve original HTTP/configuration regression checks pass using the installed
  1.33 SDK, including bearer forwarding and upstream error redaction.
- Nine editor/startup/health regression checks pass, including port isolation and
  sibling shutdown after a failed process.
- The smoke utility passes against mock auth/GraphQL endpoints: signup, signin,
  create, application query, deletion, and signout. A token-redaction assertion
  caught the SDK's POST-response logging; the logging adapter fixes it.
- Compose configuration parsing passes for five services, startup dependencies,
  automatic local backend settings, loopback-bound published ports, and internal
  database ports. The PowerShell launcher passes syntax parsing.
- JavaScript syntax checks pass for all generated JavaScript modules.
- A clean locked `npm ci --include=dev` passed with the bundled npm 11.19.0.
  An earlier attempt through the separate npm 11.3.0 installation hit Windows
  EPERM errors; the clean install and schema generation succeeded with 11.19.0.

Limitations:

The sandbox denies Docker engine access. Actual image builds, runtime startup,
SQL Server/PostgreSQL initialization, real database migration/auth/CRUD, Linux
process-group signaling, browser editor login, and volume persistence have not
been run end to end here. Mock tests are not a claim of compatibility with every
runtime behavior. After startup, run `docker compose exec rayfin-dev npm run
backend:smoke` to verify the real local stack on your machine.

The public local runtime is experimental and older than the prior managed-cloud
starter. It implements local Rayfin auth/data for development, not Microsoft
Fabric's cloud control plane or its analytics/OneLake workloads. The previous
1.36.2 cloud-backed archive is preserved separately.
