// Render halaman Home/Dashboard
function renderHomePage(container) {
    // Pastikan statistik terhitung ulang
    calculateTaskStats();
    
    const stats = appData.tasks;
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon completed">
                    <i class="ri-checkbox-circle-line"></i>
                </div>
                <div class="stat-value">${stats.completed}</div>
                <div class="stat-label">Tugas Selesai</div>
                <div class="stat-subtitle">Weekly Tasks Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon completed">
                    <i class="ri-book-line"></i>
                </div>
                <div class="stat-value">${stats.logbookCompleted}</div>
                <div class="stat-label">Logbook Selesai</div>
                <div class="stat-subtitle">Logbooks Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon pending">
                    <i class="ri-time-line"></i>
                </div>
                <div class="stat-value">${stats.pending}</div>
                <div class="stat-label">Tugas Tertunda</div>
                <div class="stat-subtitle">Open Tasks</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon overdue">
                    <i class="ri-alarm-warning-line"></i>
                </div>
                <div class="stat-value">${stats.overdue}</div>
                <div class="stat-label">Terlambat</div>
                <div class="stat-subtitle">Overdue Tasks</div>
            </div>
        </div>
        
        <h2 class="section-title">Tugas Mendatang</h2>
        <div class="tasks-list">
            ${stats.upcoming.length > 0 ? 
                stats.upcoming.map(task => `
                    <div class="task-card" data-id="${task.id}" data-type="${task.type}">
                        <div class="task-info">
                            <h4>${task.type === 'logbook' ? 'Logbook' : 'Tugas Mingguan'}: ${task.title}</h4>
                            <div class="task-meta">
                                <span><i class="ri-calendar-line"></i> Deadline: ${formatDateForDisplay(task.deadline)}</span>
                                <span class="task-status status-${task.status}">
                                    ${task.status === 'open' ? 'Terbuka' : task.status === 'completed' ? 'Selesai' : 'Terlambat'}
                                </span>
                            </div>
                        </div>
                        <div class="task-arrow">
                            <i class="ri-arrow-right-s-line"></i>
                        </div>
                    </div>
                `).join('') : 
                '<div class="empty-state"><p>Tidak ada tugas mendatang</p></div>'
            }
        </div>
    `;
    
    // Setup event listener untuk task card
    container.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
}