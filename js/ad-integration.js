// Ad Integration Script for AdultHub.com
// Handles ad loading, placement, and compliance with ad networks

class AdIntegration {
    constructor() {
        this.adNetworks = {
            exoclick: {
                enabled: true,
                scriptUrl: '//a.exoclick.com/tag/your-exoclick-tag.js',
                zoneId: 'your-exoclick-zone-id'
            },
            juicyads: {
                enabled: true,
                scriptUrl: '//ads.juicyads.com/js/juicyads.js',
                zoneId: 'your-juicyads-zone-id'
            },
            trafficjunky: {
                enabled: true,
                scriptUrl: '//ads.trafficjunky.net/ads.js',
                zoneId: 'your-trafficjunky-zone-id'
            }
        };
        
        this.init();
    }
    
    init() {
        // Load ad scripts asynchronously
        this.loadAdNetworks();
        
        // Set up ad refresh intervals
        this.setupAdRefresh();
        
        // Initialize popunder functionality
        this.initPopunder();
        
        // Track ad visibility
        this.trackAdVisibility();
    }
    
    loadAdNetworks() {
        // Load ExoClick script
        if (this.adNetworks.exoclick.enabled) {
            this.loadScript(this.adNetworks.exoclick.scriptUrl, 'exoclick-script');
        }
        
        // Load JuicyAds script
        if (this.adNetworks.juicyads.enabled) {
            this.loadScript(this.adNetworks.juicyads.scriptUrl, 'juicyads-script');
        }
        
        // Load TrafficJunky script
        if (this.adNetworks.trafficjunky.enabled) {
            this.loadScript(this.adNetworks.trafficjunky.scriptUrl, 'trafficjunky-script');
        }
    }
    
    loadScript(src, id) {
        // Check if script already exists
        if (document.getElementById(id)) {
            return;
        }
        
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;
        script.defer = true;
        
        // Add error handling
        script.onerror = () => {
            console.warn(`Failed to load ad script: ${src}`);
            this.fallbackAdPlacement(id);
        };
        
        document.head.appendChild(script);
    }
    
    fallbackAdPlacement(adNetworkId) {
        // Fallback to alternative ad placement if primary fails
        console.log(`Using fallback for ${adNetworkId}`);
        
        // You can implement fallback ad placements here
        // For example, load a different ad network or show house ads
    }
    
    setupAdRefresh() {
        // Refresh ads periodically to maintain revenue
        setInterval(() => {
            this.refreshAds();
        }, 60000); // Refresh every minute
    }
    
    refreshAds() {
        // This would be implemented based on your ad network's refresh method
        console.log('Refreshing ads...');
        
        // Example: Trigger ad refresh for each ad container
        const adContainers = document.querySelectorAll('.ad-placeholder');
        adContainers.forEach(container => {
            // In a real implementation, you would call the ad network's refresh method
            // For now, we'll just log that we're refreshing
            console.log(`Refreshing ad in container: ${container.id}`);
        });
    }
    
    initPopunder() {
        // Implement popunder functionality (compliant with ExoClick/JuicyAds)
        document.addEventListener('click', (e) => {
            // Only trigger popunder on non-ad elements to avoid issues
            if (!e.target.closest('.ad-placeholder') && !e.target.closest('a[href^="http"]')) {
                // Add a small delay to avoid blocking the main action
                setTimeout(() => {
                    this.triggerPopunder();
                }, 100);
            }
        });
        
        // Also trigger popunder after a delay on page load
        setTimeout(() => {
            this.triggerPopunder();
        }, 3000);
    }
    
    triggerPopunder() {
        // This is a placeholder for popunder implementation
        // In a real scenario, you would integrate with your ad network's popunder code
        console.log('Popunder triggered');
        
        // Example popunder implementation (for demonstration only)
        // In practice, this would be handled by your ad network's script
        try {
            // This is just a placeholder - real implementation would use ad network code
            const popunderUrl = 'https://example-popunder.com';
            
            // Create a temporary link and click it programmatically
            const link = document.createElement('a');
            link.href = popunderUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // Add to document, click, then remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.warn('Popunder failed:', e);
        }
    }
    
