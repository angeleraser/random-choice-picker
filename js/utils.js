export function cronometer({
  durationMs,
  callback,
  onComplete,
  intervalMs = 100,
}) {
  let totalMs = 0;

  const interval = setInterval(() => {
    totalMs += intervalMs;
    callback?.();
    if (totalMs >= durationMs) {
      onComplete?.();
      clearInterval(interval);
    }
  }, intervalMs);
}

export function getSeparatedWords(str = "") {
  return str.length ? str.split(/\.|\,+/).filter((v) => v) : [];
}

export function getRandomIndex(length = 0) {
  return Math.floor(Math.random() * length);
}
