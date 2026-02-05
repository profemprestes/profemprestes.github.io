
// Section: /\* --- Error Pages Logic --- \*/
/* --- Error Pages Logic --- */
document.addEventListener('DOMContentLoaded', function() {
    // Only run if we are on an error page
    if (!document.querySelector('.error-container')) return;

    // Countdown timer
    const startCountdown = () => {
        let timeLeft = 10;
        const countdownElement = document.getElementById('countdown');

        if (countdownElement) {
            const countdown = setInterval(() => {
                timeLeft--;
                countdownElement.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    window.location.href = 'index.html';
                }
            }, 1000);
        }
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

    // Custom Particle effect for Error Pages
    const createErrorParticles = () => {
        const particlesContainer = document.querySelector('.error-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            // Inline styles for particles since they are dynamic
            particle.style.position = 'absolute';
            particle.style.background = 'white';
            particle.style.borderRadius = '50%';

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

                // Simple transition using CSS would be better but keeping original logic
                particle.style.transition = 'all 5s linear';
                particle.style.transform = `translate(${x - startX}%, ${y - startY}%)`;
                particle.style.opacity = Math.random();

                // Reset/Loop
                setTimeout(() => requestAnimationFrame(animate), 5000);
            };

            requestAnimationFrame(animate);
        }
    };

    startCountdown();
    createErrorParticles();
});
