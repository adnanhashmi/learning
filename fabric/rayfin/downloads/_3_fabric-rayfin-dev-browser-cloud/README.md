# Rayfin local backend + browser VS Code

This package starts an **experimental local Rayfin backend** for auth and data
alongside the VS Code browser editor and Node.js sample. It does not install the
full Microsoft Fabric cloud service. Fabric SSO, OneLake, analytics workloads, and
Fabric governance still require Fabric. Local password authentication is used here.

The public runtime is published as `cli-1.33.0`; this package therefore pins all
Rayfin packages to **1.33.0**, with the backend image pinned by SHA-256. The previous
1.36.2 cloud-backed/browser-editor package is preserved separately as
`fabric-rayfin-dev-browser-cloud.zip`.

## Start from PowerShell

Extract the complete ZIP. From the extracted folder:

```powershell
.\Start-Local.ps1
```

The script locates `compose.yaml` beside itself, generates database passwords in
an ignored `.env` file if missing, asks for your editor password, and runs
`docker compose up --build -d`. It works with PowerShell 5.1 and PowerShell 7.
Retain `.env` with the database volumes; generating different passwords does not
reset existing database credentials. No secrets are included in this ZIP.

Use Docker Desktop with Linux containers on an x86-64/amd64 machine. The backend
and SQL Server images target amd64; ARM emulation is not validated. Allow enough
Docker memory for SQL Server, PostgreSQL, the .NET backend, and the editor. The
first build downloads large images and database initialization can take minutes.
The SQL Server container uses the Developer edition for development/testing.

Open:

- **VS Code editor:** http://localhost:8080 — use your editor password.
- **Node sample:** http://localhost:3000
- **Node process health:** http://localhost:3000/health
- **Local Rayfin backend health:** http://localhost:5168/healthcheck

The backend root URL is an API endpoint, not a Fabric portal or app designer.
The sample is an HTTP/SDK starter, not a frontend application with a login form.
Use the browser editor's terminal to develop your app.

## What starts

| Compose service | Purpose |
| --- | --- |
| `admin-db` | PostgreSQL control-plane/auth metadata |
| `sqlserver` | SQL Server for the Todo data model |
| `rayfin-backend` | Local Rayfin .NET runtime, port 5168 |
| `rayfin-init` | One-shot runtime settings, schema apply, and publishable-key discovery |
| `rayfin-dev` | Browser editor, Node.js, CLI, and sample app |

Database health checks run first. Then the backend starts, the initializer applies
`rayfin/rayfin.yml` and the `Todo` schema, and the editor/sample start. A successful
initializer exits with code 0; this is expected. No Fabric login or Docker socket
mount is needed for this local workflow. Compose manages the backend containers;
`npm run backend:apply` applies project changes to the existing backend.
The included app and smoke utility suppress the pinned SDK's POST response-body
logging so authentication tokens are not printed in their logs.

Host ports bind to loopback. Database ports are not published. The local backend
has development management endpoints and should remain on loopback. For remote
editor access, use a secure tunnel or authenticated HTTPS reverse proxy supporting
WebSockets.

## Check the stack

From the project folder, in a shell with your editor `PASSWORD` still set:

```powershell
docker compose ps -a
docker compose logs rayfin-init rayfin-backend
docker compose logs sqlserver admin-db
```

If you open a new PowerShell session, set the editor password again or rerun
`Start-Local.ps1`. The script reuses the database passwords in `.env`.

In the browser editor, open **Terminal > New Terminal**:

```sh
npm run rayfin -- --version
npm run check
npm run backend:smoke
```

`backend:smoke` performs local signup/signin, creates a Todo, reads it through the
Node sample, deletes the Todo, and signs out. It creates one disposable auth
account per run; the account record remains in the local auth database. It does
not use your real Fabric account. The editor password is independent of app users.

`/todos` requires `Authorization: Bearer <local-Rayfin-session-token>`. Backend
settings and the publishable key are discovered automatically and stored in the
shared local-state volume, not in the Docker image. The smoke script demonstrates
how to obtain an application token with the matching SDK. Tokens from CLI login
or a different backend are separate credentials.

## Change the model or app

Edit `index.js` in the browser editor; saving restarts the sample in watch mode.
Edit `rayfin/data/Todo.ts` and `rayfin/data/schema.ts` for your model, then run:

```sh
npm run backend:apply
```

This compiles the schema and applies runtime settings and database configuration.
It never automatically forces a potentially destructive migration. If the backend
rejects a change, review the model and backend logs. The starter grants all local
signed-in users access to all Todo rows; add per-user policies for private data.

The application and backend use separate containers: `rayfin-backend:8080` is the
internal URL; `localhost:5168` is the host URL. The bootstrap uses the internal URL
rather than the CLI's usual `localhost:5168`, avoiding container network errors.

You can develop a frontend in another subdirectory and preview it via the editor's
Ports panel. This package does not include Functions Core Tools or local storage.
For the current managed Fabric workflow and newer Rayfin features, use the saved
1.36.2 cloud-backed package with a real Fabric workspace.

## Persistence and updating existing installations

This revision uses a **new `workspace-local` volume** so its 1.33 dependencies do
not overwrite the previous 1.36 editor workspace. Old workspace data is retained.
Copy any wanted files from your old workspace deliberately, and align dependencies
before using them in this local project.

Database data, local state, editor configuration/extensions, and the new workspace
persist in Docker volumes. The editor uses code-server 4.144.0. Some Microsoft
Marketplace extensions are unavailable in code-server's extension gallery.

```powershell
docker compose down
.\Start-Local.ps1
```

Stopping keeps the volumes. Rebuilding an image does not replace an existing
workspace volume. After editing package files in the editor, run `npm ci --include=dev`
there. After recreating the backend, reapply configuration with:

```powershell
docker compose run --rm rayfin-init
docker compose restart rayfin-dev
```

Sign in again if old local application tokens stop working after recreation.
Do not remove volumes unless you intend to discard their data.

## Verification limits

The actual Rayfin CLI compiles the Todo schema successfully. Bootstrap, app, and
editor checks run against local mock HTTP endpoints; Compose parsing and launcher
syntax are also checked. Docker engine access is blocked in the execution sandbox,
so pulling/running the backend, database migration, real auth/CRUD, browser login,
and persistence have not been tested end to end here. Run `backend:smoke` after
startup to verify your machine. See `VALIDATION.md` for details.

## Sources

- [Microsoft Rayfin: experimental local development](https://github.com/microsoft/rayfin#local-development-experimental)
- [Microsoft local development template](https://github.com/microsoft/awesome-rayfin/tree/main/templates/todo-local-experimental)
- [Rayfin CLI 1.33.0](https://www.npmjs.com/package/@microsoft/rayfin-cli/v/1.33.0)
- [code-server](https://coder.com/docs/code-server)
