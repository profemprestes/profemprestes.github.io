document.addEventListener('DOMContentLoaded', function() {
    // --- Table of Contents Functionality ---
    
    // Track active section during scroll
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    // Initialize highlight.js for code syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
    
    // Make TOC sticky on scroll
    const tocSection = document.querySelector('.toc-section');
    const courseHero = document.querySelector('.curso-hero');
    
    if (tocSection && courseHero) {
        window.addEventListener('scroll', function() {
            const heroBottom = courseHero.offsetTop + courseHero.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= heroBottom) {
                tocSection.classList.add('sticky');
            } else {
                tocSection.classList.remove('sticky');
            }
            
            // Highlight active TOC item based on scroll position
            let currentSectionId = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSectionId) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const tocHeight = tocSection.offsetHeight || 0;
                const scrollPosition = targetSection.offsetTop - tocHeight - 20;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // --- Code Block Functionality ---
    
    // Copy code button functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);
            
            if (codeElement) {
                // Create a temporary textarea to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = codeElement.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                // Change the button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
    
    // Edit code button functionality - shows a modal with editable code
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);
            
            if (codeElement) {
                // Create modal elements
                const modalOverlay = document.createElement('div');
                modalOverlay.classList.add('code-edit-modal');
                
                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');
                
                const closeButton = document.createElement('button');
                closeButton.classList.add('close-modal');
                closeButton.innerHTML = '&times;';
                
                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');
                modalHeader.innerHTML = '<h3>Editor de código</h3>';
                
                const textarea = document.createElement('textarea');
                textarea.classList.add('code-editor');
                textarea.value = codeElement.textContent;
                
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('modal-buttons');
                
                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Guardar cambios';
                
                const cancelButton = document.createElement('button');
                cancelButton.classList.add('cancel-button');
                cancelButton.textContent = 'Cancelar';
                
                const runButton = document.createElement('button');
                runButton.classList.add('run-button');
                runButton.innerHTML = '<i class="fas fa-play"></i> Ejecutar';
                
                // Assemble the modal
                buttonContainer.appendChild(saveButton);
                buttonContainer.appendChild(runButton);
                buttonContainer.appendChild(cancelButton);
                
                modalContent.appendChild(closeButton);
                modalContent.appendChild(modalHeader);
                modalContent.appendChild(textarea);
                modalContent.appendChild(buttonContainer);
                
                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);
                
                // Show the modal
                setTimeout(() => {
                    modalOverlay.classList.add('show');
                    textarea.focus();
                }, 10);
                
                // Close modal function
                const closeModal = () => {
                    modalOverlay.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modalOverlay);
                    }, 300);
                };
                
                // Event listeners for the modal
                closeButton.addEventListener('click', closeModal);
                cancelButton.addEventListener('click', closeModal);
                
                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === modalOverlay) {
                        closeModal();
                    }
                });
                
                // Save code changes
                saveButton.addEventListener('click', function() {
                    // Update the code
                    codeElement.textContent = textarea.value;
                    
                    // Rehighlight the code
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(codeElement);
                    }
                    
                    closeModal();
                });
                
                // Run code button - create a preview iframe
                runButton.addEventListener('click', function() {
                    const previewContainer = document.createElement('div');
                    previewContainer.classList.add('preview-container');
                    previewContainer.style.marginTop = '1rem';
                    previewContainer.style.border = '1px solid #ddd';
                    previewContainer.style.borderRadius = '4px';
                    
                    const previewHeader = document.createElement('div');
                    previewHeader.style.padding = '0.5rem';
                    previewHeader.style.backgroundColor = '#f5f5f5';
                    previewHeader.innerHTML = '<strong>Vista previa:</strong>';
                    
                    const iframe = document.createElement('iframe');
                    iframe.style.width = '100%';
                    iframe.style.height = '200px';
                    iframe.style.border = '1px solid #ddd';
                    iframe.style.backgroundColor = 'white';
                    
                    previewContainer.appendChild(previewHeader);
                    previewContainer.appendChild(iframe);
                    
                    // Check if preview already exists, remove if so
                    const existingPreview = modalContent.querySelector('.preview-container');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    // Add preview before buttons
                    modalContent.insertBefore(previewContainer, buttonContainer);
                    
                    // Write code to iframe
                    setTimeout(() => {
                        const doc = iframe.contentDocument || iframe.contentWindow.document;
                        doc.open();
                        doc.write(textarea.value);
                        doc.close();
                    }, 100);
                });
            }
        });
    });
    
    // --- Interactive Form Validation Demo ---
    
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                    isValid = false;
                    input.classList.add('invalid');
                } else if (input.hasAttribute('pattern') && input.value.trim()) {
                    const pattern = new RegExp(input.getAttribute('pattern'));
                    if (!pattern.test(input.value)) {
                        isValid = false;
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                } else {
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                // Simulate success
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Formulario válido';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Add success message
                const successMessage = document.createElement('div');
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '1rem';
                successMessage.style.fontWeight = '500';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> El formulario ha sido validado correctamente';
                
                // Remove existing message if any
                const existingMessage = demoForm.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                successMessage.classList.add('form-message');
                demoForm.appendChild(successMessage);
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    this.reset();
                    
                    // Fade out message
                    successMessage.style.transition = 'opacity 0.5s ease';
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 2000);
            } else {
                // Show error message
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error de validación';
                submitBtn.style.backgroundColor = '#e74c3c';
                
                // Add error message
                const errorMessage = document.createElement('div');
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.marginTop = '1rem';
                errorMessage.style.fontWeight = '500';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor completa correctamente todos los campos requeridos';
                
                // Remove existing message if any
                const existingMessage = demoForm.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                errorMessage.classList.add('form-message');
                demoForm.appendChild(errorMessage);
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    
                    // Fade out message
                    errorMessage.style.transition = 'opacity 0.5s ease';
                    errorMessage.style.opacity = '0';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 500);
                }, 2000);
            }
        });
        
        // Add input event listeners for real-time validation feedback
        const formInputs = demoForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove invalid class when user starts typing
                this.classList.remove('invalid');
            });
        });
    }
    
    // Helper function for email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // --- Volver Button Functionality ---
    
    const volverBtn = document.getElementById('volverBtn');
    if (volverBtn) {
        volverBtn.addEventListener('click', function() {
            window.location.href = 'materias.html';
        });
    }
    
    // --- Interactive Demonstrations ---
    
    // Make code snippets examples interactive
    document.querySelectorAll('.live-preview').forEach(preview => {
        const previewContent = preview.querySelector('.preview-container');
        
        // Find the closest code block
        const codeBlock = preview.previousElementSibling;
        if (codeBlock && codeBlock.classList.contains('code-container')) {
            const codeElement = codeBlock.querySelector('code');
            if (codeElement) {
                // Create a "Try it out" button
                const tryButton = document.createElement('button');
                tryButton.classList.add('try-button');
                tryButton.innerHTML = '<i class="fas fa-play"></i> Interactuar';
                tryButton.style.marginTop = '1rem';
                tryButton.style.padding = '0.5rem 1rem';
                tryButton.style.backgroundColor = '#4CAF50';
                tryButton.style.color = 'white';
                tryButton.style.border = 'none';
                tryButton.style.borderRadius = '4px';
                tryButton.style.cursor = 'pointer';
                
                previewContent.appendChild(tryButton);
                
                tryButton.addEventListener('click', function() {
                    // Create modal for interactive demo
                    const modalOverlay = document.createElement('div');
                    modalOverlay.classList.add('code-edit-modal');
                    modalOverlay.style.display = 'flex';
                    modalOverlay.style.justifyContent = 'center';
                    modalOverlay.style.alignItems = 'center';
                    modalOverlay.style.position = 'fixed';
                    modalOverlay.style.top = '0';
                    modalOverlay.style.left = '0';
                    modalOverlay.style.width = '100%';
                    modalOverlay.style.height = '100%';
                    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    modalOverlay.style.zIndex = '1000';
                    
                    const modalContent = document.createElement('div');
                    modalContent.classList.add('modal-content');
                    modalContent.style.backgroundColor = 'white';
                    modalContent.style.width = '80%';
                    modalContent.style.maxWidth = '800px';
                    modalContent.style.borderRadius = '8px';
                    modalContent.style.padding = '2rem';
                    modalContent.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                    modalContent.style.position = 'relative';
                    
                    const closeButton = document.createElement('button');
                    closeButton.classList.add('close-modal');
                    closeButton.innerHTML = '&times;';
                    closeButton.style.position = 'absolute';
                    closeButton.style.right = '1rem';
                    closeButton.style.top = '1rem';
                    closeButton.style.backgroundColor = 'transparent';
                    closeButton.style.border = 'none';
                    closeButton.style.fontSize = '1.5rem';
                    closeButton.style.cursor = 'pointer';
                    
                    const demoTitle = document.createElement('h3');
                    demoTitle.textContent = 'Demo Interactivo';
                    demoTitle.style.marginBottom = '1.5rem';
                    
                    const splitContainer = document.createElement('div');
                    splitContainer.style.display = 'flex';
                    splitContainer.style.gap = '1.5rem';
                    splitContainer.style.marginBottom = '1.5rem';
                    splitContainer.style.flexDirection = 'column';
                    
                    const codeEditor = document.createElement('div');
                    codeEditor.style.flex = '1';
                    
                    const editorLabel = document.createElement('h4');
                    editorLabel.textContent = 'Código:';
                    editorLabel.style.marginBottom = '0.5rem';
                    
                    const textarea = document.createElement('textarea');
                    textarea.value = codeElement.textContent;
                    textarea.style.width = '100%';
                    textarea.style.minHeight = '200px';
                    textarea.style.padding = '1rem';
                    textarea.style.fontFamily = 'monospace';
                    textarea.style.fontSize = '0.9rem';
                    textarea.style.border = '1px solid #ddd';
                    textarea.style.borderRadius = '4px';
                    
                    const previewSection = document.createElement('div');
                    previewSection.style.flex = '1';
                    
                    const previewLabel = document.createElement('h4');
                    previewLabel.textContent = 'Resultado:';
                    previewLabel.style.marginBottom = '0.5rem';
                    
                    const previewFrame = document.createElement('iframe');
                    previewFrame.style.width = '100%';
                    previewFrame.style.height = '200px';
                    previewFrame.style.border = '1px solid #ddd';
                    previewFrame.style.borderRadius = '4px';
                    
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Actualizar Vista Previa';
                    updateButton.style.padding = '0.75rem 1.5rem';
                    updateButton.style.backgroundColor = '#4CAF50';
                    updateButton.style.color = 'white';
                    updateButton.style.border = 'none';
                    updateButton.style.borderRadius = '4px';
                    updateButton.style.cursor = 'pointer';
                    
                    // Assemble the interactive demo
                    codeEditor.appendChild(editorLabel);
                    codeEditor.appendChild(textarea);
                    
                    previewSection.appendChild(previewLabel);
                    previewSection.appendChild(previewFrame);
                    
                    splitContainer.appendChild(codeEditor);
                    splitContainer.appendChild(updateButton);
                    splitContainer.appendChild(previewSection);
                    
                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(demoTitle);
                    modalContent.appendChild(splitContainer);
                    
                    modalOverlay.appendChild(modalContent);
                    document.body.appendChild(modalOverlay);
                    
                    // Function to update the preview
                    const updatePreview = () => {
                        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                        doc.open();
                        doc.write(textarea.value);
                        doc.close();
                    };
                    
                    // Initial preview
                    setTimeout(updatePreview, 100);
                    
                    // Update when button is clicked
                    updateButton.addEventListener('click', updatePreview);
                    
                    // Close modal event
                    closeButton.addEventListener('click', function() {
                        document.body.removeChild(modalOverlay);
                    });
                    
                    // Click outside to close
                    modalOverlay.addEventListener('click', function(e) {
                        if (e.target === modalOverlay) {
                            document.body.removeChild(modalOverlay);
                        }
                    });
                });
            }
        }
    });
    
    // Add CSS styles for interactive elements
    const interactiveStyles = document.createElement('style');
    interactiveStyles.textContent = `
        .code-edit-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .code-edit-modal.show {
            display: flex;
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            border-radius: 8px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            padding: 2rem;
            position: relative;
            overflow: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }
        
        .code-edit-modal.show .modal-content {
            transform: translateY(0);
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #555;
        }
        
        .modal-header {
            margin-bottom: 1.5rem;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .code-editor {
            width: 100%;
            height: 300px;
            margin-bottom: 1.5rem;
            padding: 1rem;
            font-family: monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            border: 1px solid #ddd;
            border-radius: 4px;
            resize: vertical;
        }
        
        .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .save-button, .cancel-button, .run-button {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .save-button {
            background-color: #4CAF50;
            color: white;
        }
        
        .save-button:hover {
            background-color: #43a047;
        }
        
        .run-button {
            background-color: #2196F3;
            color: white;
        }
        
        .run-button:hover {
            background-color: #1e88e5;
        }
        
        .cancel-button {
            background-color: #f1f1f1;
            color: #333;
        }
        
        .cancel-button:hover {
            background-color: #e1e1e1;
        }
        
        .try-button {
            transition: all 0.3s ease;
        }
        
        .try-button:hover {
            background-color: #43a047 !important;
            transform: translateY(-2px);
            box-shadow: 0 5px 10px rgba(76, 175, 80, 0.2);
        }
        
        input.invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
        }
        
        @media (min-width: 768px) {
            .splitContainer {
                flex-direction: row !important;
            }
        }
    `;
    document.head.appendChild(interactiveStyles);
    
    // Initialize any AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
});