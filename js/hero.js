document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for hero buttons
    const heroCta = document.getElementById('hero-cta-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Initialize Particles.js
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
                    "value": 0.5,
                    "random": false,
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
                    "opacity": 0.4,
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
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('Particles.js not loaded or particles-js element not found');
    }
    
    // Add interaction to the profile image
    const profileImage = document.querySelector('.profile-image');
    const badges = document.querySelectorAll('.tech-badge');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            badges.forEach(badge => {
                badge.style.animationPlayState = 'paused';
            });
        });
        
        profileImage.addEventListener('mouseleave', function() {
            badges.forEach(badge => {
                badge.style.animationPlayState = 'running';
            });
        });
    }
    
    // Code snippets animation
    const codeSnippets = document.querySelectorAll('.code-snippet');
    if (codeSnippets.length > 0) {
        // Random movement for code snippets
        let positions = [];
        
        codeSnippets.forEach((snippet, index) => {
            positions.push({
                x: parseFloat(getComputedStyle(snippet).left) || 0,
                y: parseFloat(getComputedStyle(snippet).top) || 0,
                dirX: Math.random() > 0.5 ? 1 : -1,
                dirY: Math.random() > 0.5 ? 1 : -1,
                speed: 0.5 + Math.random()
            });
        });
        
        // This is just for small additional movement, the main animation is in CSS
        const moveSnippets = () => {
            codeSnippets.forEach((snippet, index) => {
                if (!snippet || positions.length <= index) return;
                
                const currentX = parseFloat(snippet.style.left) || positions[index].x;
                const currentY = parseFloat(snippet.style.top) || positions[index].y;
                
                // Subtle random movement
                const newX = currentX + (Math.random() * 0.5 - 0.25);
                const newY = currentY + (Math.random() * 0.5 - 0.25);
                
                snippet.style.left = `${newX}%`;
                snippet.style.top = `${newY}%`;
            });
            
            requestAnimationFrame(moveSnippets);
        };
        
        requestAnimationFrame(moveSnippets);
    }
    
    // Detect when hero section is in view and add extra animation
    const observeElements = document.querySelectorAll('.hero-content, .hero-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observeElements.forEach(element => {
        observer.observe(element);
    });
});