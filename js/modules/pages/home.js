
// Section: /\* --- hero.js --- \*/
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
        // Using drifts array to store the accumulated translation
        let drifts = [];

        codeSnippets.forEach(() => {
            drifts.push({
                x: 0,
                y: 0
            });
        });

        // This is just for small additional movement, the main animation is in CSS
        const moveSnippets = () => {
            codeSnippets.forEach((snippet, index) => {
                if (!snippet || drifts.length <= index) return;

                // Subtle random movement using translate for better performance
                // Replacing layout-triggering left/top properties with composite-only translate
                // 0.25% of ~1000px is roughly 2.5px
                const deltaX = (Math.random() * 3 - 1.5);
                const deltaY = (Math.random() * 3 - 1.5);

                drifts[index].x += deltaX;
                drifts[index].y += deltaY;

                snippet.style.translate = `${drifts[index].x}px ${drifts[index].y}px`;
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

// Section: /\* --- banner.js \(Fixed\) --- \*/
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
