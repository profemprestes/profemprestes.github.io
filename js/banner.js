document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false
        });
    }

    // Calculate countdown to a specific date (example: June 30, 2024)
    const targetDate = new Date('2025-11-29 00:00:00').getTime();
    
    // Initialize countdown timer variable before it's used
    let countdownTimer;
    
    function updateCountdown() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the time remaining
        const timeRemaining = targetDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Get DOM elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        // Check if elements exist before updating
        if (daysEl && hoursEl && minutesEl && secondsEl) {
            // Update DOM with new values only if they've changed
            updateElementWithAnimation(daysEl, days);
            updateElementWithAnimation(hoursEl, hours < 10 ? '0' + hours : hours);
            updateElementWithAnimation(minutesEl, minutes < 10 ? '0' + minutes : minutes);
            updateElementWithAnimation(secondsEl, seconds < 10 ? '0' + seconds : seconds);
        }
        
        // If countdown is over
        if (timeRemaining < 0) {
            clearInterval(countdownTimer);
            
            // Update DOM with zeros
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            
            // Show celebration message
            const countdownTitle = document.querySelector('.countdown-title');
            if (countdownTitle) {
                countdownTitle.textContent = '¡La libertad ha llegado! 🎉🎊';
            }
            
            const bannerSubtitle = document.querySelector('.banner-subtitle');
            if (bannerSubtitle) {
                bannerSubtitle.textContent = 'Disfruta de tu merecido descanso. ¡Lo lograste!';
            }
        }
    }
    
    // Function to update element with flip animation if value changed
    function updateElementWithAnimation(element, newValue) {
        if (element.textContent !== newValue.toString()) {
            // Add flip animation class
            element.classList.add('flip');
            
            // Update value
            element.textContent = newValue;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('flip');
            }, 500);
        }
    }
    
    // Initialize countdown
    updateCountdown();
    
    // Update countdown every second
    countdownTimer = setInterval(updateCountdown, 1000);
    
    // Add hover effects to countdown boxes
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach(box => {
        box.addEventListener('mouseover', function() {
            // Create ripple effect with CSS variable for position
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Calculate random position for the ripple
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            ripple.style.setProperty('--ripple-x', x + '%');
            ripple.style.setProperty('--ripple-y', y + '%');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Add style for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            top: var(--ripple-y, 50%);
            left: var(--ripple-x, 50%);
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 0.8;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add button hover sound effect (subtle)
    const bannerBtns = document.querySelectorAll('.banner-btn');
    bannerBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Create subtle hover effect
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Subtle pop effect
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});