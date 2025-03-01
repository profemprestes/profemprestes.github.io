// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// News data
const newsData = [
  {
    id: 1,
    category: 'technology',
    date: '15 de Marzo, 2024',
    title: 'Nuevas Tecnologías en Educación',
    excerpt: 'Descubre las últimas tendencias en tecnología educativa y cómo están transformando el aprendizaje.',
    image: 'https://source.unsplash.com/random/800x600?education+technology',
    content: `
      <h2 class="text-2xl font-bold mb-4">Nuevas Tecnologías en Educación</h2>
      <p class="mb-4">La tecnología está revolucionando la forma en que enseñamos y aprendemos...</p>
      <h3 class="text-xl font-semibold mb-3">Principales tendencias:</h3>
      <ul class="list-disc list-inside mb-4">
        <li>Realidad Virtual en el aula</li>
        <li>Inteligencia Artificial para aprendizaje personalizado</li>
        <li>Plataformas colaborativas</li>
      </ul>
      <p>Sigue leyendo para conocer más sobre estas innovaciones...</p>
    `
  },
  {
    id: 2,
    category: 'programming',
    date: '12 de Marzo, 2024',
    title: 'El Auge de Python en la Educación',
    excerpt: 'Python se consolida como el lenguaje preferido para enseñar programación. Conoce las razones.',
    image: 'https://source.unsplash.com/random/800x600?python+coding',
    content: `
      <h2 class="text-2xl font-bold mb-4">El Auge de Python en la Educación</h2>
      <p class="mb-4">Python se ha convertido en el lenguaje de programación más popular para principiantes...</p>
      <h3 class="text-xl font-semibold mb-3">Ventajas de Python:</h3>
      <ul class="list-disc list-inside mb-4">
        <li>Sintaxis clara y legible</li>
        <li>Gran comunidad de desarrollo</li>
        <li>Múltiples aplicaciones</li>
      </ul>
      <p>Descubre cómo Python está cambiando la enseñanza de la programación...</p>
    `
  }
  // Add more news items as needed
];

// Render news cards
const renderNews = (category = 'all') => {
  const container = document.getElementById('news-container');
  if (!container) return;

  container.innerHTML = '';
  
  const filteredNews = category === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === category);
  
  filteredNews.forEach((news, index) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
      <div class="news-image">
        <img src="${news.image}" alt="${news.title}">
        <span class="news-category ${news.category}">${getCategoryName(news.category)}</span>
      </div>
      <div class="news-content">
        <div class="news-date">${news.date}</div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <button class="news-link" onclick="showNewsModal(${news.id})">
          <span>Leer más</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
};

// Helper function to get category display name
const getCategoryName = (category) => {
  const names = {
    technology: 'Tecnología',
    education: 'Educación',
    programming: 'Programación',
    robotics: 'Robótica'
  };
  return names[category] || category;
};

// Modal functionality
const modal = document.getElementById('news-modal');
const showNewsModal = (newsId) => {
  const news = newsData.find(n => n.id === newsId);
  if (!news || !modal) return;
  
  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = news.content;
  
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  
  modal.classList.remove('active');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
};

// Event listeners
document.querySelector('.modal-close')?.addEventListener('click', closeModal);

modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    renderNews(category);
  });
});

// Search functionality
const searchNews = (query) => {
  const normalizedQuery = query.toLowerCase();
  
  const filteredNews = newsData.filter(news => 
    news.title.toLowerCase().includes(normalizedQuery) ||
    news.excerpt.toLowerCase().includes(normalizedQuery)
  );
  
  const container = document.getElementById('news-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (filteredNews.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500 col-span-full">
        No se encontraron noticias para "${query}"
      </div>
    `;
    return;
  }
  
  filteredNews.forEach((news, index) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
      <div class="news-image">
        <img src="${news.image}" alt="${news.title}">
        <span class="news-category ${news.category}">${getCategoryName(news.category)}</span>
      </div>
      <div class="news-content">
        <div class="news-date">${news.date}</div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <button class="news-link" onclick="showNewsModal(${news.id})">
          <span>Leer más</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
};

// Search input handler
const searchInput = document.getElementById('news-search');
let searchTimeout;

searchInput?.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = e.target.value.trim();
    if (query) {
      searchNews(query);
    } else {
      renderNews('all');
    }
  }, 300);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderNews();
});