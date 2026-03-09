import { gsap, ScrollTrigger } from './gsap-init';

export function scanIn(selector: string, options: { trigger?: string; stagger?: number } = {}) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    const text = el.textContent || '';
    el.textContent = '';
    el.setAttribute('aria-label', text);

    // Split into words to preserve natural word wrapping
    const words = text.split(/(\s+)/);
    const allChars: HTMLSpanElement[] = [];

    words.forEach((word) => {
      if (/^\s+$/.test(word)) {
        // Whitespace — use a normal inline space
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.opacity = '0';
        el.appendChild(space);
        allChars.push(space);
      } else {
        // Wrap word in a span to prevent mid-word breaks
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        wordWrap.style.whiteSpace = 'nowrap';

        word.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          wordWrap.appendChild(span);
          allChars.push(span);
        });

        el.appendChild(wordWrap);
      }
    });

    const triggerEl = options.trigger ? document.querySelector(options.trigger) : el;

    gsap.to(allChars, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.02,
      delay: (options.stagger || 0) * index,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        once: true,
      },
      onUpdate: function () {
        allChars.forEach((c) => {
          const progress = parseFloat(c.style.opacity);
          if (progress > 0 && progress < 1) {
            c.style.color = 'var(--signal)';
          } else if (progress >= 1) {
            c.style.color = '';
          }
        });
      },
    });
  });
}
