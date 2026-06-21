/* ==========================================================================
   01. AUTHENTICATION PAGE LOGIC (auth.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Only run auth logic if we're on the auth page
    if (document.getElementById('login-form')) {
        initAuthFormSwitching();
        initPasswordToggle();
    }

});


/* ---------------- 01.1 FORM SWITCHING (Login <-> Signup) ---------------- */

function initAuthFormSwitching() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    // Show only the Login form
    function showLogin() {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    }

    // Show only the Signup form
    function showSignup() {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }

    // Bottom switch-link click events
    if (switchToSignup) {
        switchToSignup.addEventListener('click', showSignup);
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', showLogin);
    }

    // Decide which form to show based on URL hash (#login / #signup)
    const currentHash = window.location.hash;

    if (currentHash === '#signup') {
        showSignup();
    } else {
        // Default to login if hash is missing, empty, or anything else
        showLogin();
    }
}


/* ---------------- 01.2 PASSWORD SHOW/HIDE TOGGLE ---------------- */

function initPasswordToggle() {
    const passwordInputs = document.querySelectorAll('.password-wrapper input');

    passwordInputs.forEach((input) => {
        const wrapper = input.closest('.password-wrapper');
        const eyeIcon = wrapper.querySelector('.toggle-password');

        if (!eyeIcon) return;

        // Show the eye icon only once user starts typing, hide if field is cleared
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                eyeIcon.classList.add('visible');
            } else {
                eyeIcon.classList.remove('visible');
            }
        });

        // Toggle password visibility on eye icon click
        eyeIcon.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
}


/* ==========================================================================
   03. THEME SWITCHING (Runs on ALL pages — index, auth, dashboard, form)
   ========================================================================== */

// Apply saved theme immediately on every page load
(function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Only exists on dashboard/settings page

    // Sync checkbox state with current theme on load
    const currentTheme = localStorage.getItem('theme');
    themeToggle.checked = currentTheme === 'dark';

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}



/* ==========================================================================
   02. DASHBOARD PAGE LOGIC (dashboard.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Only run dashboard logic if we're on the dashboard page
    if (document.getElementById('sidebar')) {
        initLiveDate();
        initSidebarCollapse();
        initDashboardViewSwitching();
        initSearchAndFilter();
        initCardActions();
        initMobileDrawer();
    }

});


/* ---------------- 02.1 LIVE DATE DISPLAY ---------------- */

function initLiveDate() {
    const dateElement = document.getElementById('live-date');
    if (!dateElement) return;

    function updateDate() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    updateDate();
}


/* ---------------- 02.2 SIDEBAR COLLAPSE TOGGLE ---------------- */

function initSidebarCollapse() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapse-btn');

    if (!sidebar || !collapseBtn) return;

    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}


/* ---------------- 02.3 VIEW SWITCHING (Dashboard <-> Settings) ---------------- */

function initDashboardViewSwitching() {
    const navDashboard = document.getElementById('nav-dashboard');
    const navSettings = document.getElementById('nav-settings');

    const dashboardView = document.getElementById('dashboard-view');
    const settingsView = document.getElementById('settings-view');

    if (!navDashboard || !navSettings || !dashboardView || !settingsView) return;

    function showDashboard(e) {
        if (e) e.preventDefault();
        navSettings.classList.remove('active');
        navDashboard.classList.add('active');
        settingsView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
    }

    function showSettings(e) {
        if (e) e.preventDefault();
        navDashboard.classList.remove('active');
        navSettings.classList.add('active');
        dashboardView.classList.add('hidden');
        settingsView.classList.remove('hidden');
    }

    navDashboard.addEventListener('click', showDashboard);
    navSettings.addEventListener('click', showSettings);

    // Check URL hash on page load — auto-switch to Settings if navigated from another page
    if (window.location.hash === '#settings') {
        showSettings();
    }
}


/* ---------------- 02.4 SEARCH & STATUS FILTER ---------------- */

function initSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    const statusFilter = document.getElementById('status-filter');
    const cardsGrid = document.getElementById('cards-grid');
    const emptyState = document.getElementById('empty-state');

    if (!searchInput || !statusFilter || !cardsGrid) return;

    const jobCards = cardsGrid.querySelectorAll('.job-card');

    function applyFilters() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        let visibleCount = 0;

        jobCards.forEach((card) => {
            const companyName = card.querySelector('h3').textContent.toLowerCase();
            const roleTitle = card.querySelector('.role-title').textContent.toLowerCase();
            const cardStatus = card.getAttribute('data-status');

            const matchesSearch = companyName.includes(searchTerm) || roleTitle.includes(searchTerm);
            const matchesStatus = selectedStatus === 'all' || cardStatus === selectedStatus;

            if (matchesSearch && matchesStatus) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show empty state only if no cards matched
        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
            }
        }
    }

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
}



/* ---------------- 02.5 JOB CARD EDIT / DELETE ACTIONS ---------------- */

function initCardActions() {
    const cardsGrid = document.getElementById('cards-grid');
    if (!cardsGrid) return;

    cardsGrid.addEventListener('click', (e) => {

        // Handle Delete click
        if (e.target.closest('.action-delete')) {
            e.preventDefault();
            const card = e.target.closest('.job-card');
            const confirmDelete = confirm('Are you sure you want to delete this application?');
            if (confirmDelete) {
                card.remove();
            }
        }

        // Handle Edit click
        if (e.target.closest('.action-edit')) {
            e.preventDefault();
            const card = e.target.closest('.job-card');
            const cardId = card.dataset.id;

            // Extract this card's current data from the DOM
            const applicationData = {
                id: cardId,
                company: card.querySelector('h3').textContent.trim(),
                role: card.querySelector('.role-title').textContent.trim(),
                status: card.dataset.status,
                notes: card.querySelector('.card-notes').textContent.trim()
            };

            // Temporarily store it so form.html can read and pre-fill
            localStorage.setItem('editApplication', JSON.stringify(applicationData));

            window.location.href = `form.html?id=${cardId}`;
        }

    });
}



/* ---------------- 02.6 MOBILE SIDEBAR DRAWER ---------------- */

function initMobileDrawer() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (!sidebar || !menuBtn || !backdrop) return;

    function openDrawer() {
        sidebar.classList.add('mobile-open');
        backdrop.classList.add('active');
    }

    function closeDrawer() {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
    }

    // Hamburger button opens the drawer
    menuBtn.addEventListener('click', openDrawer);

    // Clicking the backdrop closes the drawer
    backdrop.addEventListener('click', closeDrawer);

    // Auto-close drawer when a nav link inside the sidebar is clicked
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link) => {
        link.addEventListener('click', closeDrawer);
    });
}




/* ==========================================================================
   04. APPLICATION FORM PAGE LOGIC (form.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Only run form logic if we're on the form page
    if (document.getElementById('application-form')) {
        initFormMode();
    }

});


function initFormMode() {
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!formTitle || !submitBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const applicationId = urlParams.get('id');

    if (applicationId) {
        formTitle.textContent = 'Edit Application';
        submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Update Application';

        // Pre-fill form fields using temporarily stored data
        const storedData = localStorage.getItem('editApplication');
        if (storedData) {
            const data = JSON.parse(storedData);

            document.getElementById('company-name').value = data.company || '';
            document.getElementById('job-role').value = data.role || '';
            document.getElementById('job-status').value = data.status || '';
            document.getElementById('job-notes').value = data.notes || '';

            // Clear it so it doesn't linger for future Add visits
            localStorage.removeItem('editApplication');
        }
    } else {
        formTitle.textContent = 'Add New Application';
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i> Add Application';
    }
}