    trackAdVisibility() {
        // Use Intersection Observer to track ad visibility
        const adContainers = document.querySelectorAll('.ad-placeholder');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ad is visible, potentially load the actual ad
                    this.loadAdForContainer(entry.target);
                }
            });
        }, {
            rootMargin: '50px' // Start loading when ad is 50px from view
        });
        
        adContainers.forEach(container => {
            observer.observe(container);
        });
    }
    
    loadAdForContainer(container) {
        // In a real implementation, this would load the actual ad
        // For now, we'll just update the placeholder
        console.log(`Loading ad for container: ${container.id}`);
        
        // Add a class to indicate the ad is loaded
        container.classList.add('ad-loaded');
    }
    
    // Method to dynamically insert ad scripts based on placement
    insertAd(placementId, adNetwork = 'default') {
        const container = document.getElementById(placementId);
        if (!container) {
            console.warn(`Ad container not found: ${placementId}`);
            return;
        }
        
        // Create ad element based on placement
        const adElement = document.createElement('div');
        adElement.className = `ad-element ad-${adNetwork}`;
        adElement.dataset.adNetwork = adNetwork;
        
        // Add ad-specific attributes
        switch(adNetwork) {
            case 'exoclick':
                adElement.innerHTML = `<!-- ExoClick Ad for ${placementId} -->`;
                break;
            case 'juicyads':
                adElement.innerHTML = `<!-- JuicyAds Ad for ${placementId} -->`;
                break;
            case 'trafficjunky':
                adElement.innerHTML = `<!-- TrafficJunky Ad for ${placementId} -->`;
                break;
            default:
                adElement.innerHTML = `<!-- Default Ad for ${placementId} -->`;
        }
        
        // Replace the placeholder with the ad element
        container.innerHTML = '';
        container.appendChild(adElement);
    }
    
    // Method to handle ad loading errors
    handleAdError(placementId, error) {
        console.error(`Ad error in ${placementId}:`, error);
        
        // Fallback: show a default ad or hide the container
        const container = document.getElementById(placementId);
        if (container) {
            container.innerHTML = '<div class="ad-error">Ad temporarily unavailable</div>';
        }
    }
}

// Initialize ad integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is 18+ before initializing ads
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (ageVerified) {
        window.adIntegration = new AdIntegration();
        
        // Insert ads for specific placements
        setTimeout(() => {
            if (window.adIntegration) {
                window.adIntegration.insertAd('header-ad', 'exoclick');
                window.adIntegration.insertAd('in-content-ad', 'juicyads');
                window.adIntegration.insertAd('footer-ad', 'trafficjunky');
                window.adIntegration.insertAd('native-ad', 'exoclick');
                window.adIntegration.insertAd('privacy-ad', 'juicyads');
                window.adIntegration.insertAd('terms-ad', 'trafficjunky');
                window.adIntegration.insertAd('contact-ad', 'exoclick');
                window.adIntegration.insertAd('category-ad', 'juicyads');
            }
        }, 1000); // Delay to ensure ad scripts are loaded
    } else {
        console.log('Age not verified, not loading ads');
    }
});

// Additional ad-specific functions
function loadExoClickAd(zoneId, containerId) {
    // Placeholder for ExoClick integration
    console.log(`Loading ExoClick ad for zone: ${zoneId} in container: ${containerId}`);
    
    // In a real implementation, this would call ExoClick's API
    // ExoClick typically provides a script that you insert
}

function loadJuicyAdsAd(zoneId, containerId) {
    // Placeholder for JuicyAds integration
    console.log(`Loading JuicyAds ad for zone: ${zoneId} in container: ${containerId}`);
    
    // In a real implementation, this would call JuicyAds' API
}

function loadTrafficJunkyAd(zoneId, containerId) {
    // Placeholder for TrafficJunky integration
    console.log(`Loading TrafficJunky ad for zone: ${zoneId} in container: ${containerId}`);
    
    // In a real implementation, this would call TrafficJunky's API
}