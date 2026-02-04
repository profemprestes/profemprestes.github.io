/* Combined JS for Matias Prestes Website */

/**
 * Initialize Particles.js with custom options
 * @param {string} elementId - The ID of the element to render particles in
 * @param {object} options - Custom options to override defaults
 */
function initParticles(elementId, options = {}) {
    if (typeof particlesJS !== 'undefined' && document.getElementById(elementId)) {
        const settings = {
            number: options.number || 80,
            color: options.color || "#ffffff",
            lineColor: options.lineColor || "#4facfe",
            lineOpacity: options.lineOpacity !== undefined ? options.lineOpacity : 0.4,
            opacity: options.opacity !== undefined ? options.opacity : 0.5,
            randomOpacity: options.randomOpacity !== undefined ? options.randomOpacity : false,
            grabOpacity: options.grabOpacity !== undefined ? options.grabOpacity : 1,
            moveSpeed: options.moveSpeed || 2
        };

        particlesJS(elementId, {
            "particles": {
                "number": {
                    "value": settings.number,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": settings.color
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": settings.opacity,
                    "random": settings.randomOpacity,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": settings.lineColor,
                    "opacity": settings.lineOpacity,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": settings.moveSpeed,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": settings.grabOpacity
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else if (!document.getElementById(elementId) && typeof particlesJS !== 'undefined') {
        // Element not found, silent or debug log
    } else {
        // console.warn('Particles.js not loaded');
    }
}

/**
 * Initialize AOS with custom options
 * @param {object} options - Custom options to override defaults
 */
function initAOS(options = {}) {
    if (typeof AOS !== 'undefined') {
        const defaults = {
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        };
        AOS.init({ ...defaults, ...options });
    }
}

/* --- general.js --- */
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
/* --- navfooter.js --- */
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.querySelector('.nav-container');
    const navToggle = document.getElementById('nav-toggle');
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');

    // Crear el overlay para el menú móvil
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Función para abrir el menú
    function openMenu() {
        navMenuContainer.classList.add('show');
        navOverlay.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const toggleIcon = navToggle.querySelector('i');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        }
    }

    // Función para cerrar el menú
    function closeMenu() {
        navMenuContainer.classList.remove('show');
        navOverlay.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        const toggleIcon = navToggle.querySelector('i');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    }

    if (navToggle && navMenuContainer) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenuContainer.classList.contains('show')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMenu();

                // Si el enlace apunta a un ancla en la misma página, hacer scroll suave
                const href = this.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Close the menu when clicking on the overlay
        navOverlay.addEventListener('click', closeMenu);

        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) &&
                !navMenuContainer.contains(event.target) &&
                navMenuContainer.classList.contains('show')) {
                closeMenu();
            }
        });

        // Add keyboard accessibility
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenuContainer.classList.contains('show')) {
                closeMenu();
            }
        });
    }

    // Highlight active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Efecto de scroll en la barra de navegación
    function handleScroll() {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Inicializar el estado de la barra de navegación al cargar
    handleScroll();

    // Footer animations
    // Animate footer elements when they come into view
    const footerElements = document.querySelectorAll('.footer-column, .footer-bottom');

    // Create an intersection observer for footer elements
    if ('IntersectionObserver' in window && footerElements.length > 0) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    footerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Prepare each footer element for animation
        footerElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            footerObserver.observe(element);
        });
    }

    // Newsletter form interaction
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterButton = document.querySelector('.newsletter-button');

    if (newsletterForm && newsletterInput && newsletterButton) {
        // Add focus effect
        newsletterInput.addEventListener('focus', () => {
            newsletterForm.classList.add('focused');
        });

        newsletterInput.addEventListener('blur', () => {
            newsletterForm.classList.remove('focused');
        });

        // Handle form submission
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (newsletterInput.value.trim() !== '') {
                // Visual feedback
                newsletterButton.innerHTML = '<i class="fas fa-check"></i>';
                newsletterButton.style.width = newsletterButton.offsetWidth + 'px';

                // Mock submit success
                setTimeout(() => {
                    newsletterInput.value = '';
                    newsletterButton.innerHTML = 'Suscribirse';

                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'newsletter-success';
                    successMessage.textContent = '¡Gracias por suscribirte!';
                    successMessage.style.color = '#4CAF50';
                    successMessage.style.marginTop = '0.5rem';
                    successMessage.style.fontSize = '0.9rem';

                    const existingMessage = document.querySelector('.newsletter-success');
                    if (existingMessage) {
                        existingMessage.remove();
                    }

                    newsletterForm.parentNode.appendChild(successMessage);

                    // Remove message after 3 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => successMessage.remove(), 300);
                    }, 3000);
                }, 1000);
            }
        });
    }

    // Add dynamic animation to decorative elements
    const bouncingRocket = document.querySelector('.bouncing-rocket');
    const spinningLaptop = document.querySelector('.spinning-laptop');

    if (bouncingRocket && spinningLaptop) {
        // Add random movement to rocket
        let rocketX = 10;
        let rocketY = 30;
        let rocketDirX = Math.random() > 0.5 ? 1 : -1;
        let rocketDirY = Math.random() > 0.5 ? 1 : -1;

        // Add random movement to laptop
        let laptopX = 15;
        let laptopY = 15;
        let laptopDirX = Math.random() > 0.5 ? 1 : -1;
        let laptopDirY = Math.random() > 0.5 ? 1 : -1;

        // Slow animation frame
        setInterval(() => {
            // Update rocket position
            rocketX += 0.3 * rocketDirX;
            rocketY += 0.2 * rocketDirY;

            // Bounce rocket off edges
            if (rocketX <= 5 || rocketX >= 20) rocketDirX *= -1;
            if (rocketY <= 10 || rocketY >= 40) rocketDirY *= -1;

            // Apply rocket position
            bouncingRocket.style.left = `${rocketX}%`;
            bouncingRocket.style.top = `${rocketY}%`;

            // Update laptop position
            laptopX += 0.2 * laptopDirX;
            laptopY += 0.2 * laptopDirY;

            // Bounce laptop off edges
            if (laptopX <= 5 || laptopX >= 25) laptopDirX *= -1;
            if (laptopY <= 5 || laptopY >= 25) laptopDirY *= -1;

            // Apply laptop position
            spinningLaptop.style.right = `${laptopX}%`;
            spinningLaptop.style.bottom = `${laptopY}%`;
        }, 100);
    }

    // Add .fade-in class for CSS animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .newsletter-form.focused .newsletter-input {
                background: rgba(255, 255, 255, 0.15);
                box-shadow: 0 0 0 2px rgba(0, 86, 255, 0.3);
            }

            .newsletter-success {
                transition: opacity 0.3s ease;
            }
        </style>
    `);
});
/* --- hero.js --- */
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for hero buttons
    const heroCta = document.getElementById('hero-cta-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Initialize Particles.js
    initParticles('particles-js', {
        number: 80,
        color: "#ffffff",
        opacity: 0.5,
        randomOpacity: false,
        lineColor: "#4facfe",
        lineOpacity: 0.4,
        grabOpacity: 1
    });

    // Add interaction to the profile image
    const profileImage = document.querySelector('.profile-image');
    const badges = document.querySelectorAll('.tech-badge');

    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            badges.forEach(badge => {
                badge.style.animationPlayState = 'paused';
            });
        });

        profileImage.addEventListener('mouseleave', function() {
            badges.forEach(badge => {
                badge.style.animationPlayState = 'running';
            });
        });
    }

    // Code snippets animation
    const codeSnippets = document.querySelectorAll('.code-snippet');
    if (codeSnippets.length > 0) {
        // Random movement for code snippets
        let positions = [];

        codeSnippets.forEach((snippet, index) => {
            positions.push({
                x: parseFloat(getComputedStyle(snippet).left) || 0,
                y: parseFloat(getComputedStyle(snippet).top) || 0,
                dirX: Math.random() > 0.5 ? 1 : -1,
                dirY: Math.random() > 0.5 ? 1 : -1,
                speed: 0.5 + Math.random()
            });
        });

        // This is just for small additional movement, the main animation is in CSS
        const moveSnippets = () => {
            codeSnippets.forEach((snippet, index) => {
                if (!snippet || positions.length <= index) return;

                const currentX = parseFloat(snippet.style.left) || positions[index].x;
                const currentY = parseFloat(snippet.style.top) || positions[index].y;

                // Subtle random movement
                const newX = currentX + (Math.random() * 0.5 - 0.25);
                const newY = currentY + (Math.random() * 0.5 - 0.25);

                snippet.style.left = `${newX}%`;
                snippet.style.top = `${newY}%`;
            });

            requestAnimationFrame(moveSnippets);
        };

        requestAnimationFrame(moveSnippets);
    }

    // Detect when hero section is in view and add extra animation
    const observeElements = document.querySelectorAll('.hero-content, .hero-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observeElements.forEach(element => {
        observer.observe(element);
    });
});
/* --- banner.js (Fixed) --- */
document.addEventListener('DOMContentLoaded', function() {
    initAOS({
        once: false
    });

    const targetDate = new Date('2025-11-29 00:00:00').getTime();
    let countdownTimer;

    function updateCountdown() {
        const endDate = new Date('November 29, 2025 23:59:59').getTime();
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById('days');
        const elHours = document.getElementById('hours');
        const elMinutes = document.getElementById('minutes');
        const elSeconds = document.getElementById('seconds');

        if (elDays) elDays.textContent = days;
        if (elHours) elHours.textContent = hours.toString().padStart(2, '0');
        if (elMinutes) elMinutes.textContent = minutes.toString().padStart(2, '0');
        if (elSeconds) elSeconds.textContent = seconds.toString().padStart(2, '0');

        if (distance < 0 && countdownTimer) {
            clearInterval(countdownTimer);
            if (elDays) elDays.textContent = '0';
            if (elHours) elHours.textContent = '00';
            if (elMinutes) elMinutes.textContent = '00';
            if (elSeconds) elSeconds.textContent = '00';
        }
    }

    if (document.getElementById('days')) {
        updateCountdown();
        countdownTimer = setInterval(updateCountdown, 1000);
    }

    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach(box => {
        box.addEventListener('mouseover', function() {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            ripple.style.setProperty('--ripple-x', x + '%');
            ripple.style.setProperty('--ripple-y', y + '%');
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 1000);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            top: var(--ripple-y, 50%);
            left: var(--ripple-x, 50%);
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 1s ease-out;
        }
        @keyframes ripple {
            0% { width: 0; height: 0; opacity: 0.8; }
            100% { width: 200px; height: 200px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const bannerBtns = document.querySelectorAll('.banner-btn');
    bannerBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

/* --- sobremi.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initAOS();

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
/* --- materias.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#4facfe",
        lineOpacity: 0.2,
        grabOpacity: 0.4
    });

    initAOS();

    // Materias filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');
    const searchInput = document.getElementById('searchMaterias');
    const noResultsElement = document.getElementById('noResults');
    const materiasGrid = document.getElementById('materiasGrid');

    // Function to filter materias based on category
    function filterMaterias(category) {
        let visibleCount = 0;

        materiaCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = '';
                visibleCount++;

                // Remove and reapply AOS attributes to trigger animations
                const aosDelay = parseInt(card.getAttribute('data-aos-delay') || '0');
                card.setAttribute('data-aos-delay', aosDelay.toString());
                card.classList.remove('aos-animate');

                // Add class back after a short delay for animation
                setTimeout(() => {
                    card.classList.add('aos-animate');
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsElement.style.display = 'block';
            materiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            materiasGrid.style.display = 'grid';
        }
    }

    // Filter buttons click handler
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter materias based on selected category
            const category = this.getAttribute('data-filter');
            filterMaterias(category);

            // Clear search input
            searchInput.value = '';
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            // Reset category filter
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            let visibleCount = 0;

            // Filter based on search term
            materiaCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardDescription = card.querySelector('.materia-details p').textContent.toLowerCase();
                const cardFeatures = Array.from(card.querySelectorAll('.materia-features li')).map(item => item.textContent.toLowerCase()).join(' ');

                if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm) || cardFeatures.includes(searchTerm)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsElement.style.display = 'block';
                materiasGrid.style.display = 'none';
            } else {
                noResultsElement.style.display = 'none';
                materiasGrid.style.display = 'grid';
            }
        });
    }

    // Animate floating code snippets in hero section
    const floatingCodes = document.querySelectorAll('.floating-code');
    floatingCodes.forEach((code, index) => {
        setTimeout(() => {
            code.style.opacity = '1';
        }, index * 300);
    });

    // Smooth scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hover effects for materia cards
    materiaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            // Add subtle animation to icon
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';

            // Highlight button
            btn.style.boxShadow = '0 8px 20px rgba(79, 172, 254, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            // Reset icon
            icon.style.transform = 'scale(1)';

            // Reset button
            btn.style.boxShadow = '0 5px 15px rgba(79, 172, 254, 0.2)';
        });
    });

    // Initialize code highlighting and interactions for HTML5 detail page
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // "Back to Materias" button
    const volverBtn = document.getElementById('volverBtn');
    if (volverBtn) {
        volverBtn.addEventListener('click', function() {
            window.location.href = 'materias.html';
        });
    }

    // Copy code button functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create a temporary textarea to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = codeElement.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                // Change the button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado';

                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // "Edit code" button functionality - shows a modal with editable code
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create modal elements
                const modalOverlay = document.createElement('div');
                modalOverlay.classList.add('code-edit-modal');

                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');

                const closeButton = document.createElement('button');
                closeButton.classList.add('close-modal');
                closeButton.innerHTML = '&times;';

                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');
                modalHeader.innerHTML = '<h3>Editor de código</h3>';

                const textarea = document.createElement('textarea');
                textarea.classList.add('code-editor');
                textarea.value = codeElement.textContent;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('modal-buttons');

                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Guardar cambios';

                const cancelButton = document.createElement('button');
                cancelButton.classList.add('cancel-button');
                cancelButton.textContent = 'Cancelar';

                // Assemble the modal
                buttonContainer.appendChild(saveButton);
                buttonContainer.appendChild(cancelButton);

                modalContent.appendChild(closeButton);
                modalContent.appendChild(modalHeader);
                modalContent.appendChild(textarea);
                modalContent.appendChild(buttonContainer);

                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);

                // Show the modal
                setTimeout(() => {
                    modalOverlay.classList.add('show');
                    textarea.focus();
                }, 10);

                // Close modal function
                const closeModal = () => {
                    modalOverlay.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modalOverlay);
                    }, 300);
                };

                // Event listeners for the modal
                closeButton.addEventListener('click', closeModal);
                cancelButton.addEventListener('click', closeModal);

                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });

                saveButton.addEventListener('click', function() {
                    // Update the code
                    codeElement.textContent = textarea.value;

                    // Rehighlight the code
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(codeElement);
                    }

                    closeModal();
                });
            }
        });
    });

    // Form validation demo
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.hasAttribute('pattern') && input.value.trim()) {
                    const pattern = new RegExp(input.getAttribute('pattern'));
                    if (!pattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Simulate success
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Formulario válido';
                submitBtn.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            } else {
                // Show error message
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error de validación';
                submitBtn.style.backgroundColor = '#e74c3c';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Helper function for email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const tocHeight = document.querySelector('.toc-section')?.offsetHeight || 0;
                const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - tocHeight - 20;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add CSS for code editor modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .code-edit-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .code-edit-modal.show {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: white;
            width: 80%;
            max-width: 800px;
            border-radius: 10px;
            position: relative;
            transform: translateY(20px);
            transition: all 0.3s ease;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }

        .code-edit-modal.show .modal-content {
            transform: translateY(0);
        }

        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            background: none;
            border: none;
            color: #555;
            cursor: pointer;
            z-index: 1;
        }

        .modal-header {
            padding: 1rem 2rem;
            border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
            margin: 0;
            color: #333;
        }

        .code-editor {
            padding: 1rem;
            font-family: monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            min-height: 300px;
            width: 100%;
            border: none;
            resize: none;
            flex-grow: 1;
            border-bottom: 1px solid #eee;
        }

        .code-editor:focus {
            outline: none;
        }

        .modal-buttons {
            padding: 1rem 2rem;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }

        .save-button, .cancel-button {
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .save-button {
            background: #e34c26;
            color: white;
        }

        .save-button:hover {
            background: #f06529;
        }

        .cancel-button {
            background: #f1f1f1;
            color: #333;
        }

        .cancel-button:hover {
            background: #e5e5e5;
        }

        /* Form validation styles */
        input.invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
    `;
    document.head.appendChild(modalStyles);

    // Make TOC sticky based on scroll position
    const tocSection = document.querySelector('.toc-section');
    const heroSection = document.querySelector('.curso-hero');

    if (tocSection && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= heroBottom) {
                tocSection.classList.add('sticky');
            } else {
                tocSection.classList.remove('sticky');
            }
        });
    }
});
/* --- contacto.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#4facfe",
        lineOpacity: 0.2,
        grabOpacity: 0.4
    });

    // Animation for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute('data-speed')) || 1;
        icon.style.animationDuration = `${6 * speed}s`;
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');

    // Validation functions
    const validations = {
        name: (value) => {
            if (!value.trim()) return 'El nombre es obligatorio';
            if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'El correo electrónico es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Ingresa un correo electrónico válido';
            return '';
        },
        subject: (value) => {
            if (!value.trim()) return 'El asunto es obligatorio';
            if (value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres';
            return '';
        },
        message: (value) => {
            if (!value.trim()) return 'El mensaje es obligatorio';
            if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
            return '';
        }
    };

    // Validate input and show error if needed
    const validateInput = (input) => {
        const field = input.getAttribute('data-validation');
        const errorElement = document.getElementById(`${field}Error`);

        if (field && validations[field]) {
            const errorMessage = validations[field](input.value);
            errorElement.textContent = errorMessage;

            if (errorMessage) {
                input.classList.add('error');
                return false;
            } else {
                input.classList.remove('error');
                return true;
            }
        }
        return true;
    };

    // Add validation on input change
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;

                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitButton.disabled = true;

                // Simulate server response delay
                setTimeout(() => {
                    // Show success message
                    successMessage.classList.add('show');

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }

    // Close success message
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }

    // Click outside to close success message
    successMessage.addEventListener('click', function(e) {
        if (e.target === this) {
            successMessage.classList.remove('show');
        }
    });

    // Escape key to close success message
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successMessage.classList.contains('show')) {
            successMessage.classList.remove('show');
        }
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add reveal animations for elements as they scroll into view
    const revealElements = document.querySelectorAll('.contact-form-container, .contact-info-container, .faq-mini-section');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // Add .revealed class for CSS animations if not already defined
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .input-wrapper input.error,
            .input-wrapper textarea.error {
                border-color: #e74c3c;
            }
        </style>
    `);
});
/* --- faq.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#aa80ff",
        lineOpacity: 0.2,
        grabOpacity: 0.4
    });

    initAOS();

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');

                // Scroll element into view if it's not fully visible
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const isVisible = (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );

                    if (!isVisible) {
                        const offset = 100; // Adjust based on your header height
                        const top = item.offsetTop - offset;

                        window.scrollTo({
                            top,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const noResultsMessage = document.getElementById('noResults');

    if (searchInput) {
        searchInput.addEventListener('input', filterFaqs);

        // Add clear button functionality when search has content
        searchInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                if (!document.querySelector('.search-clear')) {
                    const clearButton = document.createElement('button');
                    clearButton.className = 'search-clear';
                    clearButton.innerHTML = '<i class="fas fa-times"></i>';
                    clearButton.addEventListener('click', function() {
                        searchInput.value = '';
                        searchInput.focus();
                        filterFaqs();
                    });

                    searchInput.parentNode.appendChild(clearButton);
                }
            } else {
                const clearButton = document.querySelector('.search-clear');
                if (clearButton) {
                    clearButton.remove();
                }
            }
        });
    }

    function filterFaqs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryButtons = document.querySelectorAll('.category-btn');
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');

        let hasVisibleItems = false;

        // Reset categories when searching
        if (searchTerm !== '' && activeCategory !== 'all') {
            categoryButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            // Handle category filtering
            const categoryMatch = activeCategory === 'all' || category === activeCategory;

            // Handle search term filtering
            const searchMatch = searchTerm === '' ||
                               question.includes(searchTerm) ||
                               answer.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                item.style.display = '';
                hasVisibleItems = true;

                // Highlight matching text if searching
                if (searchTerm !== '') {
                    highlightText(item, searchTerm);
                } else {
                    // Remove highlights if search is empty
                    removeHighlights(item);
                }
            } else {
                item.style.display = 'none';
                // Remove highlights from hidden items
                removeHighlights(item);
            }
        });

        // Show/hide no results message
        if (hasVisibleItems) {
            noResultsMessage.style.display = 'none';
            document.querySelectorAll('.faq-category-heading').forEach(heading => {
                const categoryId = heading.id;
                const hasVisibleInCategory = Array.from(document.querySelectorAll(`.faq-item[data-category="${categoryId}"]`))
                    .some(item => item.style.display !== 'none');

                heading.style.display = hasVisibleInCategory ? '' : 'none';
            });
        } else {
            noResultsMessage.style.display = 'block';
            document.querySelectorAll('.faq-category-heading').forEach(heading => {
                heading.style.display = 'none';
            });
        }
    }

    // Function to highlight matching text
    function highlightText(item, searchTerm) {
        // First remove any existing highlights
        removeHighlights(item);

        // Then add new highlights
        const questionText = item.querySelector('.faq-question h3');
        const answerParagraphs = item.querySelectorAll('.faq-answer p, .faq-answer li');

        questionText.innerHTML = applyHighlight(questionText.textContent, searchTerm);

        answerParagraphs.forEach(paragraph => {
            paragraph.innerHTML = applyHighlight(paragraph.textContent, searchTerm);
        });
    }

    // Apply highlight to text
    function applyHighlight(text, searchTerm) {
        if (!searchTerm) return text;

        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }

    // Remove highlights
    function removeHighlights(item) {
        const highlights = item.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            // Clean up any adjacent text nodes
            parent.normalize();
        });
    }

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter FAQs based on selected category
            const category = this.getAttribute('data-category');

            filterFaqs();

            // Clear search when changing categories
            searchInput.value = '';
            const clearButton = document.querySelector('.search-clear');
            if (clearButton) {
                clearButton.remove();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add styles for highlighted text
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(170, 128, 255, 0.2);
            padding: 0 2px;
            border-radius: 2px;
        }

        .search-clear {
            position: absolute;
            right: 3rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #aaa;
            cursor: pointer;
            padding: 5px;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }

        .search-clear:hover {
            color: #666;
        }
    `;
    document.head.appendChild(style);
});
/* --- noticias.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#76b2fe",
        lineOpacity: 0.2,
        grabOpacity: 0.4
    });

    initAOS();

    // Noticias filtering functionality
    const tagButtons = document.querySelectorAll('.tag-btn');
    const noticiaCards = document.querySelectorAll('.noticia-card');
    const searchInput = document.getElementById('noticiasSearch');
    const noResultsElement = document.getElementById('noResults');
    const noticiasGrid = document.getElementById('noticiasGrid');

    // Function to filter noticias based on tag
    function filterNoticias(tag) {
        let visibleCount = 0;

        noticiaCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags');

            if (tag === 'all' || cardTags.includes(tag)) {
                card.style.display = '';
                visibleCount++;

                // Remove and reapply AOS attributes to trigger animations
                const aosDelay = parseInt(card.getAttribute('data-aos-delay') || '0');
                card.setAttribute('data-aos-delay', aosDelay.toString());
                card.classList.remove('aos-animate');

                // Add class back after a short delay for animation
                setTimeout(() => {
                    card.classList.add('aos-animate');
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsElement.style.display = 'block';
            noticiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            noticiasGrid.style.display = 'grid';
        }
    }

    // Tag buttons click handler
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tagButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter noticias based on selected tag
            const tag = this.getAttribute('data-tag');
            filterNoticias(tag);

            // Clear search input
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            // Reset tag filter
            tagButtons.forEach(btn => {
                if (btn.getAttribute('data-tag') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            let visibleCount = 0;

            // Filter based on search term
            noticiaCards.forEach(card => {
                const cardTitle = card.querySelector('.noticia-titulo').textContent.toLowerCase();
                const cardContent = card.querySelector('.noticia-resumen').textContent.toLowerCase();
                const cardTag = card.querySelector('.noticia-tag').textContent.toLowerCase();

                if (cardTitle.includes(searchTerm) || cardContent.includes(searchTerm) || cardTag.includes(searchTerm)) {
                    card.style.display = '';
                    visibleCount++;

                    // Highlight matching text
                    highlightText(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsElement.style.display = 'block';
                noticiasGrid.style.display = 'none';
            } else {
                noResultsElement.style.display = 'none';
                noticiasGrid.style.display = 'grid';
            }
        });
    }

    // Function to highlight matching text
    function highlightText(card, searchTerm) {
        if (!searchTerm) return;

        // Remove existing highlights
        const highlights = card.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });

        // Add new highlights
        const titleEl = card.querySelector('.noticia-titulo');
        const contentEl = card.querySelector('.noticia-resumen');

        if (searchTerm && titleEl && contentEl) {
            [titleEl, contentEl].forEach(el => {
                const originalText = el.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                if (regex.test(originalText)) {
                    el.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
                }
            });
        }
    }

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    paginationButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Scroll to top of noticias section
                const noticiasSection = document.querySelector('.noticias-section');
                if (noticiasSection) {
                    window.scrollTo({
                        top: noticiasSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }

                // In a real implementation, this would load new content
                // Simulate loading for demonstration
                simulateLoading();
            });
        }
    });

    function simulateLoading() {
        const noticiasGrid = document.getElementById('noticiasGrid');
        if (noticiasGrid) {
            // Add loading state
            noticiasGrid.style.opacity = '0.5';
            noticiasGrid.style.pointerEvents = 'none';

            // Reset after simulated load
            setTimeout(() => {
                noticiasGrid.style.opacity = '1';
                noticiasGrid.style.pointerEvents = 'auto';
            }, 800);
        }
    }

    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');

            if (emailInput && emailInput.value.trim() !== '') {
                // Disable form elements
                emailInput.disabled = true;
                submitButton.disabled = true;

                // Change button text to show success
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado';

                // Reset after 2 seconds
                setTimeout(() => {
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    emailInput.value = '';

                    // Show success message (could be more elaborate)
                    alert('¡Gracias por suscribirte! Recibirás nuestras novedades en tu correo.');
                }, 2000);
            }
        });
    });

    // NEW: Subscription form functionality
    const suscripcionForm = document.querySelector('.suscripcion-form');
    if (suscripcionForm) {
        suscripcionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const messageEl = this.querySelector('.suscripcion-message');

            if (emailInput && emailInput.value.trim() !== '') {
                const email = emailInput.value.trim();

                // Basic email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    messageEl.textContent = 'Por favor, ingresa un correo electrónico válido.';
                    messageEl.className = 'suscripcion-message error';
                    return;
                }

                // Disable form elements during "submission"
                emailInput.disabled = true;
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                // Simulate API call/subscription process
                setTimeout(() => {
                    // Show success and reset form
                    messageEl.textContent = '¡Gracias por suscribirte! Te hemos enviado un correo de confirmación.';
                    messageEl.className = 'suscripcion-message success';

                    submitButton.innerHTML = '<i class="fas fa-check"></i> Suscrito';

                    // Re-enable after delay
                    setTimeout(() => {
                        emailInput.disabled = false;
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                        emailInput.value = '';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // RSS link behavior
    const rssLink = document.querySelector('.rss-link');
    if (rssLink) {
        rssLink.addEventListener('click', function(e) {
            // Optional: Add analytics tracking for RSS subscription
            if (typeof gtag !== 'undefined') {
                gtag('event', 'rss_subscription', {
                    'event_category': 'engagement',
                    'event_label': 'RSS Feed'
                });
            }

            // Optional: Show a popup with instructions for using RSS
            // Uncomment if you want to show a modal instead of direct navigation
            /*
            e.preventDefault();
            const instructions = `
                <div>
                    <h3>Cómo usar nuestro RSS</h3>
                    <p>1. Copia esta URL: ${window.location.origin}/noticias.xml</p>
                    <p>2. Pégala en tu lector de RSS favorito</p>
                    <p>3. ¡Listo! Ya recibirás nuestras actualizaciones automáticamente</p>
                </div>
            `;
            // Show your modal with these instructions
            showModal(instructions);
            */
        });
    }

    // Add styles for highlight effect
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(74, 116, 255, 0.2);
            padding: 0 2px;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
});
/* --- materiales.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 80,
        color: "#ffffff",
        opacity: 0.2,
        randomOpacity: true,
        lineColor: "#ffffff",
        lineOpacity: 0.2,
        grabOpacity: 0.5
    });

    initAOS({
        mirror: false
    });

    // Initialize Swiper slider for featured materials
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // Category filter
    const categoriaCards = document.querySelectorAll('.categoria-card');
    categoriaCards.forEach(card => {
        card.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filterTabs = document.querySelectorAll('.filter-tab');

            // Activate corresponding filter tab
            filterTabs.forEach(tab => {
                if (tab.getAttribute('data-filter') === filter) {
                    tab.click();

                    // Scroll to materials section
                    document.querySelector('.materiales-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

    // Materials filter
    const filterTabs = document.querySelectorAll('.filter-tab');
    const materialCards = document.querySelectorAll('.material-card');
    const noResultsMessage = document.getElementById('noResults');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;

            // Filter cards
            materialCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                    visibleCount++;

                    // Reset animation
                    card.classList.remove('aos-animate');
                    setTimeout(() => {
                        card.classList.add('aos-animate');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    });

    // Materials search
    const searchInput = document.getElementById('materialesSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            // Reset filters when searching
            if (searchTerm !== '') {
                filterTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-filter') === 'all') {
                        tab.classList.add('active');
                    }
                });
            }

            // Filter materials by search term
            materialCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const description = card.querySelector('p').innerText.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.innerText.toLowerCase());

                if (searchTerm === '' ||
                    title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    tags.some(tag => tag.includes(searchTerm))) {
                    card.style.display = '';
                    visibleCount++;

                    // Highlight matching text
                    highlightMatches(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    }

    // Highlight search matches
    function highlightMatches(card, searchTerm) {
        if (!searchTerm) return;

        // Remove existing highlights
        const highlighted = card.querySelectorAll('.highlight');
        highlighted.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        if (searchTerm.length < 2) return;

        // Add highlights
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const tags = card.querySelectorAll('.tag');

        [title, description, ...tags].forEach(element => {
            if (!element) return;

            const text = element.innerText;
            if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                element.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
            }
        });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';

            // Simulate loading delay
            setTimeout(() => {
                // Here you would normally fetch more materials from a database
                // For this demo, we'll just display a message
                this.innerHTML = 'No hay más materiales para cargar';
                this.disabled = true;
                this.style.opacity = '0.7';
                this.style.cursor = 'not-allowed';
            }, 1500);
        });
    }

    // Suggest Material Modal
    const sugerirBtn = document.getElementById('sugerirBtn');
    const sugerirModal = document.getElementById('sugerirModal');
    const closeModal = document.querySelector('.close-modal');
    const sugerirForm = document.getElementById('sugerirForm');

    if (sugerirBtn && sugerirModal) {
        sugerirBtn.addEventListener('click', function() {
            sugerirModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        // Close modal when clicking X
        closeModal.addEventListener('click', function() {
            sugerirModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === sugerirModal) {
                sugerirModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Form submission
        sugerirForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = this.querySelector('.sugerir-submit');
            const originalText = submitBtn.innerText;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                this.innerHTML = `
                    <div style="text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 1rem;"></i>
                        <h3>¡Gracias por tu sugerencia!</h3>
                        <p>Hemos recibido tu solicitud y la evaluaremos a la brevedad.</p>
                        <button type="button" class="sugerir-submit" id="closeSuccessBtn">Cerrar</button>
                    </div>
                `;

                // Add event listener to close button
                document.getElementById('closeSuccessBtn').addEventListener('click', function() {
                    sugerirModal.style.display = 'none';
                    document.body.style.overflow = '';

                    // Reset form after closing
                    setTimeout(() => {
                        sugerirForm.innerHTML = `
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" id="nombre" placeholder="Tu nombre" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="Tu correo electrónico" required>
                            </div>
                            <div class="form-group">
                                <label for="tipoMaterial">Tipo de material</label>
                                <select id="tipoMaterial" required>
                                    <option value="">Selecciona un tipo</option>
                                    <option value="pdf">PDF/Documento</option>
                                    <option value="video">Video</option>
                                    <option value="codigo">Código/Scripts</option>
                                    <option value="ejercicios">Ejercicios</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripción</label>
                                <textarea id="descripcion" rows="5" placeholder="Describe el material que te gustaría encontrar" required></textarea>
                            </div>
                            <button type="submit" class="sugerir-submit">Enviar Sugerencia</button>
                        `;
                    }, 500);
                });
            }, 2000);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleText = document.querySelector('.theme-toggle-text');

    if (themeToggle) {
        // Check for saved theme preference or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.classList.add('dark');
            themeToggleText.textContent = 'Modo Claro';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('dark');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleText.textContent = 'Modo Claro';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleText.textContent = 'Modo Oscuro';
            }
        });
    }

    // Add CSS for highlighting search matches
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(52, 148, 230, 0.2);
            border-radius: 2px;
            padding: 0 2px;
        }
    `;
    document.head.appendChild(style);
});
/* --- privacy.js --- */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();

  // Table of Contents functionality
  const tocLinks = document.querySelectorAll('#privacyToc a');
  const sections = document.querySelectorAll('.privacy-section');

  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section tracking
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 150) {
        current = '#' + section.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });

  // Cookie management
  const cookieButtons = {
    accept: document.getElementById('acceptCookies'),
    reject: document.getElementById('rejectCookies'),
    configure: document.getElementById('configureCookies')
  };

  if (cookieButtons.accept && cookieButtons.reject && cookieButtons.configure) {
    cookieButtons.accept.addEventListener('click', () => {
      setCookiePreferences('all');
      showCookieNotification('success', 'Has aceptado todas las cookies');
    });

    cookieButtons.reject.addEventListener('click', () => {
      setCookiePreferences('essential');
      showCookieNotification('info', 'Solo se usarán cookies esenciales');
    });

    cookieButtons.configure.addEventListener('click', () => {
      showCookieConfiguration();
    });
  }

  function setCookiePreferences(type) {
    // Store cookie preferences
    localStorage.setItem('cookiePreferences', type);

    // Implement actual cookie management here
    if (type === 'all') {
      // Enable all cookies
      console.log('Todas las cookies habilitadas');
    } else {
      // Disable non-essential cookies
      console.log('Solo cookies esenciales habilitadas');
    }
  }

  function showCookieNotification(icon, text) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: icon,
        title: 'Preferencias de Cookies',
        text: text,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    } else {
      // Fallback if SweetAlert is not available
      alert(text);
    }
  }

  function showCookieConfiguration() {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Configuración de Cookies',
        html: `
          <div class="cookie-config">
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="essentialCookies" checked disabled>
                <span>Cookies Esenciales</span>
              </label>
              <p>Necesarias para el funcionamiento del sitio</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="preferenceCookies">
                <span>Cookies de Preferencias</span>
              </label>
              <p>Guardan tus preferencias de navegación</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="analyticsCookies">
                <span>Cookies Analíticas</span>
              </label>
              <p>Nos ayudan a mejorar el sitio</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="marketingCookies">
                <span>Cookies de Marketing</span>
              </label>
              <p>Utilizadas para mostrarte anuncios relevantes</p>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Preferencias',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'cookie-config-popup'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const preferences = {
            essential: true, // Always enabled
            preference: document.getElementById('preferenceCookies').checked,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked
          };

          // Store preferences
          localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

          showCookieNotification('success', 'Preferencias guardadas correctamente');
        }
      });
    } else {
      // Fallback if SweetAlert is not available
      alert('La configuración de cookies no está disponible en este momento.');
    }
  }

  // Check if first visit or if cookie preferences are not set
  if (!localStorage.getItem('cookiePreferences')) {
    // Wait a moment before showing the cookie notice
    setTimeout(() => {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: '🍪 Uso de Cookies',
          text: 'Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas todas las cookies?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Aceptar Todas',
          cancelButtonText: 'Configurar',
          showDenyButton: true,
          denyButtonText: 'Solo Esenciales'
        }).then((result) => {
          if (result.isConfirmed) {
            setCookiePreferences('all');
            showCookieNotification('success', 'Has aceptado todas las cookies');
          } else if (result.isDenied) {
            setCookiePreferences('essential');
            showCookieNotification('info', 'Solo se usarán cookies esenciales');
          } else {
            showCookieConfiguration();
          }
        });
      }
    }, 1500);
  }
});
/* --- terminos.js --- */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();

  // Table of Contents functionality
  const tocLinks = document.querySelectorAll('#termsToc a');
  const sections = document.querySelectorAll('.terms-section');

  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section tracking
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 150) {
        current = '#' + section.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('termsSearch');
  const searchResults = document.getElementById('searchResults');
  const contentSections = document.querySelectorAll('.terms-section');

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', debounce(function() {
      const searchTerm = searchInput.value.trim().toLowerCase();

      if (searchTerm.length < 3) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';

        // Remove any existing highlights
        removeHighlights();
        return;
      }

      // Search in content
      let results = [];
      let resultHTML = '';

      contentSections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.querySelector('h2').textContent;
        const sectionText = section.textContent.toLowerCase();

        if (sectionText.includes(searchTerm)) {
          results.push({
            id: sectionId,
            title: sectionTitle,
            text: getContextSnippet(section.innerHTML, searchTerm)
          });
        }
      });

      // Display results
      if (results.length > 0) {
        resultHTML = `<h3>Resultados de búsqueda (${results.length})</h3><ul>`;

        results.forEach(result => {
          resultHTML += `
            <li>
              <a href="#${result.id}" class="search-result-link">
                <strong>${result.title}</strong>
              </a>
              <p>${result.text}</p>
            </li>
          `;
        });

        resultHTML += '</ul>';
        searchResults.innerHTML = resultHTML;
        searchResults.classList.add('active');

        // Add click event to search result links
        const searchResultLinks = document.querySelectorAll('.search-result-link');
        searchResultLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
              // Highlight the search term in the target section
              highlightSearchTerm(targetSection, searchTerm);

              // Scroll to the section
              window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
              });

              // Close search results
              searchResults.classList.remove('active');
            }
          });
        });
      } else {
        searchResults.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        searchResults.classList.add('active');

        // Remove any existing highlights
        removeHighlights();
      }
    }, 300));

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }

  // Accept Terms Button
  const acceptTermsBtn = document.getElementById('acceptTermsBtn');

  if (acceptTermsBtn) {
    // Check if terms were already accepted
    const termsAccepted = localStorage.getItem('termsAccepted');

    if (termsAccepted === 'true') {
      acceptTermsBtn.classList.add('accepted');
      acceptTermsBtn.textContent = 'Términos Aceptados';
    }

    acceptTermsBtn.addEventListener('click', () => {
      // Store acceptance in localStorage
      localStorage.setItem('termsAccepted', 'true');
      localStorage.setItem('termsAcceptedDate', new Date().toISOString());

      // Update button appearance
      acceptTermsBtn.classList.add('accepted');
      acceptTermsBtn.textContent = 'Términos Aceptados';

      // Show confirmation
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: '¡Gracias!',
          text: 'Has aceptado los términos y condiciones.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } else {
        alert('Has aceptado los términos y condiciones.');
      }
    });
  }

  // Helper functions for search
  function debounce(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  function getContextSnippet(html, searchTerm) {
    // Convert HTML to text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent;

    // Find the position of the search term
    const position = text.toLowerCase().indexOf(searchTerm.toLowerCase());

    if (position === -1) return '';

    // Get a snippet of text around the search term
    const start = Math.max(0, position - 50);
    const end = Math.min(text.length, position + searchTerm.length + 50);
    let snippet = text.substring(start, end);

    // Add ellipsis if needed
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet += '...';

    // Highlight the search term
    const regex = new RegExp(searchTerm, 'gi');
    snippet = snippet.replace(regex, match => `<span class="highlight">${match}</span>`);

    return snippet;
  }

  function highlightSearchTerm(section, searchTerm) {
    // Remove any existing highlights first
    removeHighlights();

    // Create a text node walker to find text nodes
    const walker = document.createTreeWalker(
      section,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const regex = new RegExp(searchTerm, 'gi');
    const nodesToReplace = [];

    // Find all text nodes that contain the search term
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())) {
        nodesToReplace.push(node);
      }
    }

    // Replace text in the found nodes
    nodesToReplace.forEach(node => {
      const parent = node.parentNode;
      const content = node.nodeValue;
      const fragment = document.createDocumentFragment();

      let lastIndex = 0;
      let match;

      // Create a new regex for each node to reset the lastIndex
      const nodeRegex = new RegExp(searchTerm, 'gi');

      while ((match = nodeRegex.exec(content)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(content.substring(lastIndex, match.index)));
        }

        // Add the highlighted match
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = match[0];
        fragment.appendChild(span);

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text
      if (lastIndex < content.length) {
        fragment.appendChild(document.createTextNode(content.substring(lastIndex)));
      }

      // Replace the original node with the fragment
      parent.replaceChild(fragment, node);
    });
  }

  function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');

    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      const textNode = document.createTextNode(highlight.textContent);
      parent.replaceChild(textNode, highlight);

      // Normalize to combine adjacent text nodes
      parent.normalize();
    });
  }
});

/* --- html5detalle.js --- */
document.addEventListener('DOMContentLoaded', function() {
    // --- Table of Contents Functionality ---

    // Track active section during scroll
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc-list a');

    // Initialize highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // Make TOC sticky on scroll
    const tocSection = document.querySelector('.toc-section');
    const courseHero = document.querySelector('.curso-hero');

    if (tocSection && courseHero) {
        window.addEventListener('scroll', function() {
            const heroBottom = courseHero.offsetTop + courseHero.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= heroBottom) {
                tocSection.classList.add('sticky');
            } else {
                tocSection.classList.remove('sticky');
            }

            // Highlight active TOC item based on scroll position
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset for fixed header
                const tocHeight = tocSection.offsetHeight || 0;
                const scrollPosition = targetSection.offsetTop - tocHeight - 20;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });

    // --- Code Block Functionality ---

    // Copy code button functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create a temporary textarea to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = codeElement.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                // Change the button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado';

                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // Edit code button functionality - shows a modal with editable code
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create modal elements
                const modalOverlay = document.createElement('div');
                modalOverlay.classList.add('code-edit-modal');

                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');

                const closeButton = document.createElement('button');
                closeButton.classList.add('close-modal');
                closeButton.innerHTML = '&times;';

                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');
                modalHeader.innerHTML = '<h3>Editor de código</h3>';

                const textarea = document.createElement('textarea');
                textarea.classList.add('code-editor');
                textarea.value = codeElement.textContent;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('modal-buttons');

                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Guardar cambios';

                const cancelButton = document.createElement('button');
                cancelButton.classList.add('cancel-button');
                cancelButton.textContent = 'Cancelar';

                const runButton = document.createElement('button');
                runButton.classList.add('run-button');
                runButton.innerHTML = '<i class="fas fa-play"></i> Ejecutar';

                // Assemble the modal
                buttonContainer.appendChild(saveButton);
                buttonContainer.appendChild(runButton);
                buttonContainer.appendChild(cancelButton);

                modalContent.appendChild(closeButton);
                modalContent.appendChild(modalHeader);
                modalContent.appendChild(textarea);
                modalContent.appendChild(buttonContainer);

                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);

                // Show the modal
                setTimeout(() => {
                    modalOverlay.classList.add('show');
                    textarea.focus();
                }, 10);

                // Close modal function
                const closeModal = () => {
                    modalOverlay.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modalOverlay);
                    }, 300);
                };

                // Event listeners for the modal
                closeButton.addEventListener('click', closeModal);
                cancelButton.addEventListener('click', closeModal);

                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });

                // Save code changes
                saveButton.addEventListener('click', function() {
                    // Update the code
                    codeElement.textContent = textarea.value;

                    // Rehighlight the code
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(codeElement);
                    }

                    closeModal();
                });

                // Run code button - create a preview iframe
                runButton.addEventListener('click', function() {
                    const previewContainer = document.createElement('div');
                    previewContainer.classList.add('preview-container');
                    previewContainer.style.marginTop = '1rem';
                    previewContainer.style.border = '1px solid #ddd';
                    previewContainer.style.borderRadius = '4px';

                    const previewHeader = document.createElement('div');
                    previewHeader.style.padding = '0.5rem';
                    previewHeader.style.backgroundColor = '#f5f5f5';
                    previewHeader.innerHTML = '<strong>Vista previa:</strong>';

                    const iframe = document.createElement('iframe');
                    iframe.style.width = '100%';
                    iframe.style.height = '200px';
                    iframe.style.border = '1px solid #ddd';
                    iframe.style.backgroundColor = 'white';

                    previewContainer.appendChild(previewHeader);
                    previewContainer.appendChild(iframe);

                    // Check if preview already exists, remove if so
                    const existingPreview = modalContent.querySelector('.preview-container');
                    if (existingPreview) {
                        existingPreview.remove();
                    }

                    // Add preview before buttons
                    modalContent.insertBefore(previewContainer, buttonContainer);

                    // Write code to iframe
                    setTimeout(() => {
                        const doc = iframe.contentDocument || iframe.contentWindow.document;
                        doc.open();
                        doc.write(textarea.value);
                        doc.close();
                    }, 100);
                });
            }
        });
    });

    // --- Interactive Form Validation Demo ---

    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.hasAttribute('pattern') && input.value.trim()) {
                    const pattern = new RegExp(input.getAttribute('pattern'));
                    if (!pattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Simulate success
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Formulario válido';
                submitBtn.style.backgroundColor = '#4CAF50';

                // Add success message
                const successMessage = document.createElement('div');
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '1rem';
                successMessage.style.fontWeight = '500';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> El formulario ha sido validado correctamente';

                // Remove existing message if any
                const existingMessage = demoForm.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }

                successMessage.classList.add('form-message');
                demoForm.appendChild(successMessage);

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    this.reset();

                    // Fade out message
                    successMessage.style.transition = 'opacity 0.5s ease';
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 2000);
            } else {
                // Show error message
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error de validación';
                submitBtn.style.backgroundColor = '#e74c3c';

                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.marginTop = '1rem';
                errorMessage.style.fontWeight = '500';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor completa correctamente todos los campos requeridos';

                // Remove existing message if any
                const existingMessage = demoForm.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }

                errorMessage.classList.add('form-message');
                demoForm.appendChild(errorMessage);

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';

                    // Fade out message
                    errorMessage.style.transition = 'opacity 0.5s ease';
                    errorMessage.style.opacity = '0';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 500);
                }, 2000);
            }
        });

        // Add input event listeners for real-time validation feedback
        const formInputs = demoForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove invalid class when user starts typing
                this.classList.remove('invalid');
            });
        });
    }

    // Helper function for email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // --- Volver Button Functionality ---

    const volverBtn = document.getElementById('volverBtn');
    if (volverBtn) {
        volverBtn.addEventListener('click', function() {
            window.location.href = 'materias.html';
        });
    }

    // --- Interactive Demonstrations ---

    // Make code snippets examples interactive
    document.querySelectorAll('.live-preview').forEach(preview => {
        const previewContent = preview.querySelector('.preview-container');

        // Find the closest code block
        const codeBlock = preview.previousElementSibling;
        if (codeBlock && codeBlock.classList.contains('code-container')) {
            const codeElement = codeBlock.querySelector('code');
            if (codeElement) {
                // Create a "Try it out" button
                const tryButton = document.createElement('button');
                tryButton.classList.add('try-button');
                tryButton.innerHTML = '<i class="fas fa-play"></i> Interactuar';
                tryButton.style.marginTop = '1rem';
                tryButton.style.padding = '0.5rem 1rem';
                tryButton.style.backgroundColor = '#4CAF50';
                tryButton.style.color = 'white';
                tryButton.style.border = 'none';
                tryButton.style.borderRadius = '4px';
                tryButton.style.cursor = 'pointer';

                previewContent.appendChild(tryButton);

                tryButton.addEventListener('click', function() {
                    // Create modal for interactive demo
                    const modalOverlay = document.createElement('div');
                    modalOverlay.classList.add('code-edit-modal');
                    modalOverlay.style.display = 'flex';
                    modalOverlay.style.justifyContent = 'center';
                    modalOverlay.style.alignItems = 'center';
                    modalOverlay.style.position = 'fixed';
                    modalOverlay.style.top = '0';
                    modalOverlay.style.left = '0';
                    modalOverlay.style.width = '100%';
                    modalOverlay.style.height = '100%';
                    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    modalOverlay.style.zIndex = '1000';

                    const modalContent = document.createElement('div');
                    modalContent.classList.add('modal-content');
                    modalContent.style.backgroundColor = 'white';
                    modalContent.style.width = '80%';
                    modalContent.style.maxWidth = '800px';
                    modalContent.style.borderRadius = '8px';
                    modalContent.style.padding = '2rem';
                    modalContent.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    modalContent.style.position = 'relative';

                    const closeButton = document.createElement('button');
                    closeButton.classList.add('close-modal');
                    closeButton.innerHTML = '&times;';
                    closeButton.style.position = 'absolute';
                    closeButton.style.right = '1rem';
                    closeButton.style.top = '1rem';
                    closeButton.style.backgroundColor = 'transparent';
                    closeButton.style.border = 'none';
                    closeButton.style.fontSize = '1.5rem';
                    closeButton.style.cursor = 'pointer';

                    const demoTitle = document.createElement('h3');
                    demoTitle.textContent = 'Demo Interactivo';
                    demoTitle.style.marginBottom = '1.5rem';

                    const splitContainer = document.createElement('div');
                    splitContainer.style.display = 'flex';
                    splitContainer.style.gap = '1.5rem';
                    splitContainer.style.marginBottom = '1.5rem';
                    splitContainer.style.flexDirection = 'column';

                    const codeEditor = document.createElement('div');
                    codeEditor.style.flex = '1';

                    const editorLabel = document.createElement('h4');
                    editorLabel.textContent = 'Código:';
                    editorLabel.style.marginBottom = '0.5rem';

                    const textarea = document.createElement('textarea');
                    textarea.value = codeElement.textContent;
                    textarea.style.width = '100%';
                    textarea.style.minHeight = '200px';
                    textarea.style.padding = '1rem';
                    textarea.style.fontFamily = 'monospace';
                    textarea.style.fontSize = '0.9rem';
                    textarea.style.border = '1px solid #ddd';
                    textarea.style.borderRadius = '4px';

                    const previewSection = document.createElement('div');
                    previewSection.style.flex = '1';

                    const previewLabel = document.createElement('h4');
                    previewLabel.textContent = 'Resultado:';
                    previewLabel.style.marginBottom = '0.5rem';

                    const previewFrame = document.createElement('iframe');
                    previewFrame.style.width = '100%';
                    previewFrame.style.height = '200px';
                    previewFrame.style.border = '1px solid #ddd';
                    previewFrame.style.borderRadius = '4px';

                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Actualizar Vista Previa';
                    updateButton.style.padding = '0.75rem 1.5rem';
                    updateButton.style.backgroundColor = '#4CAF50';
                    updateButton.style.color = 'white';
                    updateButton.style.border = 'none';
                    updateButton.style.borderRadius = '4px';
                    updateButton.style.cursor = 'pointer';

                    // Assemble the interactive demo
                    codeEditor.appendChild(editorLabel);
                    codeEditor.appendChild(textarea);

                    previewSection.appendChild(previewLabel);
                    previewSection.appendChild(previewFrame);

                    splitContainer.appendChild(codeEditor);
                    splitContainer.appendChild(updateButton);
                    splitContainer.appendChild(previewSection);

                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(demoTitle);
                    modalContent.appendChild(splitContainer);

                    modalOverlay.appendChild(modalContent);
                    document.body.appendChild(modalOverlay);

                    // Function to update the preview
                    const updatePreview = () => {
                        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                        doc.open();
                        doc.write(textarea.value);
                        doc.close();
                    };

                    // Initial preview
                    setTimeout(updatePreview, 100);

                    // Update when button is clicked
                    updateButton.addEventListener('click', updatePreview);

                    // Close modal event
                    closeButton.addEventListener('click', function() {
                        document.body.removeChild(modalOverlay);
                    });

                    // Click outside to close
                    modalOverlay.addEventListener('click', function(e) {
                        if (e.target === modalOverlay) {
                            document.body.removeChild(modalOverlay);
                        }
                    });
                });
            }
        }
    });

    // Add CSS styles for interactive elements
    const interactiveStyles = document.createElement('style');
    interactiveStyles.textContent = `
        .code-edit-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .code-edit-modal.show {
            display: flex;
            opacity: 1;
        }

        .modal-content {
            background: white;
            border-radius: 8px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            padding: 2rem;
            position: relative;
            overflow: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }

        .code-edit-modal.show .modal-content {
            transform: translateY(0);
        }

        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #555;
        }

        .modal-header {
            margin-bottom: 1.5rem;
        }

        .modal-header h3 {
            margin: 0;
            color: #333;
        }

        .code-editor {
            width: 100%;
            height: 300px;
            margin-bottom: 1.5rem;
            padding: 1rem;
            font-family: monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            border: 1px solid #ddd;
            border-radius: 4px;
            resize: vertical;
        }

        .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .save-button, .cancel-button, .run-button {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .save-button {
            background-color: #4CAF50;
            color: white;
        }

        .save-button:hover {
            background-color: #43a047;
        }

        .run-button {
            background-color: #2196F3;
            color: white;
        }

        .run-button:hover {
            background-color: #1e88e5;
        }

        .cancel-button {
            background-color: #f1f1f1;
            color: #333;
        }

        .cancel-button:hover {
            background-color: #e1e1e1;
        }

        .try-button {
            transition: all 0.3s ease;
        }

        .try-button:hover {
            background-color: #43a047 !important;
            transform: translateY(-2px);
            box-shadow: 0 5px 10px rgba(76, 175, 80, 0.2);
        }

        input.invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
        }

        @media (min-width: 768px) {
            .splitContainer {
                flex-direction: row !important;
            }
        }
    `;
    document.head.appendChild(interactiveStyles);

    // Initialize any AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
});
/* --- materiales2.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#4facfe",
        lineOpacity: 0.2
    });

    initAOS();

    // Materias filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');
    const searchInput = document.getElementById('searchMaterias');
    const noResultsElement = document.getElementById('noResults');
    const materiasGrid = document.getElementById('materiasGrid');

    // Enhanced filtering function with animations
    function filterMaterias(category) {
        let visibleCount = 0;

        materiaCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;

            if (shouldShow) {
                card.style.display = '';
                visibleCount++;

                // Reset and reapply animation with staggered delay
                card.setAttribute('data-aos-delay', (index % 3) * 100);
                card.classList.remove('aos-animate');
                setTimeout(() => card.classList.add('aos-animate'), 10);
            } else {
                card.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount);
    }

    // Enhanced search functionality
    function searchMaterias(searchTerm) {
        let visibleCount = 0;

        materiaCards.forEach((card, index) => {
            const cardText = card.textContent.toLowerCase();
            const shouldShow = cardText.includes(searchTerm.toLowerCase());

            if (shouldShow) {
                card.style.display = '';
                visibleCount++;

                // Reset and reapply animation with staggered delay
                card.setAttribute('data-aos-delay', (index % 3) * 100);
                card.classList.remove('aos-animate');
                setTimeout(() => card.classList.add('aos-animate'), 10);
            } else {
                card.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount);
    }

    // Helper function to toggle no results message
    function toggleNoResultsMessage(visibleCount) {
        if (visibleCount === 0) {
            noResultsElement.style.display = 'block';
            materiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            materiasGrid.style.display = 'grid';
        }
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterMaterias(this.getAttribute('data-filter'));
            if (searchInput) searchInput.value = '';
        });
    });

    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchMaterias(this.value.trim());
                filterButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
                });
            }, 300);
        });
    }

    // Card hover effects
    materiaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            if (icon) icon.style.transform = 'scale(1.2)';
            if (btn) btn.style.boxShadow = '0 8px 20px rgba(79, 172, 254, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            if (icon) icon.style.transform = '';
            if (btn) btn.style.boxShadow = '';
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
