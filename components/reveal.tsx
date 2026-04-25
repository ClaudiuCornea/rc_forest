'use client';

import React, { useRef, useEffect, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

// Map of observers keyed by threshold to ensure correct behavior for different reveal triggers
const observersByThreshold = new Map<number, IntersectionObserver>();
const callbacks = new Map<Element, () => void>();

const getSharedObserver = (threshold: number) => {
  let observer = observersByThreshold.get(threshold);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = callbacks.get(entry.target);
            if (callback) {
              callback();
              observer?.unobserve(entry.target);
              callbacks.delete(entry.target);
            }
          }
        });
      },
      { threshold }
    );
    observersByThreshold.set(threshold, observer);
  }
  return observer;
};

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", threshold = 0.05 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = getSharedObserver(threshold);
    
    callbacks.set(element, () => {
      if (delay > 0) {
        setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
        callbacks.delete(element);
      }
    };
  }, [delay, threshold, isVisible]);

  return (
    <div ref={ref} className={`reveal animate ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
};
