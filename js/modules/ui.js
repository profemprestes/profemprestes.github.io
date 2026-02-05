
// Section: /\* --- general.js --- \*/
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

// Section: /\* --- navfooter.js --- \*/
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
