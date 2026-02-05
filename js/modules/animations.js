/* Combined JS for Matias Prestes Website */

/**
 * Initialize Particles.js with custom options
 * @param {string} elementId - The ID of the element to render particles in
 * @param {object} options - Custom options to override defaults
 */
function initParticles(elementId, options = {}) {
    if (typeof particlesJS !== 'undefined' && document.getElementById(elementId)) {
        const settings = {
            number: options.number || 80,
            color: options.color || "#ffffff",
            lineColor: options.lineColor || "#4facfe",
            lineOpacity: options.lineOpacity !== undefined ? options.lineOpacity : 0.4,
            opacity: options.opacity !== undefined ? options.opacity : 0.5,
            randomOpacity: options.randomOpacity !== undefined ? options.randomOpacity : false,
            grabOpacity: options.grabOpacity !== undefined ? options.grabOpacity : 1,
            moveSpeed: options.moveSpeed || 2
        };

        particlesJS(elementId, {
            "particles": {
                "number": {
                    "value": settings.number,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": settings.color
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
                    "value": settings.opacity,
                    "random": settings.randomOpacity,
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
                    "color": settings.lineColor,
                    "opacity": settings.lineOpacity,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": settings.moveSpeed,
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
                            "opacity": settings.grabOpacity
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
    } else if (!document.getElementById(elementId) && typeof particlesJS !== 'undefined') {
        // Element not found, silent or debug log
    } else {
        // console.warn('Particles.js not loaded');
    }
}

/**
 * Initialize AOS with custom options
 * @param {object} options - Custom options to override defaults
 */
function initAOS(options = {}) {
    if (typeof AOS !== 'undefined') {
        const defaults = {
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        };
        AOS.init({ ...defaults, ...options });
    }
}
// Export to window for compatibility with other modules
window.initParticles = initParticles;
window.initAOS = initAOS;
