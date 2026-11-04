import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { parse } from 'yaml';

// The endpoints and payloads below match the pinned 1.33.0 CLI's local provider.
export async function initializeBackend({
  backendUrl = process.env.RAYFIN_LOCAL_BACKEND_URL || 'http://rayfin-backend:8080',
  stateFile = process.env.RAYFIN_LOCAL_STATE_FILE || '/var/lib/rayfin-local/client.json',
  projectRoot = process.cwd(),
  generate = generateSchema,
  attempts = 60,
  retryMs = 2000,
} = {}) {
  const baseUrl = new URL(backendUrl);
  if (baseUrl.protocol !== 'http:' || baseUrl.username || baseUrl.password || baseUrl.search || baseUrl.hash || baseUrl.pathname !== '/') {
    throw new Error('Local backend URL must be a plain HTTP origin without credentials.');
  }
  const root = baseUrl.origin;
  const config = parse(await readFile(resolve(projectRoot, 'rayfin/rayfin.yml'), 'utf8'));
  if (config.services?.data?.dialect !== 'mssql') throw new Error('This Compose stack requires the mssql data dialect.');

  async function request(path, body) {
    const response = await fetch(root + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}.`);
    return response;
  }
  async function retry(action, name) {
    for (let i = 0; i < attempts; i++) {
      try { return await action(); }
      catch (error) {
        if (i === attempts - 1) throw new Error(`${name} failed after ${attempts} attempts: ${error.message}`);
        await delay(retryMs);
      }
    }
  }

  console.log('Waiting for the local Rayfin backend...');
  await retry(() => request('/healthcheck'), 'Backend readiness');
  await retry(() => request('/api/projectRuntimeSettings', config.services), 'Runtime settings');
  await generate(projectRoot);
  const configData = await readFile(resolve(projectRoot, 'rayfin/.temp/dab-config.json'), 'utf8');
  const dab = JSON.parse(configData);
  if (!dab.entities?.Todo) throw new Error('The generated schema does not include Todo.');
  // Never force a potentially destructive migration automatically.
  await retry(() => request('/api/applyconfig', { ConfigData: configData, Force: false }), 'Schema apply');
  const publicConfig = await retry(async () => {
    const key = await (await request('/api/publishable-key')).json();
    if (typeof key.publishableKey !== 'string' || !key.publishableKey.trim()) throw new Error('Backend has not generated a publishable key.');
    return { baseUrl: root, publishableKey: key.publishableKey };
  }, 'Publishable key discovery');
  await mkdir(dirname(stateFile), { recursive: true });
  await writeFile(stateFile + '.tmp', JSON.stringify(publicConfig), { mode: 0o600 });
  await rename(stateFile + '.tmp', stateFile);
  console.log('Local auth/data runtime and Todo schema are ready.');
  return publicConfig;
}

function generateSchema(projectRoot) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, ['schema-generate.mjs'], { cwd: projectRoot, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolvePromise() : reject(new Error(`Schema generation exited with code ${code}.`)));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { await initializeBackend(); }
  catch (error) { console.error(`Local backend initialization failed: ${error.message}`); process.exitCode = 1; }
}
