document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

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

  // Search functionality
  const searchInput = document.getElementById('termsSearch');
  const searchResults = document.getElementById('searchResults');
  const contentSections = document.querySelectorAll('.terms-section');
  
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', debounce(function() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (searchTerm.length < 3) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        
        // Remove any existing highlights
        removeHighlights();
        return;
      }
      
      // Search in content
      let results = [];
      let resultHTML = '';
      
      contentSections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.querySelector('h2').textContent;
        const sectionText = section.textContent.toLowerCase();
        
        if (sectionText.includes(searchTerm)) {
          results.push({
            id: sectionId,
            title: sectionTitle,
            text: getContextSnippet(section.innerHTML, searchTerm)
          });
        }
      });
      
      // Display results
      if (results.length > 0) {
        resultHTML = `<h3>Resultados de búsqueda (${results.length})</h3><ul>`;
        
        results.forEach(result => {
          resultHTML += `
            <li>
              <a href="#${result.id}" class="search-result-link">
                <strong>${result.title}</strong>
              </a>
              <p>${result.text}</p>
            </li>
          `;
        });
        
        resultHTML += '</ul>';
        searchResults.innerHTML = resultHTML;
        searchResults.classList.add('active');
        
        // Add click event to search result links
        const searchResultLinks = document.querySelectorAll('.search-result-link');
        searchResultLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
              // Highlight the search term in the target section
              highlightSearchTerm(targetSection, searchTerm);
              
              // Scroll to the section
              window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
              });
              
              // Close search results
              searchResults.classList.remove('active');
            }
          });
        });
      } else {
        searchResults.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        searchResults.classList.add('active');
        
        // Remove any existing highlights
        removeHighlights();
      }
    }, 300));
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }
  
  // Accept Terms Button
  const acceptTermsBtn = document.getElementById('acceptTermsBtn');
  
  if (acceptTermsBtn) {
    // Check if terms were already accepted
    const termsAccepted = localStorage.getItem('termsAccepted');
    
    if (termsAccepted === 'true') {
      acceptTermsBtn.classList.add('accepted');
      acceptTermsBtn.textContent = 'Términos Aceptados';
    }
    
    acceptTermsBtn.addEventListener('click', () => {
      // Store acceptance in localStorage
      localStorage.setItem('termsAccepted', 'true');
      localStorage.setItem('termsAcceptedDate', new Date().toISOString());
      
      // Update button appearance
      acceptTermsBtn.classList.add('accepted');
      acceptTermsBtn.textContent = 'Términos Aceptados';
      
      // Show confirmation
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: '¡Gracias!',
          text: 'Has aceptado los términos y condiciones.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } else {
        alert('Has aceptado los términos y condiciones.');
      }
    });
  }
  
  // Helper functions for search
  function debounce(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
  
  function getContextSnippet(html, searchTerm) {
    // Convert HTML to text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent;
    
    // Find the position of the search term
    const position = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    
    if (position === -1) return '';
    
    // Get a snippet of text around the search term
    const start = Math.max(0, position - 50);
    const end = Math.min(text.length, position + searchTerm.length + 50);
    let snippet = text.substring(start, end);
    
    // Add ellipsis if needed
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet += '...';
    
    // Highlight the search term
    const regex = new RegExp(searchTerm, 'gi');
    snippet = snippet.replace(regex, match => `<span class="highlight">${match}</span>`);
    
    return snippet;
  }
  
  function highlightSearchTerm(section, searchTerm) {
    // Remove any existing highlights first
    removeHighlights();
    
    // Create a text node walker to find text nodes
    const walker = document.createTreeWalker(
      section,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const regex = new RegExp(searchTerm, 'gi');
    const nodesToReplace = [];
    
    // Find all text nodes that contain the search term
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())) {
        nodesToReplace.push(node);
      }
    }
    
    // Replace text in the found nodes
    nodesToReplace.forEach(node => {
      const parent = node.parentNode;
      const content = node.nodeValue;
      const fragment = document.createDocumentFragment();
      
      let lastIndex = 0;
      let match;
      
      // Create a new regex for each node to reset the lastIndex
      const nodeRegex = new RegExp(searchTerm, 'gi');
      
      while ((match = nodeRegex.exec(content)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(content.substring(lastIndex, match.index)));
        }
        
        // Add the highlighted match
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = match[0];
        fragment.appendChild(span);
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add any remaining text
      if (lastIndex < content.length) {
        fragment.appendChild(document.createTextNode(content.substring(lastIndex)));
      }
      
      // Replace the original node with the fragment
      parent.replaceChild(fragment, node);
    });
  }
  
  function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      const textNode = document.createTextNode(highlight.textContent);
      parent.replaceChild(textNode, highlight);
      
      // Normalize to combine adjacent text nodes
      parent.normalize();
    });
  }
});
