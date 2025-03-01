document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for hero background
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#aa80ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                
                // Scroll element into view if it's not fully visible
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const isVisible = (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                    
                    if (!isVisible) {
                        const offset = 100; // Adjust based on your header height
                        const top = item.offsetTop - offset;
                        
                        window.scrollTo({
                            top,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const noResultsMessage = document.getElementById('noResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterFaqs);
        
        // Add clear button functionality when search has content
        searchInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                if (!document.querySelector('.search-clear')) {
                    const clearButton = document.createElement('button');
                    clearButton.className = 'search-clear';
                    clearButton.innerHTML = '<i class="fas fa-times"></i>';
                    clearButton.addEventListener('click', function() {
                        searchInput.value = '';
                        searchInput.focus();
                        filterFaqs();
                    });
                    
                    searchInput.parentNode.appendChild(clearButton);
                }
            } else {
                const clearButton = document.querySelector('.search-clear');
                if (clearButton) {
                    clearButton.remove();
                }
            }
        });
    }

    function filterFaqs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryButtons = document.querySelectorAll('.category-btn');
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        let hasVisibleItems = false;
        
        // Reset categories when searching
        if (searchTerm !== '' && activeCategory !== 'all') {
            categoryButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const category = item.getAttribute('data-category');
            
            // Handle category filtering
            const categoryMatch = activeCategory === 'all' || category === activeCategory;
            
            // Handle search term filtering
            const searchMatch = searchTerm === '' || 
                               question.includes(searchTerm) || 
                               answer.includes(searchTerm);
            
            if (categoryMatch && searchMatch) {
                item.style.display = '';
                hasVisibleItems = true;
                
                // Highlight matching text if searching
                if (searchTerm !== '') {
                    highlightText(item, searchTerm);
                } else {
                    // Remove highlights if search is empty
                    removeHighlights(item);
                }
            } else {
                item.style.display = 'none';
                // Remove highlights from hidden items
                removeHighlights(item);
            }
        });
        
        // Show/hide no results message
        if (hasVisibleItems) {
            noResultsMessage.style.display = 'none';
            document.querySelectorAll('.faq-category-heading').forEach(heading => {
                const categoryId = heading.id;
                const hasVisibleInCategory = Array.from(document.querySelectorAll(`.faq-item[data-category="${categoryId}"]`))
                    .some(item => item.style.display !== 'none');
                
                heading.style.display = hasVisibleInCategory ? '' : 'none';
            });
        } else {
            noResultsMessage.style.display = 'block';
            document.querySelectorAll('.faq-category-heading').forEach(heading => {
                heading.style.display = 'none';
            });
        }
    }

    // Function to highlight matching text
    function highlightText(item, searchTerm) {
        // First remove any existing highlights
        removeHighlights(item);
        
        // Then add new highlights
        const questionText = item.querySelector('.faq-question h3');
        const answerParagraphs = item.querySelectorAll('.faq-answer p, .faq-answer li');
        
        questionText.innerHTML = applyHighlight(questionText.textContent, searchTerm);
        
        answerParagraphs.forEach(paragraph => {
            paragraph.innerHTML = applyHighlight(paragraph.textContent, searchTerm);
        });
    }

    // Apply highlight to text
    function applyHighlight(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }

    // Remove highlights
    function removeHighlights(item) {
        const highlights = item.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            // Clean up any adjacent text nodes
            parent.normalize();
        });
    }

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter FAQs based on selected category
            const category = this.getAttribute('data-category');
            
            filterFaqs();
            
            // Clear search when changing categories
            searchInput.value = '';
            const clearButton = document.querySelector('.search-clear');
            if (clearButton) {
                clearButton.remove();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add styles for highlighted text
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(170, 128, 255, 0.2);
            padding: 0 2px;
            border-radius: 2px;
        }
        
        .search-clear {
            position: absolute;
            right: 3rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #aaa;
            cursor: pointer;
            padding: 5px;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        
        .search-clear:hover {
            color: #666;
        }
    `;
    document.head.appendChild(style);
});