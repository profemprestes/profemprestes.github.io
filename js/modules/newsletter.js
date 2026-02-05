/**
 * Newsletter Module
 * Handles newsletter subscription form interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('.newsletter-input'); // scoped
        const newsletterButton = newsletterForm.querySelector('.newsletter-button'); // scoped

        if (newsletterInput && newsletterButton) {
            newsletterInput.addEventListener('focus', () => newsletterForm.classList.add('focused'));
            newsletterInput.addEventListener('blur', () => newsletterForm.classList.remove('focused'));

            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (newsletterInput.value.trim() !== '') {
                    const originalText = newsletterButton.innerHTML;
                    newsletterButton.innerHTML = '<i class="fas fa-check"></i>';

                    setTimeout(() => {
                        newsletterInput.value = '';
                        newsletterButton.innerHTML = originalText; // Restore original text/icon

                        const success = document.createElement('div');
                        success.className = 'newsletter-success';
                        success.textContent = '¡Gracias por suscribirte!';
                        newsletterForm.parentNode.appendChild(success);

                        setTimeout(() => {
                            success.style.opacity = '0';
                            setTimeout(() => success.remove(), 300);
                        }, 3000);
                    }, 1000);
                }
            });
        }
    }
});
