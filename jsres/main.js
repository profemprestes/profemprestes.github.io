// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Enhanced navbar scroll effect with transition
const navbar = document.getElementById('navbar');
const navbarBrand = document.querySelector('.navbar-brand');
const slogan = document.querySelector('.slogan');

const updateNavbar = () => {
    const scrolled = window.scrollY > 50;

    navbar.classList.toggle('scroll-navbar', scrolled);

    // Update logo size on scroll
    if (scrolled) {
        navbarBrand.querySelector('img').style.height = '40px';
        slogan.classList.add('hidden');
    } else {
        navbarBrand.querySelector('img').style.height = '50px';
        slogan.classList.remove('hidden');
    }
};

window.addEventListener('scroll', updateNavbar);

// Enhanced mobile menu toggle with animation
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let isAnimating = false;

const toggleMobileMenu = () => {
    if (isAnimating) return;

    isAnimating = true;
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('mobile-menu-enter');
        requestAnimationFrame(() => {
            mobileMenu.classList.add('mobile-menu-enter-active');
        });
    } else {
        mobileMenu.classList.add('mobile-menu-exit');
        mobileMenu.classList.add('mobile-menu-exit-active');
    }

    setTimeout(() => {
        if (!isHidden) {
            mobileMenu.classList.add('hidden');
        }
        mobileMenu.classList.remove(
            'mobile-menu-enter',
            'mobile-menu-enter-active',
            'mobile-menu-exit',
            'mobile-menu-exit-active'
        );
        isAnimating = false;
    }, 200);
};

menuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove(
            'mobile-menu-enter',
            'mobile-menu-enter-active',
            'mobile-menu-exit',
            'mobile-menu-exit-active'
        );
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove(
                'mobile-menu-enter',
                'mobile-menu-enter-active',
                'mobile-menu-exit',
                'mobile-menu-exit-active'
            );
        }
    });
});

// Initialize Particles.js
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Countdown Timer
const updateCountdown = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 10, 29); // 29 de noviembre (meses son 0-indexed)
    const diff = target - now;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Add ending animation when less than 1 minute remains
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    if (days === 0 && hours === 0 && minutes === 0) {
        countdownBoxes.forEach(box => box.classList.add('countdown-ending'));
    } else {
        countdownBoxes.forEach(box => box.classList.remove('countdown-ending'));
    }

    // Update title with random encouraging messages
    const titles = [
        "¡Aguanten, que falta poco para la libertad! ",
        "Cuenta regresiva para el fin de cursos... ¡Ánimo! ",
        "Solo un poco más de sufrimiento... ¡Ya casi! ",
        "La libertad está a la vuelta de la esquina "
    ];

    if (minutes === 0 && seconds === 0) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        document.querySelector('.countdown-title').textContent = randomTitle;
    }
};

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Optional: Dark mode toggle
const darkModeToggle = () => {
    document.documentElement.classList.toggle('dark');
};

// Enhanced Footer Animations
document.querySelectorAll('.footer-column').forEach((column, index) => {
    column.style.opacity = '0';
    column.style.transform = 'translateY(20px)';

    setTimeout(() => {
        column.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        column.style.opacity = '1';
        column.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Enhanced Social Stats Counter
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Add easing
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(easeProgress * (end - start) + start);

        element.textContent = new Intl.NumberFormat().format(value);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Add bounce effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for Footer
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate social stats when footer becomes visible
            document.querySelectorAll('.social-stat').forEach((stat, index) => {
                setTimeout(() => {
                    const targetValue = parseInt(stat.getAttribute('data-value'));
                    animateValue(stat, 0, targetValue, 2000);
                }, index * 200);
            });

            // Add floating animation to icons
            document.querySelectorAll('.footer i').forEach(icon => {
                icon.classList.add('footer-float');
            });

            footerObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe footer
const footer = document.querySelector('footer');
footerObserver.observe(footer);

// Enhance Back to Top button with smooth easing
const backToTopBtn = document.getElementById('back-to-top');
const updateBackToTopButton = () => {
    const scrolled = window.scrollY > 300;
    const classes = ['opacity-0', 'translate-y-10', 'pointer-events-none'];

    if (scrolled) {
        backToTopBtn.classList.remove(...classes);
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        backToTopBtn.classList.add(...classes);
    }
};

const backToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 1000;

    const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3);
    };

    const animate = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition * (1 - easeOutCubic(progress)));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

backToTopBtn.addEventListener('click', backToTop);

// Enhance scroll progress indicator
const updateScrollProgress = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.querySelector('.scroll-progress');
    progressBar.style.width = `${scrolled}%`;
    progressBar.style.background = `linear-gradient(90deg, 
  #3b82f6 0%, 
  #8b5cf6 ${scrolled}%, 
  transparent ${scrolled}%
)`;
    progressBar.style.opacity = scrolled > 0 ? 1 : 0;
};

