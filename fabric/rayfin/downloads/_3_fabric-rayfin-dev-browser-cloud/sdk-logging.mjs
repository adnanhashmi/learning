// Rayfin 1.33's ApiClient logs POST response bodies, including auth tokens.
// Keep its status/URL message while dropping response and error objects.
const originalLog = console.log.bind(console);
console.log = (...args) => {
  const message = args[0];
  if (typeof message === 'string' &&
      (message.startsWith('✅ POST Success:') || message.startsWith('❌ POST Error:'))) {
    originalLog(message);
    return;
  }
  originalLog(...args);
};
