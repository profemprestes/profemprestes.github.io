// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Countdown timer
const startCountdown = () => {
    let timeLeft = 10;
    const countdownElement = document.getElementById('countdown');

    const countdown = setInterval(() => {
        timeLeft--;

        if (countdownElement) {
            countdownElement.textContent = timeLeft;
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            window.location.href = 'index.html';
        }
    }, 1000);
};

// Typewriter effect
const typewriterElements = document.querySelectorAll('.typewriter');
typewriterElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let index = 0;

    const type = () => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, 100);
        }
    };

    type();
});

// Glitch effect for 500 error
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    setInterval(() => {
        const offset = Math.random() * 10 - 5;
        glitchElement.style.transform = `translate(${offset}px, ${offset}px)`;

        setTimeout(() => {
            glitchElement.style.transform = 'translate(0, 0)';
        }, 50);
    }, 3000);
}

// Particle effect
const createParticles = () => {
    const particlesContainer = document.querySelector('.error-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;

        particlesContainer.appendChild(particle);

        // Animate particle
        const animate = () => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            particle.style.transform = `translate(${x - startX}%, ${y - startY}%)`;
            particle.style.opacity = Math.random();

            requestAnimationFrame(animate);
        };

        animate();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    createParticles();

    // Check for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
});