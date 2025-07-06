/**
 * Critical CSS Utilities
 * 
 * Functions for optimizing CSS loading and performance
 */

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for immediate rendering */
  
  /* Font loading optimization */
  @font-face {
    font-family: 'Anton';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Anton-Regular.woff2') format('woff2');
  }
  
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Montserrat-Regular.woff2') format('woff2');
  }
  
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/Montserrat-SemiBold.woff2') format('woff2');
  }
  
  /* Critical layout styles */
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #2d3748;
    background-color: #ffffff;
  }
  
  /* Hero section critical styles */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  }
  
  /* Critical button styles */
  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background-color: #68d391;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .cta-button:hover {
    background-color: #48bb78;
    transform: translateY(-1px);
  }
  
  /* Loading skeleton styles */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Critical responsive styles */
  @media (max-width: 768px) {
    .hero-section {
      min-height: 80vh;
      padding: 2rem 1rem;
    }
    
    .cta-button {
      width: 100%;
      padding: 1.25rem 2rem;
    }
  }
`;

// Function to inject critical CSS
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return; // Already injected
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;
  
  const resources = [
    // Critical fonts
    { href: '/fonts/Anton-Regular.woff2', as: 'font', type: 'font/woff2' },
    { href: '/fonts/Montserrat-Regular.woff2', as: 'font', type: 'font/woff2' },
    { href: '/fonts/Montserrat-SemiBold.woff2', as: 'font', type: 'font/woff2' },
    
    // Critical images
    { href: '/images/hero-bg.jpg', as: 'image' },
    { href: '/images/course-preview.jpg', as: 'image' },
    
    // Critical API endpoints
    { href: '/api/proxy/calendar', as: 'fetch', crossOrigin: 'anonymous' }
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
    document.head.appendChild(link);
  });
}

// Preconnect to external domains
export function preconnectExternalDomains() {
  if (typeof document === 'undefined') return;
  
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Optimize image loading with intersection observer
export function optimizeImageLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Replace data-src with src for lazy loading
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Add loaded class for fade-in effect
        img.classList.add('loaded');
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });
  
  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Resource hints for better performance
export function addResourceHints() {
  if (typeof document === 'undefined') return;
  
  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    '//www.googletagmanager.com',
    '//www.google-analytics.com',
    '//fonts.googleapis.com'
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}
