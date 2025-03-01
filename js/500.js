document.addEventListener('DOMContentLoaded', () => {
  const countdownDisplay = document.getElementById('countdown');
  const autoReloadElement = document.querySelector('.auto-reload');

  if (countdownDisplay && autoReloadElement) {
    // Auto reload countdown
    let countdown = 10;
    
    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.reload();
      } else {
        countdownDisplay.textContent = countdown;
      }
    }, 1000);

    // Cancel auto reload if user interacts with the page
    document.addEventListener('click', () => {
      clearInterval(timer);
      autoReloadElement.innerHTML = '<p>Recarga automática cancelada. Puedes recargar manualmente usando los botones de arriba.</p>';
    });
  }

  // Report error to analytics
  function reportError() {
    // Here you would typically send error details to your analytics service
    console.log('500 error reported');
  }

  // Check server status periodically
  async function checkServerStatus() {
    try {
      const response = await fetch('/api/status');
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      // Server still down, try again in 30 seconds
      setTimeout(checkServerStatus, 30000);
    }
  }

  // Start status check after initial delay
  setTimeout(checkServerStatus, 5000);

  // Report initial error
  reportError();
});