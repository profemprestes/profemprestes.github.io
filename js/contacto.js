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

    // Animation for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute('data-speed')) || 1;
        icon.style.animationDuration = `${6 * speed}s`;
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');
    
    // Validation functions
    const validations = {
        name: (value) => {
            if (!value.trim()) return 'El nombre es obligatorio';
            if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'El correo electrónico es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Ingresa un correo electrónico válido';
            return '';
        },
        subject: (value) => {
            if (!value.trim()) return 'El asunto es obligatorio';
            if (value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres';
            return '';
        },
        message: (value) => {
            if (!value.trim()) return 'El mensaje es obligatorio';
            if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
            return '';
        }
    };
    
    // Validate input and show error if needed
    const validateInput = (input) => {
        const field = input.getAttribute('data-validation');
        const errorElement = document.getElementById(`${field}Error`);
        
        if (field && validations[field]) {
            const errorMessage = validations[field](input.value);
            errorElement.textContent = errorMessage;
            
            if (errorMessage) {
                input.classList.add('error');
                return false;
            } else {
                input.classList.remove('error');
                return true;
            }
        }
        return true;
    };
    
    // Add validation on input change
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitButton.disabled = true;
                
                // Simulate server response delay
                setTimeout(() => {
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Close success message
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }
    
    // Click outside to close success message
    successMessage.addEventListener('click', function(e) {
        if (e.target === this) {
            successMessage.classList.remove('show');
        }
    });
    
    // Escape key to close success message
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successMessage.classList.contains('show')) {
            successMessage.classList.remove('show');
        }
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for all anchor links
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
    
    // Add reveal animations for elements as they scroll into view
    const revealElements = document.querySelectorAll('.contact-form-container, .contact-info-container, .faq-mini-section');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }
    
    // Add .revealed class for CSS animations if not already defined
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .input-wrapper input.error,
            .input-wrapper textarea.error {
                border-color: #e74c3c;
            }
        </style>
    `);
});