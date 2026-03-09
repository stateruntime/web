const EPOCH = new Date('2025-01-01T00:00:00Z').getTime();

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0');
}

function update() {
  const el = document.getElementById('mission-clock');
  if (!el) return;

  const elapsed = Date.now() - EPOCH;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  el.textContent = `T+ ${pad(days, 3)}d ${pad(hours % 24)}h ${pad(minutes % 60)}m ${pad(seconds % 60)}s`;
}

update();
setInterval(update, 1000);
