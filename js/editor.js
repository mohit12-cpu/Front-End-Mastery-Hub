// Cache DOM elements
const htmlEditor = document.getElementById('html-code');
const cssEditor = document.getElementById('css-code');
const jsEditor = document.getElementById('js-code');
const previewFrame = document.getElementById('preview-frame');
const runCodeBtn = document.getElementById('run-code');

// Cache panels and tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.editor-panel');

// Editor Tabs Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add click event to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(`editor-${tabName}`).classList.add('active');
        });
    });
    
    // Run code button functionality
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', runCode);
    }
    
    // Run code on initial load
    runCode();
    
    // Load saved code if exists
    loadSavedCode();
    
    // Set up auto-save
    setupAutoSave();
    
    // Set up auto-run
    setupAutoRun();
    
    // Add syntax highlighting
    setupSyntaxHighlighting();
});

// Run Code Function
function runCode() {
    if (!htmlEditor || !cssEditor || !jsEditor || !previewFrame) return;
    
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    const jsCode = jsEditor.value;
    
    const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
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
}

// Auto-run code when user stops typing
let typingTimer;
const doneTypingInterval = 1000;

function setupAutoRun() {
    const codeEditors = [htmlEditor, cssEditor, jsEditor].filter(editor => editor);
    
    codeEditors.forEach(editor => {
        editor.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(runCode, doneTypingInterval);
        });
        
        editor.addEventListener('keydown', () => {
            clearTimeout(typingTimer);
        });
    });
}

// Load saved code from localStorage
function loadSavedCode() {
    if (htmlEditor) {
        const savedHtml = localStorage.getItem('editorHtmlCode');
        if (savedHtml) htmlEditor.value = savedHtml;
    }
    
    if (cssEditor) {
        const savedCss = localStorage.getItem('editorCssCode');
        if (savedCss) cssEditor.value = savedCss;
    }
    
    if (jsEditor) {
        const savedJs = localStorage.getItem('editorJsCode');
        if (savedJs) jsEditor.value = savedJs;
    }
}

// Set up auto-save to localStorage
function setupAutoSave() {
    if (htmlEditor) {
        htmlEditor.addEventListener('input', () => {
            localStorage.setItem('editorHtmlCode', htmlEditor.value);
        });
    }
    
    if (cssEditor) {
        cssEditor.addEventListener('input', () => {
            localStorage.setItem('editorCssCode', cssEditor.value);
        });
    }
    
    if (jsEditor) {
        jsEditor.addEventListener('input', () => {
            localStorage.setItem('editorJsCode', jsEditor.value);
        });
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
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
    const codeEditors = [htmlEditor, cssEditor, jsEditor].filter(editor => editor);
    codeEditors.forEach(editor => {
        editor.addEventListener('input', highlightCode);
    });
}