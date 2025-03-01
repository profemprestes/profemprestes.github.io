document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Table of Contents functionality
  const tocLinks = document.querySelectorAll('#privacyToc a');
  const sections = document.querySelectorAll('.privacy-section');
  
  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section tracking
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 150) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });

  // Cookie management
  const cookieButtons = {
    accept: document.getElementById('acceptCookies'),
    reject: document.getElementById('rejectCookies'),
    configure: document.getElementById('configureCookies')
  };

  if (cookieButtons.accept && cookieButtons.reject && cookieButtons.configure) {
    cookieButtons.accept.addEventListener('click', () => {
      setCookiePreferences('all');
      showCookieNotification('success', 'Has aceptado todas las cookies');
    });

    cookieButtons.reject.addEventListener('click', () => {
      setCookiePreferences('essential');
      showCookieNotification('info', 'Solo se usarán cookies esenciales');
    });

    cookieButtons.configure.addEventListener('click', () => {
      showCookieConfiguration();
    });
  }

  function setCookiePreferences(type) {
    // Store cookie preferences
    localStorage.setItem('cookiePreferences', type);
    
    // Implement actual cookie management here
    if (type === 'all') {
      // Enable all cookies
      console.log('Todas las cookies habilitadas');
    } else {
      // Disable non-essential cookies
      console.log('Solo cookies esenciales habilitadas');
    }
  }

  function showCookieNotification(icon, text) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: icon,
        title: 'Preferencias de Cookies',
        text: text,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    } else {
      // Fallback if SweetAlert is not available
      alert(text);
    }
  }

  function showCookieConfiguration() {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Configuración de Cookies',
        html: `
          <div class="cookie-config">
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="essentialCookies" checked disabled>
                <span>Cookies Esenciales</span>
              </label>
              <p>Necesarias para el funcionamiento del sitio</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="preferenceCookies">
                <span>Cookies de Preferencias</span>
              </label>
              <p>Guardan tus preferencias de navegación</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="analyticsCookies">
                <span>Cookies Analíticas</span>
              </label>
              <p>Nos ayudan a mejorar el sitio</p>
            </div>
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="marketingCookies">
                <span>Cookies de Marketing</span>
              </label>
              <p>Utilizadas para mostrarte anuncios relevantes</p>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Preferencias',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'cookie-config-popup'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const preferences = {
            essential: true, // Always enabled
            preference: document.getElementById('preferenceCookies').checked,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked
          };
          
          // Store preferences
          localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
          
          showCookieNotification('success', 'Preferencias guardadas correctamente');
        }
      });
    } else {
      // Fallback if SweetAlert is not available
      alert('La configuración de cookies no está disponible en este momento.');
    }
  }

  // Check if first visit or if cookie preferences are not set
  if (!localStorage.getItem('cookiePreferences')) {
    // Wait a moment before showing the cookie notice
    setTimeout(() => {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: '🍪 Uso de Cookies',
          text: 'Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas todas las cookies?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Aceptar Todas',
          cancelButtonText: 'Configurar',
          showDenyButton: true,
          denyButtonText: 'Solo Esenciales'
        }).then((result) => {
          if (result.isConfirmed) {
            setCookiePreferences('all');
            showCookieNotification('success', 'Has aceptado todas las cookies');
          } else if (result.isDenied) {
            setCookiePreferences('essential');
            showCookieNotification('info', 'Solo se usarán cookies esenciales');
          } else {
            showCookieConfiguration();
          }
        });
      }
    }, 1500);
  }
});