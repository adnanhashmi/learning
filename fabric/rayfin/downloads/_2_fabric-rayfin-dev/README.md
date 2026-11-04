# Fabric Rayfin development with VS Code in a browser

The image includes Node.js 24, Rayfin CLI/SDK 1.36.2, and **code-server 4.144.0**,
an open-source distribution of VS Code for the browser. It starts the editor and
the sample app together. The normal Rayfin backend stays in Microsoft Fabric.

## Start with Docker Compose (PowerShell)

Use Docker Desktop in Linux container mode. From this directory:

```powershell
$env:PASSWORD = Read-Host 'Choose the browser editor password' -MaskInput
docker compose up --build -d
```

`-MaskInput` requires PowerShell 7. In Windows PowerShell 5.1, replace the first
line with `$env:PASSWORD = [System.Net.NetworkCredential]::new('', (Read-Host 'Choose the browser editor password' -AsSecureString)).Password`.

- **Editor:** http://localhost:8080 — enter the password you chose.
- **Sample app:** http://localhost:3000
- **App health:** http://localhost:3000/health

Open `index.js` in the editor and save changes; Node's watch mode restarts the app.
Use **Terminal > New Terminal** for Node, npm, Git, and the Rayfin CLI:

```sh
node --version
npm run rayfin -- --version
```

The app is already running on port 3000; use a different port for another server.
code-server uses its own extension gallery, so some Microsoft Marketplace
extensions are unavailable. JavaScript editing and the terminal need no extension.

```powershell
docker compose logs -f
docker compose ps
docker compose down
```

Compose persists `/app`, editor settings/extensions, and Rayfin CLI state in named
volumes. `docker compose down` retains them. Rebuilding the image does not replace
an existing workspace volume: run `npm ci --include=dev` in the editor terminal
after changing package files. Download or commit your work before deleting volumes.
Both ports bind to the host loopback interface. To access from another computer,
use an authenticated HTTPS endpoint or a secure tunnel; reverse proxies must
support WebSockets.

## Run without Compose

After setting `$env:PASSWORD` as above:

```powershell
docker build -t fabric-rayfin-dev .
docker run --rm --name fabric-rayfin-dev -p 127.0.0.1:8080:8080 -p 127.0.0.1:3000:3000 -e PASSWORD --mount type=volume,source=rayfin-workspace,target=/app --mount type=volume,source=rayfin-editor-data,target=/home/node/.local/share/code-server --mount type=volume,source=rayfin-editor-config,target=/home/node/.config/code-server --mount type=volume,source=rayfin-auth,target=/home/node/.rayfin fabric-rayfin-dev
```

Stop with Ctrl+C. These manually named volumes are separate from Compose's volumes.
Default startup requires runtime `PASSWORD` or code-server's `HASHED_PASSWORD`;
no password is embedded in the image. The Compose file uses `PASSWORD`.
Editor port 8080 is reserved. `PORT` controls only the app (default 3000); adjust
its port mapping if changing it.

To run only the original sample without the editor:

```powershell
docker run --rm --no-healthcheck -p 127.0.0.1:3000:3000 fabric-rayfin-dev node index.js
```

The default health check expects both services, so this override disables it.
The app's `/health` endpoint still works.

## Connect to Fabric

The sample starts without a Fabric account. Data queries require a Fabric Apps-
enabled tenant, an accessible workspace, and an existing Rayfin backend. `/todos`
assumes a `Todo` entity with `id` and `title` fields and read permission. Adapt the
query in `index.js` to your schema. Set real deployment values on the host:

```powershell
$env:RAYFIN_API_URL = 'https://YOUR-REAL-BACKEND-URL/'
$env:RAYFIN_PUBLISHABLE_KEY = 'YOUR-REAL-PUBLISHABLE-KEY'
docker compose up -d
```

For plain Docker, pass `-e RAYFIN_API_URL -e RAYFIN_PUBLISHABLE_KEY` before the
image name. Credentials and environment files are excluded from the build context.
After setting `$env:RAYFIN_SESSION_TOKEN` to a valid Rayfin application session
token obtained through your app's supported sign-in flow:

```powershell
Invoke-RestMethod http://localhost:3000/todos -Headers @{ Authorization = "Bearer $env:RAYFIN_SESSION_TOKEN" }
```

The app forwards the caller's token without persisting it. CLI login tokens are
separate credentials. `/todos` returns 503 without backend settings, 401 without a
session token, and 502 on an upstream/schema/permission error. `/health` checks
only local process liveness and does not contact Fabric.

## Create a full Rayfin app in the browser terminal

Create a separate project under the editor's writable `/app` workspace:

```sh
npm run rayfin -- init ./my-fabric-app
cd my-fabric-app
npm install
npx rayfin login
npm run dev
```

The scaffolded project's `npm run dev` runs `rayfin dev`, which can provision or
change resources in your Fabric workspace. Configure its frontend to bind to
`0.0.0.0` (for Vite, set `dev:frontend` to `vite --host 0.0.0.0`). Preview port 5173
through the editor's Ports panel or http://localhost:8080/proxy/5173/.
Apps with absolute URL or OAuth redirect requirements may need a direct Docker
port mapping and matching redirect URI configuration instead.

Interactive CLI login from a container may require forwarding its browser callback
port. For headless operations you can supply a pre-acquired Fabric CLI token as
`RAYFIN_TOKEN` in the terminal session. If login reports an unavailable OS keychain,
the documented development-only option is `npx rayfin login --encryption-fallback-enabled`;
it permits plaintext token storage. The Rayfin volume retains CLI state. Azure
Functions Core Tools and a local Fabric emulator are not included.

## Implementation and verification

- code-server is pinned; SHA-256 checks verify the Linux amd64/arm64 release archive.
- Both services run as the non-root `node` user. `tini` reaps child processes;
  the supervisor stops both service groups on shutdown or an unexpected exit.
- Missing passwords and app/editor port collisions fail before startup. App `PORT`
  is removed from the editor environment so it cannot override the editor port.
- The health check probes both the app and code-server's `/healthz` endpoint.
- See `VALIDATION.md` for checks run and remaining limitations.

## References

- [code-server](https://coder.com/docs/code-server)
- [Pinned release and asset checksums](https://github.com/coder/code-server/releases/tag/v4.144.0)
- [code-server installation](https://coder.com/docs/code-server/install)
- [Access and reverse proxy setup](https://coder.com/docs/code-server/guide)
- [Fabric CLI quickstart](https://learn.microsoft.com/en-us/fabric/apps/create-app-with-cli)
- [Rayfin Node.js client](https://rayfin.ai/docs/reference/sdk/rayfin-client)
- [Rayfin CLI authentication](https://rayfin.ai/docs/reference/cli/login)
