document.addEventListener('DOMContentLoaded', () => {
    // Phrases Carousel
    const phrases = document.querySelectorAll('.phrase');
    let currentPhrase = 0;

    function rotatePhrase() {
        phrases[currentPhrase].classList.remove('active');
        currentPhrase = (currentPhrase + 1) % phrases.length;
        phrases[currentPhrase].classList.add('active');
    }

    // Rotate phrases every 3 seconds
    setInterval(rotatePhrase, 3000);

    // Responsive Particles.js Configuration
    function initParticles() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: window.innerWidth < 768 ? 40 : 80,
                        density: {
                            enable: true,
                            value_area: window.innerWidth < 768 ? 400 : 800
                        }
                    },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: {
                        value: window.innerWidth < 768 ? 2 : 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: window.innerWidth < 768 ? 4 : 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out'
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    // Initialize particles and handle resize
    initParticles();
    window.addEventListener('resize', initParticles);

    // Tech Skills Hover Effects with touch support
    document.querySelectorAll('.tech-skill').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add touch support
        skill.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        skill.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // AOS Initialization with responsive settings
    AOS.init({
        duration: 800,
        once: true,
        offset: window.innerWidth < 768 ? 50 : 150,
        easing: 'ease-out-quart',
        mirror: false
    });
});