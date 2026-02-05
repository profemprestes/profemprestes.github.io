document.addEventListener('DOMContentLoaded', function() {
    // --- Hero Section Logic ---

    // Smooth scroll for hero buttons
    const heroCta = document.getElementById('hero-cta-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const smoothScrollTo = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    if (heroCta) heroCta.addEventListener('click', smoothScrollTo);
    if (scrollIndicator) scrollIndicator.addEventListener('click', smoothScrollTo);

    // Initialize Particles.js
    if (typeof initParticles === 'function') {
        initParticles('particles-js', {
            number: 80,
            color: "#ffffff",
            opacity: 0.5,
            randomOpacity: false,
            lineColor: "#4facfe",
            lineOpacity: 0.4,
            grabOpacity: 1
        });
    } else if (window.particlesJS) {
         // Fallback if initParticles wrapper is missing but particlesJS is loaded
         particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#4facfe", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6 }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
            }
        });
    }

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
        let drifts = Array(codeSnippets.length).fill().map(() => ({ x: 0, y: 0 }));

        const moveSnippets = () => {
            codeSnippets.forEach((snippet, index) => {
                if (!snippet) return;

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
    }, { threshold: 0.1 });

    observeElements.forEach(element => observer.observe(element));

    // --- Banner / Countdown Logic ---

    // Initialize AOS
    if (typeof initAOS === 'function') {
        initAOS({ once: false });
    } else if (typeof AOS !== 'undefined') {
        AOS.init({ once: false });
    }

    const updateCountdown = () => {
        // Example Date: November 29, 2025
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

        if (elDays) elDays.textContent = days > 0 ? days : 0;
        if (elHours) elHours.textContent = hours.toString().padStart(2, '0');
        if (elMinutes) elMinutes.textContent = minutes.toString().padStart(2, '0');
        if (elSeconds) elSeconds.textContent = seconds.toString().padStart(2, '0');
    };

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Banner Interactive Effects
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

    // Add ripple styles dynamically
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
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
    }

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
