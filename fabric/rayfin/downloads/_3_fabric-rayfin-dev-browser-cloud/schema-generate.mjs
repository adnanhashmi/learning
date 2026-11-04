import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const cli = join(dirname(require.resolve('@microsoft/rayfin-cli/package.json')), 'scripts', 'main');
const child = spawn(process.execPath, [cli, 'dev', 'db', 'apply', '--gen-config-only'], {
  stdio: 'inherit',
  env: { ...process.env, RAYFIN_FEATURE_FLAGS: 'docker-local-dev', RAYFIN_TELEMETRY_OPTOUT: '1' },
});
child.once('error', error => { console.error(`Schema compiler failed: ${error.code}`); process.exitCode = 1; });
child.once('exit', code => { process.exitCode = code ?? 1; });
