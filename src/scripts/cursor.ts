const cursor = document.getElementById('cursor');
if (!cursor) throw new Error('Cursor element not found');

const outer = cursor.querySelector('.cursor-outer') as HTMLElement;
const inner = cursor.querySelector('.cursor-inner') as HTMLElement;

let mouseX = -100;
let mouseY = -100;
let curX = -100;
let curY = -100;
let rotation = 0;
let hovering = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Detect interactive elements
const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-interactive]';
document.addEventListener('mouseover', (e) => {
  const target = e.target as HTMLElement;
  hovering = !!target.closest(interactiveSelector);
});

function tick() {
  curX += (mouseX - curX) * 0.15;
  curY += (mouseY - curY) * 0.15;
  rotation += hovering ? 0 : 1.5;

  cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
  outer.style.transform = `rotate(${45 + (hovering ? 0 : rotation)}deg) scale(${hovering ? 1.5 : 1})`;
  inner.style.transform = `rotate(${hovering ? 45 : -rotation * 0.5}deg)`;

  requestAnimationFrame(tick);
}

// Hide cursor on touch
if (matchMedia('(hover: none)').matches) {
  cursor.style.display = 'none';
  document.documentElement.style.cursor = 'auto';
} else {
  cursor.style.opacity = '0';
  requestAnimationFrame(tick);
}
