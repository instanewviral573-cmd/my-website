// Lazy Loading Implementation for AdultHub.com
// Optimizes image loading for better performance

class LazyLoader {
    constructor() {
        this.options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        this.imageObserver = null;
        this.init();
    }
    
    init() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            this.setupImageObserver();
            this.observeImages();
        } else {
            // Fallback for browsers that don't support Intersection Observer
            this.loadAllImages();
        }
    }
    
    setupImageObserver() {
        this.imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.options);
    }
    
    observeImages() {
        // Observe all images with the 'lazy' class
        const lazyImages = document.querySelectorAll('img[data-src].lazy');
        
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
        
        // Also observe divs with background images that need lazy loading
        const lazyDivs = document.querySelectorAll('[data-bg-src].lazy');
        
        lazyDivs.forEach(div => {
            this.imageObserver.observe(div);
        });
    }
    
    loadImage(img) {
        // Handle img tags
        if (img.tagName === 'IMG') {
            const src = img.getAttribute('data-src');
            if (src) {
                // Create new image to preload
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                };
                newImg.src = src;
            }
        }
        // Handle divs with background images
        else if (img.hasAttribute('data-bg-src')) {
            const bgSrc = img.getAttribute('data-bg-src');
            if (bgSrc) {
                // Preload background image
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.backgroundImage = `url('${bgSrc}')`;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                };
                newImg.src = bgSrc;
            }
        }
    }
    
    loadAllImages() {
        // Fallback method to load all images immediately
        const lazyImages = document.querySelectorAll('img[data-src].lazy');
        const lazyDivs = document.querySelectorAll('[data-bg-src].lazy');
        
        [...lazyImages, ...lazyDivs].forEach(img => {
            if (img.tagName === 'IMG') {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                }
            } else {
                const bgSrc = img.getAttribute('data-bg-src');
                if (bgSrc) {
                    img.style.backgroundImage = `url('${bgSrc}')`;
                }
            }
            
            img.classList.remove('lazy');
            img.classList.add('loaded');
        });
    }
    
    // Method to add lazy loading to dynamically created images
    addLazyImage(element) {
        if (this.imageObserver) {
            this.imageObserver.observe(element);
        }
    }
}

// Performance optimization utilities
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Optimize page load performance
        this.optimizeFonts();
        this.preloadCriticalResources();
        this.setupResourceHints();
    }
    
    optimizeFonts() {
        // Optimize font loading
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        // In a real implementation, you would specify the actual font URL
    }
    
    preloadCriticalResources() {
        // Preload critical resources like main CSS and JS
        const criticalResources = [
            { href: 'css/style.css', as: 'style' },
            { href: 'js/main.js', as: 'script' },
            { href: 'js/ad-integration.js', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }
    
    setupResourceHints() {
        // Set up resource hints for better performance
        const domains = [
            'https://a.exoclick.com',
            'https://ads.juicyads.com',
            'https://ads.trafficjunky.net',
            'https://www.google-analytics.com'
        ];
        
        domains.forEach(domain => {
            const dnsPrefetch = document.createElement('link');
            dnsPrefetch.rel = 'dns-prefetch';
            dnsPrefetch.href = domain;
            document.head.appendChild(dnsPrefetch);
            
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = domain;
            document.head.appendChild(preconnect);
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loader
    window.lazyLoader = new LazyLoader();
    
    // Initialize performance optimizer
    window.performanceOptimizer = new PerformanceOptimizer();
    
    // Set up page performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
                
                // Send performance data to analytics if needed
                // This would be implemented based on your analytics setup
            }, 0);
        });
    }
});

// Utility function to check if an element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce utility for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}