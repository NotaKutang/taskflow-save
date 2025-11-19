let dateManager;

// Data structure untuk aplikasi
const appData = {
    // Status login
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    rememberMe: localStorage.getItem('rememberMe') === 'true',
    
    // Data user
    user: JSON.parse(localStorage.getItem('app_user')) || {
        username: "user",
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        phone: "+62 812-3456-7890",
        cvLink: "https://example.com/cv",
        isVIP: localStorage.getItem('isVIP') === 'true',
        avatar: "AT"
    },
    
    // Data tugas
    tasks: JSON.parse(localStorage.getItem('app_tasks')) || {
        // Statistik
        completed: 0,
        logbookCompleted: 2,
        pending: 1,
        overdue: 0,
        
        // Tugas mendatang
        upcoming: [
            {
                id: 1,
                type: "logbook",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-27",
                status: "open"
            },
            {
                id: 2,
                type: "weekly",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-27",
                status: "open"
            }
        ],
        
        // Logbook - PERBAIKI STRUKTUR DATA
        logbooks: [
            {
                id: 1,
                type: "logbook",
                week: 1,
                title: "Logbook Week 1 - Project Introduction",
                deadline: "2025-11-09",
                status: "completed",
                description: "Pada minggu pertama, pelajari tentang overview proyek, tujuan, dan scope. Buat logbook yang mendokumentasikan pemahaman Anda tentang proyek dan rencana awal.",
                score: "A",
                comments: "Excellent understanding of project requirements and clear initial planning.",
                submittedFiles: ["logbook_week_1.pdf"],
                submittedDate: "2025-11-07T10:30:00Z",
                locked: false
            },
            {
                id: 2,
                type: "logbook",
                week: 2,
                title: "Logbook Week 2 - Team Formation",
                deadline: "2025-11-16",
                status: "completed",
                description: "Minggu kedua fokus pada pembentukan tim, pembagian peran, dan perencanaan kolaborasi. Dokumentasikan proses pembentukan tim dan rencana kerja.",
                score: "A",
                comments: "Well-structured team roles and clear collaboration plan.",
                submittedFiles: ["logbook_week_2.pdf"],
                submittedDate: "2025-11-14T14:20:00Z",
                locked: false
            },
            {
                id: 3,
                type: "logbook",
                week: 3,
                title: "Logbook Week 3 - Requirements Analysis",
                deadline: "2025-11-23",
                status: "overdue",
                description: "Analisis kebutuhan sistem dan user requirements. Dokumentasikan proses analisis, user stories, dan functional requirements.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: false
            },
            {
                id: 4,
                type: "logbook",
                week: 4,
                title: "Logbook Week 4 - System Design",
                deadline: "2025-11-30",
                status: "open",
                description: "Desain sistem architecture, database design, dan UI/UX mockup. Dokumentasikan proses desain dan rationale di balik keputusan desain.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 5,
                type: "logbook",
                week: 5,
                title: "Logbook Week 5 - Implementation Phase 1",
                deadline: "2025-12-07",
                status: "open",
                description: "Implementasi core functionality dan setup development environment. Dokumentasikan progress coding, challenges, dan solutions.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 6,
                type: "logbook",
                week: 6,
                title: "Logbook Week 6 - Implementation Phase 2",
                deadline: "2025-12-14",
                status: "open",
                description: "Lanjutan implementasi features utama dan integration testing. Dokumentasikan progress development dan testing results.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 7,
                type: "logbook",
                week: 7,
                title: "Logbook Week 7 - Testing & Debugging",
                deadline: "2025-12-21",
                status: "open",
                description: "Comprehensive testing, bug fixing, dan performance optimization. Dokumentasikan test cases, bugs found, dan fixes applied.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 8,
                type: "logbook",
                week: 8,
                title: "Logbook Week 8 - Final Review",
                deadline: "2025-12-28",
                status: "open",
                description: "Final system review, code cleanup, dan preparation for deployment. Dokumentasikan final improvements dan deployment plan.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 9,
                type: "logbook",
                week: 9,
                title: "Logbook Week 9 - Documentation",
                deadline: "2026-01-04",
                status: "open",
                description: "Penyusunan final documentation, user manual, dan technical documentation. Dokumentasikan proses pembuatan dokumentasi.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 10,
                type: "logbook",
                week: 10,
                title: "Logbook Week 10 - Project Submission",
                deadline: "2026-01-11",
                status: "open",
                description: "Final project submission, presentation preparation, dan project reflection. Dokumentasikan lessons learned dan future improvements.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            }
        ],
        
        // Weekly tasks
        weeklyTasks: [
            {
                id: 1,
                type: "weekly",
                week: 1,
                title: "Week 1 - Project Planning & Setup",
                deadline: "2025-11-09",
                status: "completed",
                description: "Setup project environment, create project charter, dan define project scope. Submit project proposal document.",
                score: "A",
                comments: "Excellent project proposal with clear objectives and realistic timeline.",
                submittedFiles: ["project_proposal_week1.pdf"],
                submittedDate: "2025-11-07T09:15:00Z",
                locked: false
            },
            {
                id: 2,
                type: "weekly",
                week: 2,
                title: "Week 2 - Team Formation & Roles",
                deadline: "2025-11-16",
                status: "open",
                description: "Form project team, define roles and responsibilities, create collaboration plan. Submit team formation document.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: false
            },
            {
                id: 3,
                type: "weekly",
                week: 3,
                title: "Week 3 - Requirements Analysis",
                deadline: "2025-11-23",
                status: "open",
                description: "Conduct requirements analysis, create user stories, define functional and non-functional requirements. Submit requirements document.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 4,
                type: "weekly",
                week: 4,
                title: "Week 4 - System Design",
                deadline: "2025-11-30",
                status: "open",
                description: "Design system architecture, create database schema, design UI/UX mockups. Submit design document.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 5,
                type: "weekly",
                week: 5,
                title: "Week 5 - Core Implementation",
                deadline: "2025-12-07",
                status: "open",
                description: "Implement core functionality, setup database, create basic UI components. Submit progress report and source code.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 6,
                type: "weekly",
                week: 6,
                title: "Week 6 - Feature Development",
                deadline: "2025-12-14",
                status: "open",
                description: "Develop main features, implement business logic, create API endpoints. Submit feature implementation report.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 7,
                type: "weekly",
                week: 7,
                title: "Week 7 - Testing & QA",
                deadline: "2025-12-21",
                status: "open",
                description: "Conduct comprehensive testing, fix bugs, optimize performance. Submit test report and bug fixes.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 8,
                type: "weekly",
                week: 8,
                title: "Week 8 - System Integration",
                deadline: "2025-12-28",
                status: "open",
                description: "Integrate all components, conduct system testing, prepare for deployment. Submit integration report.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 9,
                type: "weekly",
                week: 9,
                title: "Week 9 - Documentation & Finalization",
                deadline: "2026-01-04",
                status: "open",
                description: "Complete project documentation, user manual, technical documentation. Submit documentation package.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 10,
                type: "weekly",
                week: 10,
                title: "Week 10 - Final Submission & Presentation",
                deadline: "2026-01-11",
                status: "open",
                description: "Final project submission, prepare presentation, project demonstration. Submit final project and presentation materials.",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            }
        ]
    },
    
    // Data tim
    team: [
        {
            id: 1,
            name: "Alex Thompson",
            role: "Project Manager",
            phone: "+62 812-3456-7890",
            email: "alex.thompson@example.com",
            cvLink: "https://example.com/cv/alex"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Frontend Developer",
            phone: "+62 813-4567-8901",
            email: "sarah.johnson@example.com",
            cvLink: "https://example.com/cv/sarah"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Backend Developer",
            phone: "+62 814-5678-9012",
            email: "michael.chen@example.com",
            cvLink: "https://example.com/cv/michael"
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "UI/UX Designer",
            phone: "+62 815-6789-0123",
            email: "emily.davis@example.com",
            cvLink: "https://example.com/cv/emily"
        }
    ],
    
    // Data template (VIP)
    templates: [
        {
            id: 1,
            title: "Logbook Template",
            description: "Standard template for weekly logbook entries"
        },
        {
            id: 2,
            title: "Daily Activity Log",
            description: "Track your daily activities and progress"
        },
        {
            id: 3,
            title: "Meeting Notes",
            description: "Structured template for meeting minutes"
        },
        {
            id: 4,
            title: "Task Report Template",
            description: "Comprehensive task reporting format"
        },
        {
            id: 5,
            title: "Project Plan Template",
            description: "Detailed project planning document"
        },
        {
            id: 6,
            title: "Final Project Template",
            description: "Template for final project documentation"
        }
    ],
    
    // Data transaksi
    transactions: JSON.parse(localStorage.getItem('app_transactions')) || []
};

// Fungsi untuk menghitung statistik tugas
function calculateTaskStats() {
    const tasks = appData.tasks;
    
    // Reset semua statistik
    tasks.completed = 0;
    tasks.logbookCompleted = 0;
    tasks.pending = 0;
    tasks.overdue = 0;
    tasks.upcoming = [];
    
    // 1. Hitung TUGAS SELESAI (hanya weekly tasks completed)
    tasks.completed = tasks.weeklyTasks.filter(task => 
        task.status === "completed" && !task.locked
    ).length;
    
    // 2. Hitung LOGBOOK SELESAI (hanya logbook completed)
    tasks.logbookCompleted = tasks.logbooks.filter(logbook => 
        logbook.status === "completed" && !logbook.locked
    ).length;
    
    // 3. Hitung TUGAS TERTUNDA (weekly tasks + logbook yang status open)
    const pendingWeekly = tasks.weeklyTasks.filter(task => 
        task.status === "open" && !task.locked
    ).length;
    
    const pendingLogbook = tasks.logbooks.filter(logbook => 
        logbook.status === "open" && !logbook.locked
    ).length;
    
    tasks.pending = pendingWeekly + pendingLogbook;
    
    // 4. Hitung TERLAMBAT (weekly tasks + logbook yang status overdue)
    const overdueWeekly = tasks.weeklyTasks.filter(task => 
        task.status === "overdue" && !task.locked
    ).length;
    
    const overdueLogbook = tasks.logbooks.filter(logbook => 
        logbook.status === "overdue" && !logbook.locked
    ).length;
    
    tasks.overdue = overdueWeekly + overdueLogbook;
    
    // 5. Update upcoming tasks (tasks yang open atau overdue)
    tasks.upcoming = [
        ...tasks.logbooks.filter(logbook => 
            (logbook.status === "open" || logbook.status === "overdue") && !logbook.locked
        ),
        ...tasks.weeklyTasks.filter(task => 
            (task.status === "open" || task.status === "overdue") && !task.locked
        )
    ]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Urutkan by deadline
    .slice(0, 5); // Batasi hingga 5 item
    
    // 6. Update lock status untuk logbooks
    tasks.logbooks.forEach((logbook, index) => {
        if (index > 0) {
            const prevLogbook = tasks.logbooks[index - 1];
            logbook.locked = prevLogbook.status !== 'completed';
        } else {
            logbook.locked = false;
        }
    });
    
    // 7. Update lock status untuk weekly tasks
    tasks.weeklyTasks.forEach((task, index) => {
        if (index > 0) {
            const prevTask = tasks.weeklyTasks[index - 1];
            task.locked = prevTask.status !== 'completed';
        } else {
            task.locked = false;
        }
    });
    
    // Simpan ke localStorage
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
    
    console.log('📊 Stats calculated:', {
        completed: tasks.completed,
        logbookCompleted: tasks.logbookCompleted,
        pending: tasks.pending,
        overdue: tasks.overdue,
        upcoming: tasks.upcoming.length
    });
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Hitung statistik awal
    calculateTaskStats();
    
    // Cek status login
    if (appData.isLoggedIn) {
        showApp();
    } else {
        showLogin();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup hash routing
    setupHashRouting();
    
    // Load halaman berdasarkan hash
    loadPageFromHash();
});

// Setup hash routing
function setupHashRouting() {
    window.addEventListener('hashchange', loadPageFromHash);
}

// Load halaman berdasarkan hash
function loadPageFromHash() {
    if (!appData.isLoggedIn) return;
    
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('/');
    const mainPage = parts[0];
    
    console.log('Hash parts:', parts); // Debug log
    console.log('Main page:', mainPage); // Debug log
    
    // Update menu aktif
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`.menu-item[data-page="${mainPage}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    // Load halaman dengan parameter yang benar
    if (parts.length === 1) {
        loadPage(mainPage);
    } else if (parts.length === 3) {
        // Format: task-detail/logbook/1
        loadPage(mainPage, `${parts[1]}/${parts[2]}`);
    } else {
        loadPage(mainPage, parts[1]);
    }
}

// Tampilkan halaman login
function showLogin() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
    
    // Isi data login jika remember me aktif
    if (appData.rememberMe) {
        document.getElementById('email').value = localStorage.getItem('savedEmail') || '';
        document.getElementById('password').value = localStorage.getItem('savedPassword') || '';
        document.getElementById('remember').checked = true;
    }
}

// Tampilkan aplikasi utama
function showApp() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    
    // Update informasi user di sidebar
    document.getElementById('sidebar-user-name').textContent = appData.user.name;
    document.getElementById('sidebar-avatar').textContent = appData.user.avatar;
}

// Setup semua event listeners
function setupEventListeners() {
    // Tasks menu dropdown
    document.getElementById('tasks-menu').addEventListener('click', function() {
        const dropdown = document.getElementById('tasks-dropdown');
        dropdown.classList.toggle('active');
        
        const arrow = this.querySelector('.dropdown-arrow');
        arrow.classList.toggle('ri-arrow-down-s-line');
        arrow.classList.toggle('ri-arrow-up-s-line');
    });
    
    // Navigasi menu
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.id !== 'logout-btn' && item.id !== 'tasks-menu') {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                if (page) {
                    window.location.hash = page;
                }
            });
        }
    });
    
    // Navigasi dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                window.location.hash = page;
            }
        });
    });
    
    // Tombol upgrade di sidebar
    document.querySelector('.btn-pro').addEventListener('click', function() {
        window.location.hash = 'upgrade';
    });

    // Tombol debug untuk reset (opsional)
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug: Reset Data';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '1000';
    debugBtn.style.background = 'red';
    debugBtn.style.color = 'white';
    debugBtn.style.padding = '5px';
    debugBtn.addEventListener('click', function() {
        localStorage.clear();
        location.reload();
    });
    document.body.appendChild(debugBtn);
}

// Handle logout
function handleLogout() {
    appData.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    showLogin();
    
    // Reset form login
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Load halaman berdasarkan nama
function loadPage(pageName, subPage = null) {
    // Update judul halaman
    const pageTitle = document.getElementById('page-title');
    const pageContent = document.getElementById('page-content');
    
    console.log('Loading page:', pageName, 'subPage:', subPage); // Debug log
    
    // Render konten berdasarkan halaman
    switch(pageName) {
        case 'home':
            pageTitle.textContent = 'Dashboard';
            renderHomePage(pageContent);
            break;
        case 'tasks':
            pageTitle.textContent = 'Tasks';
            renderTasksPage(pageContent);
            break;
        case 'logbook':
            pageTitle.textContent = 'Tasks - Logbook';
            renderLogbookPage(pageContent);
            break;
        case 'weekly-tasks':
            pageTitle.textContent = 'Tasks - Weekly Tasks';
            renderWeeklyTasksPage(pageContent);
            break;
        case 'task-detail':
            pageTitle.textContent = 'Task Details';
            renderTaskDetailPage(pageContent, subPage);
            break;
        case 'task-view':
            pageTitle.textContent = 'View Task';
            renderTaskViewPage(pageContent, subPage);
            break;
        case 'templates':
            pageTitle.textContent = 'Task Templates';
            renderTemplatesPage(pageContent);
            break;
        case 'team':
            pageTitle.textContent = 'Team Space';
            renderTeamPage(pageContent);
            break;
        case 'profile':
            pageTitle.textContent = 'Profile';
            renderProfilePage(pageContent);
            break;
        case 'edit-profile':
            pageTitle.textContent = 'Edit Profile';
            renderEditProfilePage(pageContent);
            break;
        case 'upgrade':
            pageTitle.textContent = 'Upgrade to PRO';
            renderUpgradePage(pageContent);
            break;
        default:
            pageTitle.textContent = 'Dashboard';
            renderHomePage(pageContent);
            break;
    }
}

// Tambahkan di js/app.js - Fungsi helper untuk format tanggal Indonesia
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk mendapatkan tanggal Minggu berdasarkan week number
function getSundayDate(startDate, weekNumber) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (weekNumber - 1) * 7);
    // Cari hari Minggu terdekat
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek;
    date.setDate(diff);
    return date.toISOString().split('T')[0];
}