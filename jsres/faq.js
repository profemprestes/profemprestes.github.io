// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// FAQ Data
const faqData = [
  {
    category: 'courses',
    question: '¿Cómo me inscribo en los cursos?',
    answer: 'Para inscribirte, simplemente visita la sección de cursos, selecciona el curso de tu interés y haz clic en el botón "Inscribirse". Sigue las instrucciones para completar tu registro.'
  },
  {
    category: 'materials',
    question: '¿Los materiales tienen costo?',
    answer: 'Los materiales básicos son gratuitos para todos los estudiantes inscritos. Algunos recursos avanzados o especializados pueden tener un costo adicional.'
  },
  {
    category: 'technical',
    question: '¿Qué requisitos técnicos necesito?',
    answer: 'Necesitarás una computadora con conexión a Internet, navegador web actualizado y espacio en disco para software específico según el curso.'
  },
  {
    category: 'courses',
    question: '¿Ofrecen cursos avanzados de programación?',
    answer: 'Sí, ofrecemos varios niveles de cursos de programación, desde principiantes hasta avanzados, incluyendo desarrollo web, móvil y backends.'
  },
  {
    category: 'materials',
    question: '¿En qué formatos están disponibles los materiales?',
    answer: 'Los materiales están disponibles en múltiples formatos: PDF, videos, presentaciones interactivas y código fuente descargable.'
  },
  {
    category: 'certificates',
    question: '¿Las certificaciones son válidas internacionalmente?',
    answer: 'Nuestras certificaciones son reconocidas por importantes empresas del sector tecnológico y pueden ser validadas digitalmente.'
  },
  {
    category: 'platform',
    question: '¿Cómo recupero mi contraseña?',
    answer: 'Puedes recuperar tu contraseña haciendo clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión y siguiendo las instrucciones enviadas a tu email.'
  }
];

// Render FAQ items
const renderFAQs = (category = 'all') => {
  const container = document.getElementById('faq-container');
  container.innerHTML = '';
  
  const filteredFAQs = category === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === category);
  
  filteredFAQs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index * 100).toString());
    
    item.innerHTML = `
      <div class="faq-question">
        <span>${faq.question}</span>
        <i class="fas fa-chevron-down transform transition-transform duration-300"></i>
      </div>
      <div class="faq-answer">
        <p class="text-gray-600">${faq.answer}</p>
      </div>
    `;
    
    container.appendChild(item);
  });
};

// Filter functionality
document.querySelectorAll('.filter-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    renderFAQs(category);
  });
});

// FAQ Search functionality
const searchFAQ = (query) => {
  const normalizedQuery = query.toLowerCase();
  
  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(normalizedQuery) ||
    faq.answer.toLowerCase().includes(normalizedQuery)
  );
  
  const container = document.getElementById('faq-container');
  container.innerHTML = '';
  
  if (filteredFAQs.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        No se encontraron resultados para "${query}"
      </div>
    `;
    return;
  }
  
  filteredFAQs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index * 100).toString());
    
    item.innerHTML = `
      <div class="faq-question">
        <span>${faq.question}</span>
        <i class="fas fa-chevron-down transform transition-transform duration-300"></i>
      </div>
      <div class="faq-answer">
        <p class="text-gray-600">${faq.answer}</p>
      </div>
    `;
    
    container.appendChild(item);
  });
};

// Search input handler
const searchInput = document.getElementById('faq-search');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = e.target.value.trim();
    if (query) {
      searchFAQ(query);
    } else {
      renderFAQs('all');
    }
  }, 300);
});

// Toggle FAQ answers
document.addEventListener('click', (e) => {
  const question = e.target.closest('.faq-question');
  if (!question) return;
  
  const item = question.closest('.faq-item');
  const icon = question.querySelector('i');
  
  item.classList.toggle('active');
  icon.style.transform = item.classList.contains('active') 
    ? 'rotate(180deg)' 
    : 'rotate(0)';
});

// Form submission handler
document.getElementById('quick-contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Add your form submission logic here
  alert('Formulario enviado con éxito!');
  e.target.reset();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderFAQs();
});