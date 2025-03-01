// Main page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        // Add a slight delay between each card animation
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Initialize reveal animations for elements as they scroll into view
    const revealElements = document.querySelectorAll('.features-section h2, .feature-card');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // Portales section animations
    const portalCards = document.querySelectorAll('.portal-card');
    
    if ('IntersectionObserver' in window && portalCards.length > 0) {
        const portalCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    portalCardObserver.unobserve(entry.target);
                    
                    // Animate the stats numbers
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(statValue => {
                        const finalValue = statValue.textContent;
                        if (finalValue.includes('k+')) {
                            // Handle thousands with "k+" format
                            const numericValue = parseInt(finalValue);
                            animateValue(statValue, 0, numericValue, 1500, 'k+');
                        } else if (finalValue.includes('/')) {
                            // Handle special formats like "24/7"
                            // No animation for these values
                        } else {
                            // Regular numeric values
                            const numericValue = parseInt(finalValue);
                            animateValue(statValue, 0, numericValue, 1500, '+');
                        }
                    });
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        portalCards.forEach(card => {
            // Add base styles for animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Start observing
            portalCardObserver.observe(card);
        });
        
        // Add CSS class for animated cards
        const style = document.createElement('style');
        style.textContent = `
            .portal-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Function to animate counting up
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Add hover animations to portal features
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
});