window.addEventListener('scroll', () => {
    updateBackToTopButton();
    updateScrollProgress();
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Materials data
const materials = [{
        id: 1,
        title: 'Programación Básica',
        category: 'programacion',
        icon: 'fas fa-code',
        description: 'Fundamentos de programación y algoritmos.'
    },
    {
        id: 2,
        title: 'SQL Avanzado',
        category: 'databases',
        icon: 'fas fa-database',
        description: 'Consultas complejas y optimización de bases de datos.'
    },
    {
        id: 3,
        title: 'Robótica Educativa',
        category: 'robotica',
        icon: 'fas fa-robot',
        description: 'Introducción a la robótica con proyectos prácticos.'
    },
    {
        id: 4,
        title: 'Desarrollo Web',
        category: 'programacion',
        icon: 'fas fa-globe',
        description: 'Creación de sitios web modernos y responsivos.'
    },
    {
        id: 5,
        title: 'NoSQL',
        category: 'databases',
        icon: 'fas fa-server',
        description: 'Bases de datos no relacionales y Big Data.'
    }
];

const categories = [
    { id: 'all', name: 'Todos', icon: 'fas fa-th-large' },
    { id: 'programacion', name: 'Programación', icon: 'fas fa-code' },
    { id: 'databases', name: 'Bases de Datos', icon: 'fas fa-database' },
    { id: 'robotica', name: 'Robótica', icon: 'fas fa-robot' }
];

// Initialize materials section
const initializeMaterials = () => {
    const materialsSection = document.getElementById('materiales');
    if (!materialsSection) return;

    const filterContainer = materialsSection.querySelector('.filter-container');
    const materialsGrid = materialsSection.querySelector('.materials-grid');

    if (!filterContainer || !materialsGrid) return;

    // Create filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `filter-button ${category.id === 'all' ? 'active' : ''}`;
        button.dataset.category = category.id;
        button.innerHTML = `
    <i class="${category.icon}"></i>
    <span>${category.name}</span>
  `;
        filterContainer.appendChild(button);
    });

    // Initial render
    renderMaterials('all');

    // Add filter functionality
    filterContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.filter-button');
        if (!button) return;

        const category = button.dataset.category;

        // Update active state
        filterContainer.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter materials
        renderMaterials(category);
    });
};

// Render materials based on category
const renderMaterials = (category) => {
    const materialsGrid = document.querySelector('.materials-grid');
    if (!materialsGrid) return;

    const filteredMaterials = category === 'all' ?
        materials :
        materials.filter(m => m.category === category);

    // Clear grid
    materialsGrid.innerHTML = '';

    // Add materials with animation
    filteredMaterials.forEach((material, index) => {
        const card = document.createElement('div');
        card.className = 'material-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);

        card.innerHTML = `
    <div class="material-icon-wrapper">
      <i class="${material.icon}"></i>
    </div>
    <h3 class="text-xl font-semibold mb-2">${material.title}</h3>
    <p class="text-gray-600 mb-4">${material.description}</p>
    <a href="#" class="material-link">
      Ver más 
      <i class="fas fa-arrow-right"></i>
    </a>
  `;

        materialsGrid.appendChild(card);
    });

    // Refresh AOS
    AOS.refresh();
};

// Initialize materials section when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMaterials);