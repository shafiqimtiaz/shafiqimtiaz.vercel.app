let lenisInstance = null;

export function setLenis(lenis) {
  lenisInstance = lenis;
}

export function scrollToId(id) {
  const element = document.getElementById(id);
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: 0, duration: 1.1 });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
