const EPOCH = new Date('2026-03-09T14:28:00Z').getTime();

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0');
}

function update() {
  const els = document.querySelectorAll('.mission-clock');
  if (!els.length) return;

  const elapsed = Date.now() - EPOCH;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const text = `T+ ${pad(days, 3)}d ${pad(hours % 24)}h ${pad(minutes % 60)}m ${pad(seconds % 60)}s`;
  els.forEach((el) => { el.textContent = text; });
}

update();
setInterval(update, 1000);
