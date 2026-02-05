// Main UI Module
// Handles animations and interactive elements
// Navigation and Newsletter logic have been moved to their own modules.

document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) { // Only if not just "#"
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Stats Animation (Counter) ---
    // (Used in Portales section logic mostly, but generic helper here if needed,
    // though Portales logic is below and has its own animateValue)

    // --- Card Hover Effects (Generic) ---
    const cards = document.querySelectorAll('.card, .info-card, .stat-card');
    if (cards.length > 0) {
        cards.forEach((card, index) => {
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
