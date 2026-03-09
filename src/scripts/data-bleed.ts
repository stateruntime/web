import { gsap, ScrollTrigger } from './gsap-init';

export function dataBleed(selector: string) {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach((el) => {
    const target = parseFloat(el.dataset.value || el.textContent || '0');
    const decimals = (String(target).split('.')[1] || '').length;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      },
    });
  });
}
