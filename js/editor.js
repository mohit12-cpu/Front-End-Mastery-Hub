// Editor Tabs Functionality using event delegation
document.addEventListener('DOMContentLoaded', () => {
    // Add syntax highlighting
    setupSyntaxHighlighting();
});

// Use event delegation for tab switching
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
        e.preventDefault();
        const tab = e.target;
        const tabName = tab.dataset.tab;
        const container = tab.closest('.editor-container');
        
        if (container) {
            // Remove active class from all tabs and panels in this container
            container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            container.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            
            // Find the panel ID by looking for the lesson ID in the container
            let panelId = `editor-${tabName}`;
            
            // If we can find a lesson ID from a run button, use it
            const runButton = container.querySelector('[data-run-code]');
            if (runButton) {
                const lessonId = runButton.getAttribute('data-run-code');
                if (lessonId) {
                    panelId = `editor-${tabName}-${lessonId}`;
                }
            }
            
            const panel = container.querySelector(`#${panelId}`);
            if (panel) {
                panel.classList.add('active');
            } else {
                // Fallback to generic panel selector
                const genericPanel = container.querySelector(`.editor-panel[data-tab="${tabName}"]`) || 
                                   container.querySelector(`.editor-panel[id*="${tabName}"]`);
                if (genericPanel) {
                    genericPanel.classList.add('active');
                }
            }
        }
    }
});

// Run Code Function
// This function now delegates to the courseManager's runCode function to avoid conflicts
function runCode(lessonId) {
    // Delegate to courseManager if available
    if (typeof courseManager !== 'undefined' && typeof courseManager.runCode === 'function') {
        courseManager.runCode(lessonId);
    } else {
        console.warn('courseManager not available, using fallback runCode');
        // Fallback implementation if courseManager is not available
        fallbackRunCode(lessonId);
    }
}

// Fallback runCode implementation
function fallbackRunCode(lessonId) {
    // If no lessonId provided, try to find the active editor
    if (!lessonId) {
        // Try to find lessonId from the context (e.g., from a button with data-run-code attribute)
        const runButtons = document.querySelectorAll('[data-run-code]');
        for (const button of runButtons) {
            if (button.closest('.editor-container')) {
                lessonId = button.getAttribute('data-run-code');
                break;
            }
        }
        
        // If still no lessonId, try to find from active preview frame
        if (!lessonId) {
            const previewFrames = document.querySelectorAll('iframe[id^="preview-frame-"]');
            for (const frame of previewFrames) {
                if (frame.style.display !== 'none') {
                    const id = frame.id.replace('preview-frame-', '');
                    if (id) {
                        lessonId = id;
                        break;
                    }
                }
            }
        }
    }
    
    // If still no lessonId, we can't run the code
    if (!lessonId) {
        console.warn('No lessonId provided for runCode function');
        return;
    }
    
    // Get editors and preview frame for this lesson
    const htmlEditor = document.getElementById(`html-code-${lessonId}`);
    const cssEditor = document.getElementById(`css-code-${lessonId}`);
    const jsEditor = document.getElementById(`js-code-${lessonId}`);
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    const previewFrame = document.getElementById(`preview-frame-${lessonId}`);
    
    // If we have a Python editor, handle it specially
    if (pythonEditor && previewFrame) {
        runPythonCode(lessonId);
        return;
    }
    
    // For HTML/CSS/JS editors
    if (previewFrame) {
        const htmlCode = htmlEditor ? htmlEditor.value : '';
        const cssCode = cssEditor ? cssEditor.value : '';
        const jsCode = jsEditor ? jsEditor.value : '';
        
        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        
        try {
            previewDocument.open();
            previewDocument.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}</script>
                </body>
                </html>
            `);
            previewDocument.close();
        } catch (error) {
            console.error('Error running code:', error);
            previewDocument.open();
            previewDocument.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                        .error { color: #d32f2f; background: #ffebee; padding: 15px; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h2>Error running code</h2>
                        <p>${error.message || 'An unknown error occurred'}</p>
                    </div>
                </body>
                </html>
            `);
            previewDocument.close();
        }
    }
}

// Run Python Code Function
// This function now delegates to the courseManager's runPythonCode function to avoid conflicts
function runPythonCode(lessonId) {
    // Delegate to courseManager if available
    if (typeof courseManager !== 'undefined' && typeof courseManager.runPythonCode === 'function') {
        // Get the python code from the editor
        const pythonEditor = document.getElementById(`python-code-${lessonId}`);
        if (pythonEditor) {
            const pythonCode = pythonEditor.value;
            const previewFrame = document.getElementById(`preview-frame-${lessonId}`);
            if (previewFrame) {
                const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
                courseManager.runPythonCode(lessonId, pythonCode, previewDocument);
            }
        }
    } else {
        console.warn('courseManager not available, using fallback runPythonCode');
        // Fallback implementation if courseManager is not available
        fallbackRunPythonCode(lessonId);
    }
}

