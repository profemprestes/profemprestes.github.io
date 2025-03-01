// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Enhanced subjects data with more details
const subjects = [{
        id: 1,
        title: 'Programación Web',
        category: 'programming',
        icon: 'fas fa-globe',
        description: 'Desarrollo de aplicaciones web modernas usando HTML, CSS y JavaScript.',
        details: 'Aprende los fundamentos y técnicas avanzadas del desarrollo web.',
        duration: '4 meses',
        level: 'Intermedio',
        students: 120,
        topics: [
            'HTML5 y CSS3',
            'JavaScript moderno',
            'Frameworks frontend',
            'APIs y backend'
        ]
    },
    {
        id: 2,
        title: 'Bases de Datos SQL',
        category: 'databases',
        icon: 'fas fa-database',
        description: 'Diseño y gestión de bases de datos relacionales con SQL.',
        details: 'Domina el lenguaje SQL y la administración de bases de datos.',
        duration: '3 meses',
        level: 'Todos los niveles',
        students: 85,
        topics: [
            'Modelado de datos',
            'SQL avanzado',
            'Optimización',
            'Administración'
        ]
    },
    {
        id: 3,
        title: 'Robótica Básica',
        category: 'robotics',
        icon: 'fas fa-robot',
        description: 'Introducción a la robótica y automatización.',
        details: 'Construye y programa robots usando tecnologías modernas.',
        duration: '3 meses',
        level: 'Básico',
        students: 50,
        topics: [
            'Introducción a la robótica',
            'Programación de robots',
            'Sensores y actuadores',
            'Proyectos de robótica'
        ]
    },
    {
        id: 4,
        title: 'Linux y Sistemas Operativos',
        category: 'systems',
        icon: 'fas fa-desktop',
        description: 'Fundamentos de sistemas operativos y administración Linux.',
        details: 'Aprende a administrar sistemas Linux y Windows.',
        duration: '4 meses',
        level: 'Intermedio',
        students: 100,
        topics: [
            'Introducción a Linux',
            'Administración de sistemas',
            'Seguridad y redes',
            'Servicios y aplicaciones'
        ]
    },
    // Add more subjects as needed
];

// UTU Subjects data
const utuSubjects = [{
        id: 'utu1',
        title: 'Programación III',
        level: 'Tercer Año',
        icon: 'fas fa-code',
        description: 'Desarrollo de software avanzado con Java y patrones de diseño.'
    },
    {
        id: 'utu2',
        title: 'Base de Datos II',
        level: 'Segundo Año',
        icon: 'fas fa-database',
        description: 'Diseño avanzado de bases de datos y optimización.'
    },
    {
        id: 'utu3',
        title: 'Sistemas Operativos',
        level: 'Primer Año',
        icon: 'fas fa-laptop-code',
        description: 'Fundamentos de sistemas operativos y virtualización.'
    }
];

// Render enhanced subject cards
const renderSubjects = (category = 'all') => {
        const grid = document.getElementById('subjects-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const filteredSubjects = category === 'all' ?
            subjects :
            subjects.filter(s => s.category === category);

        filteredSubjects.forEach((subject, index) => {
                    const card = document.createElement('div');
                    card.className = 'subject-card';
                    card.setAttribute('data-aos', 'fade-up');
                    card.setAttribute('data-aos-delay', (index * 100).toString());

                    card.innerHTML = `
      <div class="subject-category ${subject.category}">
        <i class="${subject.icon}"></i>
        <span>${getCategoryName(subject.category)}</span>
      </div>
      
      <h3 class="text-xl font-semibold mb-4">${subject.title}</h3>
      <p class="text-gray-600 mb-4">${subject.description}</p>
      
      <div class="subject-stats">
        <div class="stat-item">
          <div class="stat-value">${subject.duration}</div>
          <div class="stat-label">Duración</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${subject.level}</div>
          <div class="stat-label">Nivel</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${subject.students}</div>
          <div class="stat-label">Estudiantes</div>
        </div>
      </div>
      
      <div class="subject-actions">
        <a href="/materias/${subject.id}.html" class="subject-btn primary">
          <i class="fas fa-book"></i>
          <span>Ver detalles</span>
        </a>
        <button class="subject-btn secondary" onclick="showSubjectPreview(${subject.id})">
          <i class="fas fa-eye"></i>
          <span>Vista previa</span>
        </button>
      </div>
      
      <div class="subject-preview" id="preview-${subject.id}" style="display: none;">
        <h4 class="font-semibold mb-2">Temas principales:</h4>
        <ul class="list-disc list-inside space-y-1">
          ${subject.topics.map(topic => `<li>${topic}</li>`).join('')}
        </ul>
      </div>
    `;
    
    grid.appendChild(card);
  });
};

// Helper function to get category display name
const getCategoryName = (category) => {
  const names = {
    programming: 'Programación',
    databases: 'Bases de Datos',
    robotics: 'Robótica',
    systems: 'Sistemas'
  };
  return names[category] || category;
};

// Toggle subject preview
const showSubjectPreview = (subjectId) => {
  const preview = document.getElementById(`preview-${subjectId}`);
  if (!preview) return;
  
  const isHidden = preview.style.display === 'none';
  
  // Hide all previews first
  document.querySelectorAll('.subject-preview').forEach(p => {
    p.style.display = 'none';
  });
  
  if (isHidden) {
    preview.style.display = 'block';
    preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

// Render UTU subjects
const renderUTUSubjects = () => {
  const grid = document.getElementById('utu-subjects');
  if (!grid) return;

  utuSubjects.forEach((subject, index) => {
    const card = document.createElement('div');
    card.className = 'utu-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
      <div class="utu-icon">
        <i class="${subject.icon}"></i>
      </div>
      <div class="utu-content">
        <h3 class="utu-title">${subject.title}</h3>
        <span class="utu-level">${subject.level}</span>
        <p class="utu-description">${subject.description}</p>
      </div>
    `;
    
    grid.appendChild(card);
  });
};

// Filter functionality
const initializeFilters = () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter subjects
      const category = btn.dataset.filter;
      renderSubjects(category);
    });
  });
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderSubjects();
  renderUTUSubjects();
  initializeFilters();
});