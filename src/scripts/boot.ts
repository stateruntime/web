const STORAGE_KEY = 'sr-boot-seen';
const boot = document.getElementById('boot-sequence');
const output = document.getElementById('boot-output');

if (!boot || !output) throw new Error('Boot elements not found');

const lines = [
  '> STATE RUNTIME v0.1.0',
  '> initializing kernel...',
  '> loading modules: behave, fault',
  '> 10 modules [CLASSIFIED]',
  '> dependency graph ............ OK',
  '> mission clock sync .......... OK',
  '> telemetry link .............. OK',
  '> all systems nominal',
  '',
  '> READY',
];

const shouldSkip =
  localStorage.getItem(STORAGE_KEY) === '1' ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

if (shouldSkip) {
  boot.classList.add('hidden');
  document.body.style.overflow = '';
} else {
  document.body.style.overflow = 'hidden';
  runBoot();
}

async function runBoot() {
  for (const line of lines) {
    await delay(line === '' ? 100 : 120 + Math.random() * 80);
    output!.textContent += line + '\n';
  }
  await delay(400);
  localStorage.setItem(STORAGE_KEY, '1');
  boot!.classList.add('done');
  document.body.style.overflow = '';
  setTimeout(() => boot!.classList.add('hidden'), 300);
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