// Fallback runPythonCode implementation
function fallbackRunPythonCode(lessonId) {
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    const previewFrame = document.getElementById(`preview-frame-${lessonId}`);
    
    if (pythonEditor && previewFrame) {
        const pythonCode = pythonEditor.value;
        
        // In a real implementation, this would send the code to a Python interpreter
        // For now, we'll just display the code in the preview
        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        
        previewDocument.open();
        previewDocument.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Python Code Output</title>
                <style>
                    body { font-family: monospace; padding: 20px; background: #f5f5f5; }
                    pre { background: white; padding: 15px; border-radius: 5px; overflow-x: auto; }
                    .output { margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h2>Python Code:</h2>
                <pre>${pythonCode}</pre>
                <div class="output">
                    <h3>Output:</h3>
                    <p><em>Note: This is a simulation. In a real environment, this code would be executed by a Python interpreter.</em></p>
                    <p>Output would appear here...</p>
                </div>
            </body>
            </html>
        `);
        previewDocument.close();
    }
}

// Auto-run code when user stops typing
function setupAutoRun(lessonId) {
    let typingTimer;
    const doneTypingInterval = 1000;
    
    // Get editors for this lesson
    const htmlEditor = document.getElementById(`html-code-${lessonId}`);
    const cssEditor = document.getElementById(`css-code-${lessonId}`);
    const jsEditor = document.getElementById(`js-code-${lessonId}`);
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    
    const codeEditors = [htmlEditor, cssEditor, jsEditor, pythonEditor].filter(editor => editor);
    
    codeEditors.forEach(editor => {
        editor.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => runCode(lessonId), doneTypingInterval);
        });
        
        editor.addEventListener('keydown', () => {
            clearTimeout(typingTimer);
        });
    });
}

// Load saved code from localStorage
function loadSavedCode(lessonId) {
    // Get editors for this lesson
    const htmlEditor = document.getElementById(`html-code-${lessonId}`);
    const cssEditor = document.getElementById(`css-code-${lessonId}`);
    const jsEditor = document.getElementById(`js-code-${lessonId}`);
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    
    if (htmlEditor) {
        const savedHtml = localStorage.getItem(`editorHtmlCode-${lessonId}`);
        if (savedHtml) htmlEditor.value = savedHtml;
    }
    
    if (cssEditor) {
        const savedCss = localStorage.getItem(`editorCssCode-${lessonId}`);
        if (savedCss) cssEditor.value = savedCss;
    }
    
    if (jsEditor) {
        const savedJs = localStorage.getItem(`editorJsCode-${lessonId}`);
        if (savedJs) jsEditor.value = savedJs;
    }
    
    if (pythonEditor) {
        const savedPython = localStorage.getItem(`editorPythonCode-${lessonId}`);
        if (savedPython) pythonEditor.value = savedPython;
    }
}

// Set up auto-save to localStorage
function setupAutoSave(lessonId) {
    // Get editors for this lesson
    const htmlEditor = document.getElementById(`html-code-${lessonId}`);
    const cssEditor = document.getElementById(`css-code-${lessonId}`);
    const jsEditor = document.getElementById(`js-code-${lessonId}`);
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    
    if (htmlEditor) {
        htmlEditor.addEventListener('input', () => {
            localStorage.setItem(`editorHtmlCode-${lessonId}`, htmlEditor.value);
        });
    }
    
    if (cssEditor) {
        cssEditor.addEventListener('input', () => {
            localStorage.setItem(`editorCssCode-${lessonId}`, cssEditor.value);
        });
    }
    
    if (jsEditor) {
        jsEditor.addEventListener('input', () => {
            localStorage.setItem(`editorJsCode-${lessonId}`, jsEditor.value);
        });
    }
    
    if (pythonEditor) {
        pythonEditor.addEventListener('input', () => {
            localStorage.setItem(`editorPythonCode-${lessonId}`, pythonEditor.value);
        });
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        // Try to find the active lesson ID
        let lessonId = null;
        const activeEditor = document.querySelector('.editor-container');
        if (activeEditor) {
            const runButton = activeEditor.querySelector('[data-run-code]');
            if (runButton) {
                lessonId = runButton.getAttribute('data-run-code');
            }
        }
        runCode(lessonId);
    }
    
    // Ctrl + S to save code
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Code is automatically saved to localStorage on input
        showSaveNotification();
    }
});

// Show save notification
function showSaveNotification() {
    // Check if notification already exists
    if (document.getElementById('save-notification')) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'save-notification';
    notification.textContent = 'Code saved successfully!';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4ade80';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Set up syntax highlighting with Prism.js
function setupSyntaxHighlighting() {
    // This would normally be handled by Prism.js automatically
    // But we can add a manual highlight function if needed
    const highlightCode = () => {
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    };
    
    // Run highlight on initial load
    highlightCode();
    
    // Run highlight when code changes
    // We'll trigger this manually when needed
}

// Reset code editor
function resetCode(lessonId) {
    // Get editors for this lesson
    const htmlEditor = document.getElementById(`html-code-${lessonId}`);
    const cssEditor = document.getElementById(`css-code-${lessonId}`);
    const jsEditor = document.getElementById(`js-code-${lessonId}`);
    const pythonEditor = document.getElementById(`python-code-${lessonId}`);
    
    // Clear editor contents
    if (htmlEditor) htmlEditor.value = '';
    if (cssEditor) cssEditor.value = '';
    if (jsEditor) jsEditor.value = '';
    if (pythonEditor) pythonEditor.value = '';
    
    // Clear saved code
    if (htmlEditor) localStorage.removeItem(`editorHtmlCode-${lessonId}`);
    if (cssEditor) localStorage.removeItem(`editorCssCode-${lessonId}`);
    if (jsEditor) localStorage.removeItem(`editorJsCode-${lessonId}`);
    if (pythonEditor) localStorage.removeItem(`editorPythonCode-${lessonId}`);
    
    // Run code to update preview
    runCode(lessonId);
}