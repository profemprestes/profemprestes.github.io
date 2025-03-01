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
                    "color": "#4facfe",
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