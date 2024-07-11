'use client';
import { useEffect, RefObject } from 'react';

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void,
  threshholdValue: number
) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshholdValue,
    };
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback(entry);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, callback]);
};

export default useIntersectionObserver;
