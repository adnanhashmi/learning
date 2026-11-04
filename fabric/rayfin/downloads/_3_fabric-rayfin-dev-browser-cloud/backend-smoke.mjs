import './sdk-logging.mjs';
import { randomUUID, randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { RayfinClient } from '@microsoft/rayfin-client';

// Explicitly invoked local-only check. It creates one disposable auth account.
if (process.env.RAYFIN_BACKEND_MODE !== 'local') throw new Error('Run this check inside the local Compose development service.');
const config = JSON.parse(await readFile(process.env.RAYFIN_LOCAL_STATE_FILE || '/var/lib/rayfin-local/client.json', 'utf8'));
const client = new RayfinClient({ ...config, authStorage: false, timeout: 10000 });
const id = randomUUID();
const email = `smoke-${id}@example.com`;
const password = 'Rf1!' + randomBytes(24).toString('base64');
let created = false;
let signedIn = false;
try {
  await client.auth.signUp({ email, password });
  const session = await client.auth.signIn({ email, password });
  signedIn = true;
  await client.data.Todo.create({ id, title: 'Local backend smoke test' });
  created = true;
  const response = await fetch(`http://127.0.0.1:${process.env.PORT || '3000'}/todos`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('The sample app data request failed.');
  if (!JSON.stringify(await response.json()).includes(id)) throw new Error('The created Todo was not returned.');
  console.log('PASS: local signup, signin, Todo create, and sample app query.');
} catch (error) {
  console.error(`Local smoke check failed (${error.code || error.name}). Inspect docker compose logs for the failing service.`);
  process.exitCode = 1;
} finally {
  if (created) {
    try { await client.data.Todo.delete({ id }); }
    catch { console.error('The smoke-test Todo could not be removed.'); process.exitCode = 1; }
  }
  if (signedIn) {
    try { await client.auth.signOut(); }
    catch { console.error('The smoke-test session could not be signed out.'); process.exitCode = 1; }
  }
  client.auth.destroy();
}
