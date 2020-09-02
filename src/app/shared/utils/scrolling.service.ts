import { ElementRef } from '@angular/core';

/**
 *  This function is used for scrolling animation
 */
export const smoothScroll = (event: Event, element: ElementRef) => {
  event.preventDefault();

  const targetId =
  (event.currentTarget as HTMLElement).getAttribute('href') === '#'
      ? 'header'
      : (event.currentTarget as HTMLElement).getAttribute('href');


  const targetPosition = element.nativeElement.offsetTop - 32;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestemp) {
    if (!start) {
      start = timestemp;
    }
    const progress = timestemp - start;

    window.scrollTo(0, distance * (progress / duration) + startPosition);
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) {window.requestAnimationFrame(step); }
  }


  // more function on http://gizma.com/
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {return c / 2 * t * t * t + b; }
    t -= 2;
    return c / 2 * ( t * t * t + 2) + b;
  }
};
