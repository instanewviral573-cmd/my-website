// Analytics tracking for Telegram redirects
// Tracks user interactions with Telegram download buttons

class TelegramAnalytics {
    constructor() {
        this.init();
    }
    
    init() {
        // Track clicks on Telegram buttons
        this.trackTelegramButtonClicks();
        
        // Track page views
        this.trackPageViews();
    }
    
    trackTelegramButtonClicks() {
        // Use event delegation to track all Telegram button clicks
        document.addEventListener('click', (event) => {
            if (event.target.closest('.telegram-btn, .telegram-main-btn, .telegram-btn-small')) {
                const button = event.target.closest('a');
                if (button && button.href.includes('t.me')) {
                    this.sendEvent('telegram_redirect', {
                        page: window.location.pathname,
                        button_type: this.getButtonType(button),
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });
    }
    
    getButtonType(button) {
        if (button.classList.contains('telegram-main-btn')) {
            return 'main_cta';
        } else if (button.classList.contains('telegram-btn-small')) {
            return 'small_card';
        } else {
            return 'regular_card';
        }
    }
    
    trackPageViews() {
        // Track initial page view
        this.sendEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
        });
        
        // For SPAs or if using history API, you might want to track route changes
        // This is a basic implementation for static pages
    }
    
    sendEvent(eventName, eventData) {
        // In a real implementation, you would send this to your analytics service
        // For example: Google Analytics, custom analytics endpoint, etc.
        
        console.log(`Analytics Event: ${eventName}`, eventData);
        
        // Example of sending to a custom endpoint (uncomment to use)
        /*
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: eventName,
                data: eventData,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            })
        }).catch(err => {
            console.warn('Analytics tracking failed:', err);
        });
        */
        
        // You could also use traditional analytics solutions like:
        // - Google Analytics gtag
        // - Facebook Pixel
        // - Custom tracking pixels
        
        // Example Google Analytics (if GA is loaded):
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
    
    // Utility method to track conversion events
    trackConversion(conversionType, value = null) {
        this.sendEvent('conversion', {
            type: conversionType,
            value: value,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is 18+ before initializing analytics for adult content
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (ageVerified) {
        window.telegramAnalytics = new TelegramAnalytics();
    } else {
        console.log('Age not verified, analytics not initialized');
    }
});

// Additional helper function for manual tracking
function trackTelegramInteraction(type, additionalData = {}) {
    if (window.telegramAnalytics) {
        window.telegramAnalytics.sendEvent(type, {
            ...additionalData,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }
}