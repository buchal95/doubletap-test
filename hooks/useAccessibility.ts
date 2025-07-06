/**
 * Accessibility Hook
 * 
 * Hook for managing accessibility features and WCAG compliance
 */

import { useEffect, useState, useCallback } from 'react';

interface UseAccessibilityOptions {
  enableKeyboardNavigation?: boolean;
  enableFocusManagement?: boolean;
  enableScreenReaderSupport?: boolean;
  enableReducedMotion?: boolean;
}

interface UseAccessibilityReturn {
  isKeyboardUser: boolean;
  prefersReducedMotion: boolean;
  announceToScreenReader: (message: string) => void;
  focusElement: (selector: string) => void;
  trapFocus: (container: HTMLElement) => () => void;
}

export function useAccessibility(
  options: UseAccessibilityOptions = {}
): UseAccessibilityReturn {
  const {
    enableKeyboardNavigation = true,
    enableFocusManagement = true,
    enableScreenReaderSupport = true,
    enableReducedMotion = true
  } = options;

  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation || typeof window === 'undefined') return;

    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [enableKeyboardNavigation]);

  // Detect reduced motion preference
  useEffect(() => {
    if (!enableReducedMotion || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableReducedMotion]);

  // Screen reader announcements
  const announceToScreenReader = useCallback((message: string) => {
    if (!enableScreenReaderSupport || typeof document === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [enableScreenReaderSupport]);

  // Focus management
  const focusElement = useCallback((selector: string) => {
    if (!enableFocusManagement || typeof document === 'undefined') return;

    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, [enableFocusManagement]);

  // Focus trap for modals/dialogs
  const trapFocus = useCallback((container: HTMLElement) => {
    if (!enableFocusManagement) return () => {};

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Focus first element
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [enableFocusManagement]);

  return {
    isKeyboardUser,
    prefersReducedMotion,
    announceToScreenReader,
    focusElement,
    trapFocus
  };
}

// Hook for managing skip links
export function useSkipLinks() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Add skip link if it doesn't exist
    const existingSkipLink = document.querySelector('.skip-link');
    if (existingSkipLink) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded';
    skipLink.textContent = 'Přejít na hlavní obsah';

    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);
}

// Hook for ARIA live regions
export function useAriaLiveRegion() {
  const [liveRegion, setLiveRegion] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.id = 'aria-live-region';

    document.body.appendChild(region);
    setLiveRegion(region);

    return () => {
      if (document.body.contains(region)) {
        document.body.removeChild(region);
      }
    };
  }, []);

  const announce = useCallback((message: string) => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, [liveRegion]);

  return { announce };
}

// Hook for keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const modifiers = {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
        meta: e.metaKey
      };

      // Create shortcut string (e.g., "ctrl+k", "alt+shift+f")
      const shortcutParts = [];
      if (modifiers.ctrl) shortcutParts.push('ctrl');
      if (modifiers.alt) shortcutParts.push('alt');
      if (modifiers.shift) shortcutParts.push('shift');
      if (modifiers.meta) shortcutParts.push('meta');
      shortcutParts.push(key);

      const shortcutString = shortcutParts.join('+');

      if (shortcuts[shortcutString]) {
        e.preventDefault();
        shortcuts[shortcutString]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
