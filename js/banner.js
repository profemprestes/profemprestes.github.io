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
        // Set the date we're counting down to (end of school year)
        const endDate = new Date("November 29, 2025 23:59:59").getTime();
        
        // Update the countdown every second
        setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            // Calculate days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the HTML elements
            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
            
            // If the countdown is finished
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("days").textContent = "0";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
            }
        }, 1000);
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