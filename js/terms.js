document.addEventListener('DOMContentLoaded', () => {
  // Table of Contents functionality
  const tocLinks = document.querySelectorAll('#termsToc a');
  const sections = document.querySelectorAll('.terms-section');
  
  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
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
      
      if (pageYOffset >= sectionTop - 150) {
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

  // Check for terms acceptance
  const hasAcceptedTerms = localStorage.getItem('termsAccepted');
  
  if (!hasAcceptedTerms) {
    Swal.fire({
      title: 'Términos de Servicio',
      text: 'Por favor, lee y acepta nuestros términos de servicio para continuar.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Acepto',
      cancelButtonText: 'No acepto',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('termsAccepted', 'true');
        localStorage.setItem('termsAcceptedDate', new Date().toISOString());
        
        Swal.fire(
          '¡Gracias!',
          'Has aceptado los términos de servicio.',
          'success'
        );
      } else {
        Swal.fire(
          'Acceso Limitado',
          'Sin aceptar los términos, algunas funciones pueden estar limitadas.',
          'warning'
        );
      }
    });
  }

  // Check for terms updates
  const termsVersion = '1.0'; // Update this when terms change
  const userTermsVersion = localStorage.getItem('termsVersion');
  
  if (userTermsVersion && userTermsVersion !== termsVersion) {
    Swal.fire({
      title: 'Actualización de Términos',
      text: 'Nuestros términos de servicio han sido actualizados. Por favor, revísalos.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Ver Cambios',
      cancelButtonText: 'Más Tarde'
    }).then((result) => {
      if (result.isConfirmed) {
        // Scroll to updates section
        document.querySelector('#actualizaciones').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Store current terms version
  localStorage.setItem('termsVersion', termsVersion);
});