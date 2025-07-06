/**
 * Animation Hook
 * 
 * Hook for managing animations with reduced motion support
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { createIntersectionObserver, injectCSSAnimations } from '../lib/animations';

interface UseAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  respectReducedMotion?: boolean;
}

interface UseAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  isAnimating: boolean;
  trigger: () => void;
}

export function useAnimation(
  options: UseAnimationOptions = {}
): UseAnimationReturn {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    respectReducedMotion = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  const trigger = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion) return;
    
    setIsAnimating(true);
    
    if (delay > 0) {
      setTimeout(() => {
        setIsVisible(true);
        setHasTriggered(true);
      }, delay);
    } else {
      setIsVisible(true);
      setHasTriggered(true);
    }
  }, [delay, respectReducedMotion, prefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If reduced motion is preferred, show immediately
    if (respectReducedMotion && prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
            trigger();
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsVisible(false);
            setIsAnimating(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    if (observer) {
      observer.observe(element);
    }

    return () => {
      if (observer) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, trigger, respectReducedMotion, prefersReducedMotion]);

  return {
    ref,
    isVisible,
    isAnimating,
    trigger
  };
}

// Hook for staggered animations
export function useStaggeredAnimation(
  itemCount: number,
  staggerDelay: number = 100,
  options: UseAnimationOptions = {}
) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const { ref, isVisible } = useAnimation(options);

  useEffect(() => {
    if (isVisible) {
      const newVisibleItems = [...visibleItems];
      
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          newVisibleItems[i] = true;
          setVisibleItems([...newVisibleItems]);
        }, i * staggerDelay);
      }
    }
  }, [isVisible, itemCount, staggerDelay]);

  return {
    ref,
    visibleItems,
    isVisible
  };
}

// Hook for scroll-based animations
export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollY(currentScrollY);
      setScrollDirection(direction);
      
      // Calculate scroll progress (0-1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = currentScrollY / (documentHeight - windowHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollY,
    scrollDirection,
    scrollProgress
  };
}

// Hook for reduced motion detection
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook for hover animations
export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return {
    ref,
    isHovered
  };
}

// Hook for CSS animations
export function useCSSAnimations() {
  useEffect(() => {
    injectCSSAnimations();
  }, []);
}

// Hook for parallax effects
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return {
    ref,
    offset,
    style: {
      transform: `translateY(${offset}px)`
    }
  };
}

// Hook for typewriter effect
export function useTypewriter(
  text: string,
  speed: number = 50,
  startDelay: number = 0
) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const typeNextCharacter = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, startDelay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, startDelay]);

  return {
    displayText,
    isComplete
  };
}
