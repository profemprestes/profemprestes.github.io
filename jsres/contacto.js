// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// Enhance contact cards with hover effects
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  });
});

// Add floating animation to icons
document.querySelectorAll('.contact-icon').forEach(icon => {
  let angle = 0;
  
  setInterval(() => {
    angle += 0.05;
    const y = Math.sin(angle) * 5;
    icon.style.transform = `translateY(${y}px)`;
  }, 50);
});

// Animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target.querySelector('.skill-progress-bar');
      const value = entry.target.getAttribute('data-value') || '0';
      skillBar.style.width = `${value}%`;
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.skill-progress-item').forEach(item => {
  observer.observe(item);
});

// Enhance social buttons with dynamic effects
document.querySelectorAll('.social-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px) scale(1.05)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0) scale(1)';
  });
});

// Add parallax effect to background particles
document.addEventListener('mousemove', (e) => {
  const particles = document.querySelector('.contact-particles');
  if (!particles) return;

  const x = (e.clientX - window.innerWidth / 2) * 0.02;
  const y = (e.clientY - window.innerHeight / 2) * 0.02;
  
  particles.style.transform = `translate(${x}px, ${y}px)`;
});