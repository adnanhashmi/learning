import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// An unexpected exit in either service stops the other and fails the container.
export function supervise(services) {
  return new Promise((resolve) => {
    const children = [];
    let stopping = false;
    let exitCode = 0;
    let deadline;

    function signalChildren(signal) {
      for (const child of children) {
        if (!child.pid) continue;
        try {
          if (process.platform === 'win32') child.kill(signal);
          else process.kill(-child.pid, signal);
        } catch (error) {
          if (error.code !== 'ESRCH') console.error(`Could not stop service: ${error.code}`);
        }
      }
    }

    function stop(code) {
      if (stopping) return;
      stopping = true;
      exitCode = code;
      signalChildren('SIGTERM');
      deadline = setTimeout(() => signalChildren('SIGKILL'), 8000);
    }

    const onTerm = () => stop(0);
    const onInt = () => stop(0);
    process.once('SIGTERM', onTerm);
    process.once('SIGINT', onInt);

    let remaining = services.length;
    for (const service of services) {
      const child = spawn(service.command, service.args, {
        env: service.env ?? process.env,
        stdio: 'inherit',
        detached: process.platform !== 'win32',
      });
      children.push(child);
      child.once('error', (error) => {
        console.error(`${service.name} failed to start: ${error.code}`);
        stop(1);
      });
      child.once('exit', (code, signal) => {
        if (!stopping) {
          console.error(`${service.name} exited unexpectedly (${signal ?? code}).`);
          stop(code || 1);
        }
      });
      child.once('close', () => {
        if (--remaining === 0) {
          clearTimeout(deadline);
          process.removeListener('SIGTERM', onTerm);
          process.removeListener('SIGINT', onInt);
          resolve(exitCode);
        }
      });
    }
  });
}

async function main() {
  if (!process.env.PASSWORD?.trim() && !process.env.HASHED_PASSWORD?.trim()) {
    console.error('Set PASSWORD (or HASHED_PASSWORD) at runtime to sign in to the browser editor.');
    return 1;
  }
  const portText = process.env.PORT ?? '3000';
  const port = Number(portText);
  if (!/^\d+$/.test(portText) || !Number.isInteger(port) || port < 1 || port > 65535 || port === 8080) {
    console.error('PORT must be an integer from 1 to 65535, excluding editor port 8080.');
    return 1;
  }
  // code-server treats PORT as an override of --bind-addr. Do not let the app's
  // PORT=3000 make the editor collide with the sample server.
  const { PORT, HOST, ...editorEnv } = process.env;
  const { PASSWORD, HASHED_PASSWORD, ...appEnv } = process.env;
  console.log('Browser editor: port 8080. Sample app: port ' + port);
  return supervise([
    { name: 'sample app', command: process.execPath, args: ['--watch', 'index.js'], env: appEnv },
    {
      name: 'browser editor', command: 'code-server',
      args: ['--bind-addr', '0.0.0.0:8080', '--auth', 'password', '--disable-telemetry', '--disable-update-check', process.cwd()],
      env: editorEnv,
    },
  ]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main();
}
