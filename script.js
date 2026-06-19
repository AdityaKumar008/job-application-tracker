/* ==========================================================================
   01. GLOBAL APP LOGIC & ROUTING ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Dashboard Clock if the placeholder element exists
    if (document.getElementById('live-date')) {
        initDashboardClock();
    }
    
    // 2. Initialize Auth Tab Switching if auth elements exist
    if (document.querySelector('.auth-page') || document.getElementById('login-form')) {
        initAuthTabs();
    }

    // 3. Initialize Dashboard View Switching if sidebar elements exist
    if (document.getElementById('nav-settings')) {
        initDashboardNavigation();
    }
    
});

/* ==========================================================================
   02. AUTHENTICATION TAB SWITCHING (auth.html)
   ========================================================================== */

function initAuthTabs() {
    const loginTab = document.getElementById('tab-login');
    const signupTab = document.getElementById('tab-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Select the "Log In" or "Sign Up" text spans at the bottom of the forms
    const switchLinks = document.querySelectorAll('.auth-switch-text .link-span');

    if (!loginTab || !signupTab || !loginForm || !signupForm) return;

    // Switch to Sign Up View
    function showSignup() {
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }

    // Switch to Login View
    function showLogin() {
        signupTab.classList.remove('active');
        loginTab.classList.add('active');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }

    // Event listeners for top tab buttons
    signupTab.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    loginTab.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });

    // Event listeners for bottom text links
    switchLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (signupForm.classList.contains('hidden')) {
                showSignup();
            } else {
                showLogin();
            }
        });
    });

    // --- URL HASH DETECTION ---
    // Instantly checks if user arrived via index.html#login or index.html#signup
    const currentHash = window.location.hash;
    if (currentHash === '#login') {
        showLogin();
    } else if (currentHash === '#signup') {
        showSignup();
    }
}

/* ==========================================================================
   03. DASHBOARD WORKSPACE NAVIGATION VIEWS (dashboard.html)
   ========================================================================== */

function initDashboardNavigation() {
    const navDashboard = document.querySelector('.sidebar-menu ul li:nth-child(1) a');
    const navSettings = document.getElementById('nav-settings');
    
    // Core Layout Sections
    const statsContainer = document.querySelector('.stats-container');
    const filterUtilityBar = document.querySelector('.filter-utility-bar');
    const cardsGrid = document.querySelector('.cards-grid');
    const settingsContainer = document.querySelector('.settings-container');

    if (!navSettings || !settingsContainer) return;

    // Route Click Event to Open Settings Workspace View
    navSettings.addEventListener('click', (e) => {
        e.preventDefault();
        
        navDashboard.classList.remove('active');
        navSettings.classList.add('active');

        statsContainer.classList.add('class-hidden');
        filterUtilityBar.classList.add('class-hidden');
        cardsGrid.classList.add('class-hidden');
        settingsContainer.classList.remove('class-hidden');
    });

    // Route Click Event to Return back to Dashboard Main View
    navDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        
        navSettings.classList.remove('active');
        navDashboard.classList.add('active');

        statsContainer.classList.remove('class-hidden');
        filterUtilityBar.classList.remove('class-hidden');
        cardsGrid.classList.remove('class-hidden');
        settingsContainer.classList.add('class-hidden');
    });
}

/* ==========================================================================
   04. REAL-TIME SYSTEM CLOCK UTILITY
   ========================================================================== */

function initDashboardClock() {
    const dateElement = document.getElementById('live-date');
    if (!dateElement) return;
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}