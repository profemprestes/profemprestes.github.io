document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('accept-cookies');

    // Verificar si el usuario ya ha aceptado las cookies
    if (localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'none'; // Ocultar el banner si ya se aceptaron las cookies
    }

    // Manejar el clic en el botón de aceptar
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true'); // Guardar la aceptación en localStorage
        cookieBanner.style.display = 'none'; // Ocultar el banner
    });
});