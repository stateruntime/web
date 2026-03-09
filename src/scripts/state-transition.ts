import { gsap } from './gsap-init';

const bar = document.querySelector('.state-transition-bar') as HTMLElement;

export function playTransition(callback?: () => void) {
  const tl = gsap.timeline();
  tl.set(bar, { x: '-101%' })
    .to(bar, { x: '0%', duration: 0.14, ease: 'power2.in' })
    .to(bar, { x: '101%', duration: 0.14, ease: 'power2.out', onStart: callback });
  return tl;
}

// Expose globally for nav
(window as any).__stateTransition = playTransition;
