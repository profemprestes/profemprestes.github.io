document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js with simplified configuration
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#4facfe",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Materias filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');
    const searchInput = document.getElementById('searchMaterias');
    const noResultsElement = document.getElementById('noResults');
    const materiasGrid = document.getElementById('materiasGrid');

    // Enhanced filtering function with animations
    function filterMaterias(category) {
        let visibleCount = 0;
        
        materiaCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.style.display = '';
                visibleCount++;
                
                // Reset and reapply animation with staggered delay
                card.setAttribute('data-aos-delay', (index % 3) * 100);
                card.classList.remove('aos-animate');
                setTimeout(() => card.classList.add('aos-animate'), 10);
            } else {
                card.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount);
    }

    // Enhanced search functionality
    function searchMaterias(searchTerm) {
        let visibleCount = 0;
        
        materiaCards.forEach((card, index) => {
            const cardText = card.textContent.toLowerCase();
            const shouldShow = cardText.includes(searchTerm.toLowerCase());
            
            if (shouldShow) {
                card.style.display = '';
                visibleCount++;
                
                // Reset and reapply animation with staggered delay
                card.setAttribute('data-aos-delay', (index % 3) * 100);
                card.classList.remove('aos-animate');
                setTimeout(() => card.classList.add('aos-animate'), 10);
            } else {
                card.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount);
    }

    // Helper function to toggle no results message
    function toggleNoResultsMessage(visibleCount) {
        if (visibleCount === 0) {
            noResultsElement.style.display = 'block';
            materiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            materiasGrid.style.display = 'grid';
        }
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterMaterias(this.getAttribute('data-filter'));
            if (searchInput) searchInput.value = '';
        });
    });

    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchMaterias(this.value.trim());
                filterButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
                });
            }, 300);
        });
    }

    // Card hover effects
    materiaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');
            
            if (icon) icon.style.transform = 'scale(1.2)';
            if (btn) btn.style.boxShadow = '0 8px 20px rgba(79, 172, 254, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');
            
            if (icon) icon.style.transform = '';
            if (btn) btn.style.boxShadow = '';
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});