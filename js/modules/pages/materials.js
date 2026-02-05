
// Section: /\* --- materias.js --- \*/
/* --- materias.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#4facfe",
        lineOpacity: 0.2,
        grabOpacity: 0.4
    });

    initAOS();

    // Materias filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materiaCards = document.querySelectorAll('.materia-card');
    const searchInput = document.getElementById('searchMaterias');
    const noResultsElement = document.getElementById('noResults');
    const materiasGrid = document.getElementById('materiasGrid');

    // Function to filter materias based on category
    function filterMaterias(category) {
        let visibleCount = 0;

        materiaCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
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
            materiasGrid.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            materiasGrid.style.display = 'grid';
        }
    }

    // Filter buttons click handler
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter materias based on selected category
            const category = this.getAttribute('data-filter');
            filterMaterias(category);

            // Clear search input
            searchInput.value = '';
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            // Reset category filter
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            let visibleCount = 0;

            // Filter based on search term
            materiaCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardDescription = card.querySelector('.materia-details p').textContent.toLowerCase();
                const cardFeatures = Array.from(card.querySelectorAll('.materia-features li')).map(item => item.textContent.toLowerCase()).join(' ');

                if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm) || cardFeatures.includes(searchTerm)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0) {
                noResultsElement.style.display = 'block';
                materiasGrid.style.display = 'none';
            } else {
                noResultsElement.style.display = 'none';
                materiasGrid.style.display = 'grid';
            }
        });
    }

    // Animate floating code snippets in hero section
    const floatingCodes = document.querySelectorAll('.floating-code');
    floatingCodes.forEach((code, index) => {
        setTimeout(() => {
            code.style.opacity = '1';
        }, index * 300);
    });

    // Smooth scrolling for links
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

    // Hover effects for materia cards
    materiaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            // Add subtle animation to icon
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';

            // Highlight button
            btn.style.boxShadow = '0 8px 20px rgba(79, 172, 254, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.materia-icon i');
            const btn = this.querySelector('.materia-btn');

            // Reset icon
            icon.style.transform = 'scale(1)';

            // Reset button
            btn.style.boxShadow = '0 5px 15px rgba(79, 172, 254, 0.2)';
        });
    });

    // Initialize code highlighting and interactions for HTML5 detail page
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // "Back to Materias" button
    const volverBtn = document.getElementById('volverBtn');
    if (volverBtn) {
        volverBtn.addEventListener('click', function() {
            window.location.href = 'materias.html';
        });
    }

    // Copy code button functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create a temporary textarea to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = codeElement.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                // Change the button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado';

                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // "Edit code" button functionality - shows a modal with editable code
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);

            if (codeElement) {
                // Create modal elements
                const modalOverlay = document.createElement('div');
                modalOverlay.classList.add('code-edit-modal');

                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');

                const closeButton = document.createElement('button');
                closeButton.classList.add('close-modal');
                closeButton.innerHTML = '&times;';

                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');
                modalHeader.innerHTML = '<h3>Editor de código</h3>';

                const textarea = document.createElement('textarea');
                textarea.classList.add('code-editor');
                textarea.value = codeElement.textContent;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('modal-buttons');

                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Guardar cambios';

                const cancelButton = document.createElement('button');
                cancelButton.classList.add('cancel-button');
                cancelButton.textContent = 'Cancelar';

                // Assemble the modal
                buttonContainer.appendChild(saveButton);
                buttonContainer.appendChild(cancelButton);

                modalContent.appendChild(closeButton);
                modalContent.appendChild(modalHeader);
                modalContent.appendChild(textarea);
                modalContent.appendChild(buttonContainer);

                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);

                // Show the modal
                setTimeout(() => {
                    modalOverlay.classList.add('show');
                    textarea.focus();
                }, 10);

                // Close modal function
                const closeModal = () => {
                    modalOverlay.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modalOverlay);
                    }, 300);
                };

                // Event listeners for the modal
                closeButton.addEventListener('click', closeModal);
                cancelButton.addEventListener('click', closeModal);

                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });

                saveButton.addEventListener('click', function() {
                    // Update the code
                    codeElement.textContent = textarea.value;

                    // Rehighlight the code
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(codeElement);
                    }

                    closeModal();
                });
            }
        });
    });

    // Form validation demo
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.hasAttribute('pattern') && input.value.trim()) {
                    const pattern = new RegExp(input.getAttribute('pattern'));
                    if (!pattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Simulate success
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Formulario válido';
                submitBtn.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            } else {
                // Show error message
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error de validación';
                submitBtn.style.backgroundColor = '#e74c3c';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Helper function for email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const tocHeight = document.querySelector('.toc-section')?.offsetHeight || 0;
                const scrollPosition = targetElement.getBoundingClientRect().top + window.scrollY - tocHeight - 20;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add CSS for code editor modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .code-edit-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .code-edit-modal.show {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: white;
            width: 80%;
            max-width: 800px;
            border-radius: 10px;
            position: relative;
            transform: translateY(20px);
            transition: all 0.3s ease;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }

        .code-edit-modal.show .modal-content {
            transform: translateY(0);
        }

        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            background: none;
            border: none;
            color: #555;
            cursor: pointer;
            z-index: 1;
        }

        .modal-header {
            padding: 1rem 2rem;
            border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
            margin: 0;
            color: #333;
        }

        .code-editor {
            padding: 1rem;
            font-family: monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            min-height: 300px;
            width: 100%;
            border: none;
            resize: none;
            flex-grow: 1;
            border-bottom: 1px solid #eee;
        }

        .code-editor:focus {
            outline: none;
        }

        .modal-buttons {
            padding: 1rem 2rem;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }

        .save-button, .cancel-button {
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .save-button {
            background: #e34c26;
            color: white;
        }

        .save-button:hover {
            background: #f06529;
        }

        .cancel-button {
            background: #f1f1f1;
            color: #333;
        }

        .cancel-button:hover {
            background: #e5e5e5;
        }

        /* Form validation styles */
        input.invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
    `;
    document.head.appendChild(modalStyles);

    // Make TOC sticky based on scroll position
    const tocSection = document.querySelector('.toc-section');
    const heroSection = document.querySelector('.curso-hero');

    if (tocSection && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= heroBottom) {
                tocSection.classList.add('sticky');
            } else {
                tocSection.classList.remove('sticky');
            }
        });
    }
});

// Section: /\* --- materiales.js --- \*/
/* --- materiales.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 80,
        color: "#ffffff",
        opacity: 0.2,
        randomOpacity: true,
        lineColor: "#ffffff",
        lineOpacity: 0.2,
        grabOpacity: 0.5
    });

    initAOS({
        mirror: false
    });

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

// Section: /\* --- materiales2.js --- \*/
/* --- materiales2.js --- */
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-js', {
        number: 50,
        color: "#ffffff",
        opacity: 0.3,
        randomOpacity: true,
        lineColor: "#4facfe",
        lineOpacity: 0.2
    });

    initAOS();

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
