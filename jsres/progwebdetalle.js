// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// Add floating animation to topic icons
document.querySelectorAll('.topic-icon').forEach(icon => {
  let angle = 0;
  let amplitude = 5;
  
  const animate = () => {
    angle += 0.05;
    const y = Math.sin(angle) * amplitude;
    icon.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(animate);
  };
  
  animate();
});

// Add parallax effect to code grid
document.addEventListener('mousemove', (e) => {
  const grid = document.querySelector('.code-grid');
  if (!grid) return;

  const x = (e.clientX - window.innerWidth / 2) * 0.01;
  const y = (e.clientY - window.innerHeight / 2) * 0.01;
  
  grid.style.transform = `translate(${x}px, ${y}px)`;
});

// Animate info items on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.info-item').forEach(item => {
  item.style.transform = 'translateY(20px)';
  item.style.opacity = '0';
  item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(item);
});

// Add hover effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('mouseenter', () => {
    ctaButton.querySelector('i').style.transform = 'translateX(5px)';
  });
  
  ctaButton.addEventListener('mouseleave', () => {
    ctaButton.querySelector('i').style.transform = 'translateX(0)';
  });
}