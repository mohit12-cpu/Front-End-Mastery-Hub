// User identification system using cookies

// Get user ID for personalized data storage
function getUserId() {
    // Try to get existing user ID from cookie
    let userId = getCookie('userId');
    
    // If no user ID exists, create a new one
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        // Store user ID in cookie for 365 days
        setCookie('userId', userId, 365);
    }
    
    return userId;
}

// Set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Export functions for global use
window.User = {
    getUserId,
    setCookie,
    getCookie
};