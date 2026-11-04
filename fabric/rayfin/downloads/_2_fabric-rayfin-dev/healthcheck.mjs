// Check editor HTTP liveness even when no browser is connected ("expired" is OK).
try {
  const responses = await Promise.all([
    fetch(`http://127.0.0.1:${process.env.PORT ?? '3000'}/health`, { signal: AbortSignal.timeout(3000) }),
    fetch('http://127.0.0.1:8080/healthz', { signal: AbortSignal.timeout(3000) }),
  ]);
  if (responses.some(response => !response.ok)) process.exitCode = 1;
} catch {
  process.exitCode = 1;
}
