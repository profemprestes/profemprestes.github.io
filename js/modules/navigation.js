/**
 * Navigation Module
 * Handles responsive navigation menu, toggling, and scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-container');
    const navToggle = document.getElementById('nav-toggle');
    const navMenuContainer = document.getElementById('nav-menu-container') || document.querySelector('.nav-menu-container');

    // Create overlay if not exists
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    function openMenu() {
        if (navMenuContainer) navMenuContainer.classList.add('show');
        if (navOverlay) navOverlay.classList.add('show');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        }
    }

    function closeMenu() {
        if (navMenuContainer) navMenuContainer.classList.remove('show');
        if (navOverlay) navOverlay.classList.remove('show');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    }

    if (navToggle && navMenuContainer) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenuContainer.classList.contains('show')) closeMenu();
            else openMenu();
        });

        navOverlay.addEventListener('click', closeMenu);

        // Close on link click
        const navLinks = navMenuContainer.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenuContainer.classList.contains('show')) closeMenu();
        });
    }

    // Scroll effect for nav
    function handleScroll() {
        if (navContainer) {
            if (window.scrollY > 50) navContainer.classList.add('scrolled');
            else navContainer.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
