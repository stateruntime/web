const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function tick() {
  elements.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.02');
    const scrollY = window.scrollY;
    const offsetY = scrollY * speed * -0.5;
    const offsetX = mouseX * speed * 20;
    const offsetMouseY = mouseY * speed * 20;
    el.style.transform = `translate3d(${offsetX}px, ${offsetY + offsetMouseY}px, 0)`;
  });
  requestAnimationFrame(tick);
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(tick);
}
