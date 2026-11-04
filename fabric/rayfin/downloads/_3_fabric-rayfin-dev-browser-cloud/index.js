import './sdk-logging.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { RayfinServerClient } from '@microsoft/rayfin-client';

const host = process.env.HOST?.trim() || '0.0.0.0';
const portText = process.env.PORT ?? '3000';
const port = Number(portText);
if (!/^\d+$/.test(portText) || !Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

// Supply these at runtime. Do not copy credentials into the Docker image.
const backendMode = process.env.RAYFIN_BACKEND_MODE || 'fabric';
if (!['fabric', 'local'].includes(backendMode)) throw new Error('RAYFIN_BACKEND_MODE must be fabric or local.');
const localConfig = backendMode === 'local'
  ? JSON.parse(readFileSync(process.env.RAYFIN_LOCAL_STATE_FILE || '/var/lib/rayfin-local/client.json', 'utf8'))
  : null;
const baseUrl = localConfig?.baseUrl?.trim() || process.env.RAYFIN_API_URL?.trim();
const publishableKey = localConfig?.publishableKey?.trim() || process.env.RAYFIN_PUBLISHABLE_KEY?.trim();
if (backendMode === 'local' && (!baseUrl || !publishableKey)) throw new Error('Local backend state is incomplete; rerun the rayfin-init service.');
if (Boolean(baseUrl) !== Boolean(publishableKey)) {
  throw new Error('Set both RAYFIN_API_URL and RAYFIN_PUBLISHABLE_KEY, or leave both unset.');
}
if (baseUrl) {
  const parsed = new URL(baseUrl);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error('RAYFIN_API_URL must be an HTTP(S) backend URL without credentials, query, or fragment.');
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  try {
    // An absolute, fixed base avoids relying on the incoming Host header.
    const { pathname } = new URL(request.url, 'http://localhost');
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET');
      return sendJson(response, 405, { error: 'Use GET.' });
    }
    if (pathname === '/health') {
      // Process liveness only; this does not contact or authenticate to Fabric.
      return sendJson(response, 200, { status: 'ok' });
    }
    if (pathname === '/') {
      return sendJson(response, 200, {
        message: 'Microsoft Fabric Rayfin Node.js development sample',
        backendConfigured: Boolean(baseUrl),
        backendMode,
        endpoints: ['GET /health', 'GET /todos'],
      });
    }
    if (pathname !== '/todos') {
      return sendJson(response, 404, { error: 'Route not found.' });
    }
    if (!baseUrl) {
      return sendJson(response, 503, {
        error: 'Set RAYFIN_API_URL and RAYFIN_PUBLISHABLE_KEY to connect to your Fabric Rayfin backend.',
      });
    }

    // Forward the caller's Rayfin session token. CLI login tokens are separate.
    const authorization = request.headers.authorization;
    const bearer = /^Bearer\s+(\S+)$/i.exec(authorization ?? '');
    if (!bearer) {
      response.setHeader('WWW-Authenticate', 'Bearer');
      return sendJson(response, 401, { error: 'Supply Authorization: Bearer <Rayfin-session-token>.' });
    }
    const client = new RayfinServerClient({
      baseUrl,
      publishableKey,
      accessToken: bearer[1],
      timeout: 10000,
    });
    // Requires an existing Todo entity with id/title fields and read permission.
    const todos = await client.data.Todo.select(['id', 'title']).execute();
    return sendJson(response, 200, { todos });
  } catch {
    // SDK errors can contain request details; keep tokens out of responses/logs.
    return sendJson(response, 502, {
      error: 'Rayfin request failed. Check the backend URL, session token, Todo schema, and read permissions.',
    });
  }
});

server.on('error', (error) => {
  console.error(`Server could not start: ${error.code ?? 'unknown error'}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Rayfin development sample listening on ${host}:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
