document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for hero background
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
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
                    "value": 0.2,
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
                    "color": "#ffffff",
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
                            "opacity": 0.5
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
            mirror: false,
            offset: 100
        });
    }

    // Initialize Swiper slider for featured materials
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // Category filter
    const categoriaCards = document.querySelectorAll('.categoria-card');
    categoriaCards.forEach(card => {
        card.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filterTabs = document.querySelectorAll('.filter-tab');
            
            // Activate corresponding filter tab
            filterTabs.forEach(tab => {
                if (tab.getAttribute('data-filter') === filter) {
                    tab.click();
                    
                    // Scroll to materials section
                    document.querySelector('.materiales-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

    // Materials filter
    const filterTabs = document.querySelectorAll('.filter-tab');
    const materialCards = document.querySelectorAll('.material-card');
    const noResultsMessage = document.getElementById('noResults');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            // Filter cards
            materialCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                    visibleCount++;
                    
                    // Reset animation
                    card.classList.remove('aos-animate');
                    setTimeout(() => {
                        card.classList.add('aos-animate');
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    });

    // Materials search
    const searchInput = document.getElementById('materialesSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;
            
            // Reset filters when searching
            if (searchTerm !== '') {
                filterTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-filter') === 'all') {
                        tab.classList.add('active');
                    }
                });
            }
            
            // Filter materials by search term
            materialCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const description = card.querySelector('p').innerText.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.innerText.toLowerCase());
                
                if (searchTerm === '' || 
                    title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm))) {
                    card.style.display = '';
                    visibleCount++;
                    
                    // Highlight matching text
                    highlightMatches(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    }

    // Highlight search matches
    function highlightMatches(card, searchTerm) {
        if (!searchTerm) return;
        
        // Remove existing highlights
        const highlighted = card.querySelectorAll('.highlight');
        highlighted.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        
        if (searchTerm.length < 2) return;
        
        // Add highlights
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const tags = card.querySelectorAll('.tag');
        
        [title, description, ...tags].forEach(element => {
            if (!element) return;
            
            const text = element.innerText;
            if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                element.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
            }
        });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            
            // Simulate loading delay
            setTimeout(() => {
                // Here you would normally fetch more materials from a database
                // For this demo, we'll just display a message
                this.innerHTML = 'No hay más materiales para cargar';
                this.disabled = true;
                this.style.opacity = '0.7';
                this.style.cursor = 'not-allowed';
            }, 1500);
        });
    }

    // Suggest Material Modal
    const sugerirBtn = document.getElementById('sugerirBtn');
    const sugerirModal = document.getElementById('sugerirModal');
    const closeModal = document.querySelector('.close-modal');
    const sugerirForm = document.getElementById('sugerirForm');
    
    if (sugerirBtn && sugerirModal) {
        sugerirBtn.addEventListener('click', function() {
            sugerirModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
        
        // Close modal when clicking X
        closeModal.addEventListener('click', function() {
            sugerirModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === sugerirModal) {
                sugerirModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Form submission
        sugerirForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.sugerir-submit');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                this.innerHTML = `
                    <div style="text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 1rem;"></i>
                        <h3>¡Gracias por tu sugerencia!</h3>
                        <p>Hemos recibido tu solicitud y la evaluaremos a la brevedad.</p>
                        <button type="button" class="sugerir-submit" id="closeSuccessBtn">Cerrar</button>
                    </div>
                `;
                
                // Add event listener to close button
                document.getElementById('closeSuccessBtn').addEventListener('click', function() {
                    sugerirModal.style.display = 'none';
                    document.body.style.overflow = '';
                    
                    // Reset form after closing
                    setTimeout(() => {
                        sugerirForm.innerHTML = `
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" id="nombre" placeholder="Tu nombre" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="Tu correo electrónico" required>
                            </div>
                            <div class="form-group">
                                <label for="tipoMaterial">Tipo de material</label>
                                <select id="tipoMaterial" required>
                                    <option value="">Selecciona un tipo</option>
                                    <option value="pdf">PDF/Documento</option>
                                    <option value="video">Video</option>
                                    <option value="codigo">Código/Scripts</option>
                                    <option value="ejercicios">Ejercicios</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="descripcion">Descripción</label>
                                <textarea id="descripcion" rows="5" placeholder="Describe el material que te gustaría encontrar" required></textarea>
                            </div>
                            <button type="submit" class="sugerir-submit">Enviar Sugerencia</button>
                        `;
                    }, 500);
                });
            }, 2000);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleText = document.querySelector('.theme-toggle-text');
    
    if (themeToggle) {
        // Check for saved theme preference or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle.classList.add('dark');
            themeToggleText.textContent = 'Modo Claro';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('dark');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleText.textContent = 'Modo Claro';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleText.textContent = 'Modo Oscuro';
            }
        });
    }

    // Add CSS for highlighting search matches
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(52, 148, 230, 0.2);
            border-radius: 2px;
            padding: 0 2px;
        }
    `;
    document.head.appendChild(style);
});