# Microsoft Fabric Rayfin development container

This is a Node.js development container with the Rayfin CLI and a working
JavaScript HTTP sample using `RayfinServerClient`. Both Rayfin packages are pinned
to 1.36.2. The normal backend stays in Microsoft Fabric; this Dockerfile does not
emulate Fabric or start an experimental local Rayfin backend.

## Build and run

Use Docker Desktop in Linux container mode. From this directory:

```powershell
docker build -t fabric-rayfin-dev .
docker run --rm --init --name fabric-rayfin-dev -p 127.0.0.1:3000:3000 fabric-rayfin-dev
```

Open http://localhost:3000 or http://localhost:3000/health. The sample starts
without a Fabric account. `/health` checks process liveness only. Stop with Ctrl+C.

Keep `package-lock.json` beside `package.json`: the Dockerfile uses `npm ci`.
The image includes development dependencies, native build prerequisites, a
non-root user, and a health check. No credentials are supplied during image build.
The `allowScripts` entries in package.json permit the installed versions of the
four dependencies that require setup scripts under current npm.

## Connect the sample to Fabric

You need a Fabric Apps-enabled tenant, a workspace you can access, and an existing
Rayfin backend. `/todos` assumes that backend has a `Todo` entity with `id` and
`title` fields and that your signed-in user has read permission. Adapt the query
in `index.js` for your own model. This sample does not create a schema or backend.

Create a local file named `rayfin.env` containing your real values:

```dotenv
RAYFIN_API_URL=https://YOUR-REAL-BACKEND-URL/
RAYFIN_PUBLISHABLE_KEY=YOUR-REAL-PUBLISHABLE-KEY
```

Use the API URL and publishable key from your Rayfin deployment. Restart the
container with this file:

```powershell
docker run --rm --init --name fabric-rayfin-dev -p 127.0.0.1:3000:3000 --env-file ./rayfin.env fabric-rayfin-dev
```

Call the data endpoint from PowerShell after setting `$env:RAYFIN_SESSION_TOKEN`
to a valid Rayfin application session token obtained through your app's supported
Fabric sign-in flow:

```powershell
Invoke-RestMethod http://localhost:3000/todos -Headers @{ Authorization = "Bearer $env:RAYFIN_SESSION_TOKEN" }
```

The server forwards this token to the SDK and does not persist it. A Rayfin CLI
login token is a separate credential and does not sign application users in.
Without backend settings `/todos` returns 503; without a session token it returns
401. Backend/schema/permission errors return 502 without exposing SDK details.
Publish the development port to loopback as shown above.

## Edit and debug

Run with a bind mount for automatic restart when `index.js` changes:

```powershell
docker run --rm --init --name fabric-rayfin-dev -p 127.0.0.1:3000:3000 --mount "type=bind,source=$((Get-Location).Path)/index.js,target=/app/index.js" fabric-rayfin-dev npm run dev
```

Add `--env-file ./rayfin.env` before the image name when connecting to Fabric.
For interactive debugging, use:

```powershell
docker run --rm --init --name fabric-rayfin-dev -p 127.0.0.1:3000:3000 -p 127.0.0.1:9229:9229 fabric-rayfin-dev node --inspect=0.0.0.0:9229 index.js
```

Attach your editor's Node debugger to localhost:9229.

## Use the Rayfin CLI

The CLI is available through `npm run rayfin -- <arguments>`. For example, while
the container is running:

```powershell
docker exec fabric-rayfin-dev npm run rayfin -- --version
docker exec fabric-rayfin-dev npm run rayfin -- --help
```

For a complete Fabric app with a frontend and TypeScript data model, scaffold a
separate project rather than overwriting these sample files. The image can serve
as its development shell:

```powershell
docker run --rm -it --mount "type=bind,source=$((Get-Location).Path),target=/workspace" --mount "type=volume,source=rayfin-auth,target=/home/node/.rayfin" -p 127.0.0.1:5173:5173 fabric-rayfin-dev sh
```

Inside that shell:

```sh
/app/node_modules/.bin/rayfin init /workspace/my-fabric-app
cd /workspace/my-fabric-app
npm install
npx rayfin login
npm run dev
```

Configure that scaffolded project's frontend dev server to bind to `0.0.0.0`
(for Vite, use `vite --host 0.0.0.0` in `dev:frontend`) so Docker port forwarding
works. Its normal `npm run dev` runs `rayfin dev`, which can provision or change
resources in your selected Fabric workspace. The Node sample's `npm run dev`
only watches `index.js` and makes no provisioning changes.

Container browser login may require host callback forwarding; for headless CLI
operations you can supply a pre-acquired **Fabric CLI** token as `RAYFIN_TOKEN`
at runtime with `docker run -e RAYFIN_TOKEN ...`. Do not use this token as the
sample's application session token. If interactive login reports an unavailable
OS keychain, the documented development-only option is
`npx rayfin login --encryption-fallback-enabled`; it allows plaintext token
storage. The optional `rayfin-auth` volume retains CLI state between runs.

## Validation performed

- Installed dependencies and verified CLI version 1.36.2.
- Approved the required version-pinned install scripts and rebuilt dependencies.
- Checked JavaScript syntax and the dependency graph.
- Passed 12 HTTP/configuration checks, including a real SDK request to a local
  mock GraphQL backend, bearer forwarding, and upstream error redaction.
- Docker build/run could not be verified: the execution sandbox denied access to
  the local Docker engine. A real Fabric query also requires your workspace,
  configured Todo entity, and valid application session token.

## References

- [Microsoft Fabric CLI quickstart](https://learn.microsoft.com/en-us/fabric/apps/create-app-with-cli)
- [Rayfin Node.js client](https://rayfin.ai/docs/reference/sdk/rayfin-client)
- [Rayfin CLI authentication](https://rayfin.ai/docs/reference/cli/login)
- [Local development against Fabric](https://rayfin.ai/docs/reference/cli/dev)
- [npm install script policy](https://docs.npmjs.com/cli/commands/npm-ci/)
