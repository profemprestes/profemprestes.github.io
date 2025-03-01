document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for hero background
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#76b2fe",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Noticias filtering functionality
    const tagButtons = document.querySelectorAll('.tag-btn');
    const noticiaCards = document.querySelectorAll('.noticia-card');
    const searchInput = document.getElementById('noticiasSearch');
    const noResultsElement = document.getElementById('noResults');
    const noticiasGrid = document.getElementById('noticiasGrid');
    
    // Function to filter noticias based on tag
    function filterNoticias(tag) {
        let visibleCount = 0;
        
        noticiaCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags');
            
            if (tag === 'all' || cardTags.includes(tag)) {
                card.style.display = '';
                visibleCount++;
                
                // Remove and reapply AOS attributes to trigger animations
                const aosDelay = parseInt(card.getAttribute('data-aos-delay') || '0');
                card.setAttribute('data-aos-delay', aosDelay.toString());
                card.classList.remove('aos-animate');
                
                // Add class back after a short delay for animation
                setTimeout(() => {
                    card.classList.add('aos-animate');
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsElement.style.display = 'block';
            noticiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            noticiasGrid.style.display = 'grid';
        }
    }
    
    // Tag buttons click handler
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tagButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter noticias based on selected tag
            const tag = this.getAttribute('data-tag');
            filterNoticias(tag);
            
            // Clear search input
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Reset tag filter
            tagButtons.forEach(btn => {
                if (btn.getAttribute('data-tag') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            let visibleCount = 0;
            
            // Filter based on search term
            noticiaCards.forEach(card => {
                const cardTitle = card.querySelector('.noticia-titulo').textContent.toLowerCase();
                const cardContent = card.querySelector('.noticia-resumen').textContent.toLowerCase();
                const cardTag = card.querySelector('.noticia-tag').textContent.toLowerCase();
                
                if (cardTitle.includes(searchTerm) || cardContent.includes(searchTerm) || cardTag.includes(searchTerm)) {
                    card.style.display = '';
                    visibleCount++;
                    
                    // Highlight matching text
                    highlightText(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsElement.style.display = 'block';
                noticiasGrid.style.display = 'none';
            } else {
                noResultsElement.style.display = 'none';
                noticiasGrid.style.display = 'grid';
            }
        });
    }
    
    // Function to highlight matching text
    function highlightText(card, searchTerm) {
        if (!searchTerm) return;
        
        // Remove existing highlights
        const highlights = card.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
        
        // Add new highlights
        const titleEl = card.querySelector('.noticia-titulo');
        const contentEl = card.querySelector('.noticia-resumen');
        
        if (searchTerm && titleEl && contentEl) {
            [titleEl, contentEl].forEach(el => {
                const originalText = el.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                if (regex.test(originalText)) {
                    el.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
                }
            });
        }
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Scroll to top of noticias section
                const noticiasSection = document.querySelector('.noticias-section');
                if (noticiasSection) {
                    window.scrollTo({
                        top: noticiasSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
                
                // In a real implementation, this would load new content
                // Simulate loading for demonstration
                simulateLoading();
            });
        }
    });
    
    function simulateLoading() {
        const noticiasGrid = document.getElementById('noticiasGrid');
        if (noticiasGrid) {
            // Add loading state
            noticiasGrid.style.opacity = '0.5';
            noticiasGrid.style.pointerEvents = 'none';
            
            // Reset after simulated load
            setTimeout(() => {
                noticiasGrid.style.opacity = '1';
                noticiasGrid.style.pointerEvents = 'auto';
            }, 800);
        }
    }
    
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            if (emailInput && emailInput.value.trim() !== '') {
                // Disable form elements
                emailInput.disabled = true;
                submitButton.disabled = true;
                
                // Change button text to show success
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    emailInput.value = '';
                    
                    // Show success message (could be more elaborate)
                    alert('¡Gracias por suscribirte! Recibirás nuestras novedades en tu correo.');
                }, 2000);
            }
        });
    });
    
    // NEW: Subscription form functionality
    const suscripcionForm = document.querySelector('.suscripcion-form');
    if (suscripcionForm) {
        suscripcionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const messageEl = this.querySelector('.suscripcion-message');
            
            if (emailInput && emailInput.value.trim() !== '') {
                const email = emailInput.value.trim();
                
                // Basic email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    messageEl.textContent = 'Por favor, ingresa un correo electrónico válido.';
                    messageEl.className = 'suscripcion-message error';
                    return;
                }
                
                // Disable form elements during "submission"
                emailInput.disabled = true;
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate API call/subscription process
                setTimeout(() => {
                    // Show success and reset form
                    messageEl.textContent = '¡Gracias por suscribirte! Te hemos enviado un correo de confirmación.';
                    messageEl.className = 'suscripcion-message success';
                    
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Suscrito';
                    
                    // Re-enable after delay
                    setTimeout(() => {
                        emailInput.disabled = false;
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                        emailInput.value = '';
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // RSS link behavior
    const rssLink = document.querySelector('.rss-link');
    if (rssLink) {
        rssLink.addEventListener('click', function(e) {
            // Optional: Add analytics tracking for RSS subscription
            if (typeof gtag !== 'undefined') {
                gtag('event', 'rss_subscription', {
                    'event_category': 'engagement',
                    'event_label': 'RSS Feed'
                });
            }
            
            // Optional: Show a popup with instructions for using RSS
            // Uncomment if you want to show a modal instead of direct navigation
            /*
            e.preventDefault();
            const instructions = `
                <div>
                    <h3>Cómo usar nuestro RSS</h3>
                    <p>1. Copia esta URL: ${window.location.origin}/noticias.xml</p>
                    <p>2. Pégala en tu lector de RSS favorito</p>
                    <p>3. ¡Listo! Ya recibirás nuestras actualizaciones automáticamente</p>
                </div>
            `;
            // Show your modal with these instructions
            showModal(instructions);
            */
        });
    }
    
    // Add styles for highlight effect
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(74, 116, 255, 0.2);
            padding: 0 2px;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
});