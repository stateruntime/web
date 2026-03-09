/**
 * L-shaped corner brackets that animate to element corners on hover.
 * Apply `data-lock` to any element to activate.
 */
export function initLockAnimations() {
  const elements = document.querySelectorAll<HTMLElement>('[data-lock]');

  elements.forEach((el) => {
    el.style.position = 'relative';

    // Create 4 corner brackets
    const corners = ['tl', 'tr', 'bl', 'br'] as const;
    corners.forEach((pos) => {
      const bracket = document.createElement('span');
      bracket.className = `lock-bracket lock-${pos}`;
      bracket.setAttribute('aria-hidden', 'true');
      el.appendChild(bracket);
    });
  });
}

// Inject bracket styles
const style = document.createElement('style');
style.textContent = `
  .lock-bracket {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--signal);
    border-style: solid;
    border-width: 0;
    opacity: 0;
    transition: all 0.25s var(--ease-out-expo);
    pointer-events: none;
  }
  .lock-tl { top: -4px; left: -4px; border-top-width: 1px; border-left-width: 1px; }
  .lock-tr { top: -4px; right: -4px; border-top-width: 1px; border-right-width: 1px; }
  .lock-bl { bottom: -4px; left: -4px; border-bottom-width: 1px; border-left-width: 1px; }
  .lock-br { bottom: -4px; right: -4px; border-bottom-width: 1px; border-right-width: 1px; }

  [data-lock]:hover .lock-bracket {
    opacity: 1;
  }
  [data-lock]:hover .lock-tl { top: -6px; left: -6px; }
  [data-lock]:hover .lock-tr { top: -6px; right: -6px; }
  [data-lock]:hover .lock-bl { bottom: -6px; left: -6px; }
  [data-lock]:hover .lock-br { bottom: -6px; right: -6px; }
`;
document.head.appendChild(style);
