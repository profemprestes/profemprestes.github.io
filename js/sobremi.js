document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
    
    // Animate progress bars when skills container comes into view
    const skillsContainer = document.querySelector('.skills-container');
    
    // Using Intersection Observer to detect when skills section is visible
    if (skillsContainer && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class to trigger progress bar animation
                    skillsContainer.classList.add('animate');
                    
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the element is visible
            rootMargin: '0px 0px -100px 0px' // Adjust based on when you want animation to start
        });
        
        // Start observing the skills container
        observer.observe(skillsContainer);
    } else {
        // Fallback for browsers not supporting IntersectionObserver
        window.addEventListener('scroll', function() {
            if (skillsContainer) {
                const skillsPosition = skillsContainer.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (skillsPosition < screenPosition) {
                    skillsContainer.classList.add('animate');
                }
            }
        });
    }
    
    // Add interactive decoration shapes animation
    const decorationShapes = document.querySelectorAll('.decoration-shape');
    
    // Add subtle movement to shapes on mouse move
    document.addEventListener('mousemove', function(e) {
        if (decorationShapes.length > 0) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            decorationShapes.forEach((shape, index) => {
                // Create different movement factors for each shape
                // This creates a parallax-like effect
                const factor = (index + 1) * 15;
                const invertFactor = index % 2 === 0 ? 1 : -1;
                
                // Calculate new position
                const moveX = (mouseX - 0.5) * factor * invertFactor;
                const moveY = (mouseY - 0.5) * factor;
                
                // Apply smooth transform
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
    });
    
    // Add hover effects and tooltips for social buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.width = ripple.style.height = Math.max(button.offsetWidth, button.offsetHeight) + 'px';
            
            // Position ripple at click point
            const rect = button.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - ripple.offsetWidth / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - ripple.offsetHeight / 2) + 'px';
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple style for social buttons
    const style = document.createElement('style');
    style.textContent = `
        .social-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add animated text effects to bio paragraphs
    const bioParagraphs = document.querySelectorAll('.bio-text p');
    
    if (bioParagraphs.length > 0 && 'IntersectionObserver' in window) {
        const bioObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add style with delay based on paragraph index
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
                    
                    // Trigger animation after a small delay to ensure transition is applied
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    
                    bioObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        bioParagraphs.forEach(paragraph => {
            bioObserver.observe(paragraph);
        });
    }
});