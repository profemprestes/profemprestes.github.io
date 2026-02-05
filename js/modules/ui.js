// Main UI Module
// Handles animations, navigation, and interactive elements

document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) { // Only if not just "#"
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- Feature Card Animations ---
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // --- Reveal Animations (Scroll) ---
    const revealElements = document.querySelectorAll('.features-section h2, .feature-card');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // --- Portales Section Animations ---
    const portalCards = document.querySelectorAll('.portal-card');
    if ('IntersectionObserver' in window && portalCards.length > 0) {
        const portalCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    portalCardObserver.unobserve(entry.target);

                    // Animate stats
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(statValue => {
                        const finalValue = statValue.textContent;
                        if (finalValue.includes('k+')) {
                            animateValue(statValue, 0, parseInt(finalValue), 1500, 'k+');
                        } else if (!finalValue.includes('/')) {
                            animateValue(statValue, 0, parseInt(finalValue), 1500, '+');
                        }
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

        portalCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            portalCardObserver.observe(card);
        });
    }

    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) window.requestAnimationFrame(step);
            else element.textContent = end + suffix;
        };
        window.requestAnimationFrame(step);
    }

    // --- Feature Hover Effects ---
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });

    // --- Navigation Logic ---
    const navContainer = document.querySelector('.nav-container');
    const navToggle = document.getElementById('nav-toggle');
    const navMenuContainer = document.getElementById('nav-menu-container') || document.querySelector('.nav-menu-container');

    // Create overlay if not exists
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    function openMenu() {
        if (navMenuContainer) navMenuContainer.classList.add('show');
        if (navOverlay) navOverlay.classList.add('show');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        }
    }

    function closeMenu() {
        if (navMenuContainer) navMenuContainer.classList.remove('show');
        if (navOverlay) navOverlay.classList.remove('show');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    }

    if (navToggle && navMenuContainer) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenuContainer.classList.contains('show')) closeMenu();
            else openMenu();
        });

        navOverlay.addEventListener('click', closeMenu);

        // Close on link click
        const navLinks = navMenuContainer.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenuContainer.classList.contains('show')) closeMenu();
        });
    }

    // Scroll effect for nav
    function handleScroll() {
        if (navContainer) {
            if (window.scrollY > 50) navContainer.classList.add('scrolled');
            else navContainer.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Footer Animations ---
    const footerElements = document.querySelectorAll('.footer-column, .footer-bottom');
    if ('IntersectionObserver' in window && footerElements.length > 0) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        footerElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            footerObserver.observe(element);
        });
    }

    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('.newsletter-input'); // scoped
        const newsletterButton = newsletterForm.querySelector('.newsletter-button'); // scoped

        if (newsletterInput && newsletterButton) {
            newsletterInput.addEventListener('focus', () => newsletterForm.classList.add('focused'));
            newsletterInput.addEventListener('blur', () => newsletterForm.classList.remove('focused'));

            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (newsletterInput.value.trim() !== '') {
                    const originalText = newsletterButton.innerHTML;
                    newsletterButton.innerHTML = '<i class="fas fa-check"></i>';

                    setTimeout(() => {
                        newsletterInput.value = '';
                        newsletterButton.innerHTML = originalText; // Restore original text/icon

                        const success = document.createElement('div');
                        success.className = 'newsletter-success';
                        success.textContent = '¡Gracias por suscribirte!';
                        newsletterForm.parentNode.appendChild(success);

                        setTimeout(() => {
                            success.style.opacity = '0';
                            setTimeout(() => success.remove(), 300);
                        }, 3000);
                    }, 1000);
                }
            });
        }
    }

    // --- Decorative Elements Animation (Rocket/Laptop) ---
    const bouncingRocket = document.querySelector('.bouncing-rocket');
    const spinningLaptop = document.querySelector('.spinning-laptop');

    if (bouncingRocket && spinningLaptop) {
        let rocket = { x: 10, y: 30, dx: Math.random() > 0.5 ? 1 : -1, dy: Math.random() > 0.5 ? 1 : -1 };
        let laptop = { x: 15, y: 15, dx: Math.random() > 0.5 ? 1 : -1, dy: Math.random() > 0.5 ? 1 : -1 };

        setInterval(() => {
            // Update & Bounce Rocket
            rocket.x += 0.3 * rocket.dx;
            rocket.y += 0.2 * rocket.dy;
            if (rocket.x <= 5 || rocket.x >= 20) rocket.dx *= -1;
            if (rocket.y <= 10 || rocket.y >= 40) rocket.dy *= -1;
            bouncingRocket.style.left = `${rocket.x}%`;
            bouncingRocket.style.top = `${rocket.y}%`;

            // Update & Bounce Laptop
            laptop.x += 0.2 * laptop.dx;
            laptop.y += 0.2 * laptop.dy;
            if (laptop.x <= 5 || laptop.x >= 25) laptop.dx *= -1;
            if (laptop.y <= 5 || laptop.y >= 25) laptop.dy *= -1;
            spinningLaptop.style.right = `${laptop.x}%`;
            spinningLaptop.style.bottom = `${laptop.y}%`;
        }, 100);
    }
});
