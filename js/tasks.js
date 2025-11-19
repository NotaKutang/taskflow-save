// Render halaman Tasks (parent page)
function renderTasksPage(container) {
    container.innerHTML = `
        <div class="tasks-tabs">
            <button class="tab-btn active" data-tab="logbook">Logbook</button>
            <button class="tab-btn" data-tab="weekly-tasks">Weekly Tasks</button>
        </div>
        
        <div class="tab-content active" id="logbook-tab">
            <!-- Konten logbook akan diisi oleh fungsi renderLogbookPage -->
        </div>
        
        <div class="tab-content" id="weekly-tasks-tab">
            <!-- Konten weekly tasks akan diisi oleh fungsi renderWeeklyTasksPage -->
        </div>
    `;
    
    // Render konten tab awal
    renderLogbookPage(document.getElementById('logbook-tab'));
    
    // Setup tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update tab aktif
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update konten tab
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
            
            // Render konten tab yang dipilih
            if (tab === 'logbook') {
                renderLogbookPage(document.getElementById('logbook-tab'));
            } else if (tab === 'weekly-tasks') {
                renderWeeklyTasksPage(document.getElementById('weekly-tasks-tab'));
            }
        });
    });
}

// Render halaman Logbook
function renderLogbookPage(container) {
    container.innerHTML = `
        <div class="logbook-grid">
            ${appData.tasks.logbooks.map(logbook => {
                const isLocked = logbook.week > 1 && 
                    appData.tasks.logbooks.find(l => l.week === logbook.week - 1)?.status !== 'completed';
                
                logbook.locked = isLocked;
                
                return `
                <div class="logbook-card ${isLocked ? 'locked' : ''}" data-id="${logbook.id}" data-type="logbook">
                    <div class="card-content">
                        <h4>${logbook.title}</h4>
                        <p class="deadline"><i class="ri-calendar-line"></i> Deadline: ${formatDateForDisplay(logbook.deadline)}</p>
                        <p class="task-description">${logbook.description}</p>
                    </div>
                    <div class="logbook-meta">
                        <div class="task-status status-${isLocked ? 'locked' : logbook.status}">
                            ${isLocked ? 'Terkunci' : logbook.status === 'completed' ? 'Selesai' : logbook.status === 'overdue' ? 'Terlambat' : 'Terbuka'}
                        </div>
                        <div class="task-actions">
                            ${!isLocked ? 
                                (logbook.status === 'completed' ? 
                                    `<button class="btn btn-outline btn-view" data-id="${logbook.id}" data-type="logbook">Lihat Pengumpulan</button>` : 
                                    `<button class="btn btn-primary btn-upload" data-id="${logbook.id}" data-type="logbook">Upload Logbook</button>`
                                ) : 
                                `<button class="btn btn-outline" disabled>Selesaikan Minggu ${logbook.week - 1}</button>`
                            }
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
    
    // Setup event listeners...
    container.querySelectorAll('.btn-upload').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
    
    container.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-view/${taskType}/${taskId}`;
        });
    });
    
    container.querySelectorAll('.logbook-card:not(.locked)').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button')) return;
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
}

function renderLogbookPage(container) {
    container.innerHTML = `
        <div class="logbook-grid">
            ${appData.tasks.logbooks.map(logbook => {
                // Cek apakah minggu ini terkunci (jika minggu sebelumnya belum disubmit)
                const isLocked = logbook.week > 1 && 
                    appData.tasks.logbooks.find(l => l.week === logbook.week - 1)?.status !== 'completed';
                
                // Update locked status
                logbook.locked = isLocked;
                
                return `
                <div class="logbook-card ${isLocked ? 'locked' : ''}" data-id="${logbook.id}" data-type="logbook">
                    <h4>${logbook.title}</h4>
                    <p>Deadline: ${logbook.deadline}</p>
                    <p class="task-description">${logbook.description.substring(0, 100)}...</p>
                    <div class="logbook-meta">
                        <div class="task-status status-${isLocked ? 'locked' : logbook.status}">
                            ${isLocked ? 'Locked' : logbook.status === 'completed' ? 'Completed' : logbook.status === 'overdue' ? 'Overdue' : 'Open'}
                        </div>
                        ${!isLocked ? 
                            (logbook.status === 'completed' ? 
                                `<button class="btn btn-outline btn-view" data-id="${logbook.id}" data-type="logbook">View Submission</button>` : 
                                `<button class="btn btn-primary btn-upload" data-id="${logbook.id}" data-type="logbook">Upload Logbook</button>`
                            ) : 
                            `<button class="btn btn-outline" disabled>Complete Week ${logbook.week - 1} First</button>`
                        }
                    </div>
                </div>
            `}).join('')}
        </div>
    `;
    
    // Setup event listener untuk upload logbook
    container.querySelectorAll('.btn-upload').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
    
    // Setup event listener untuk view logbook
    container.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-view/${taskType}/${taskId}`;
        });
    });
    
    // Setup event listener untuk card logbook
    container.querySelectorAll('.logbook-card:not(.locked)').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
}

// Render halaman Weekly Tasks
function renderWeeklyTasksPage(container) {
    container.innerHTML = `
        <div class="weekly-tasks-list">
            ${appData.tasks.weeklyTasks.map(task => {
                const isLocked = task.week > 1 && 
                    appData.tasks.weeklyTasks.find(t => t.week === task.week - 1)?.status !== 'completed';
                
                return `
                <div class="weekly-task-card ${isLocked ? 'locked' : ''}" data-id="${task.id}" data-type="weekly">
                    <div class="weekly-task-info">
                        <h4>${task.title}</h4>
                        <div class="weekly-task-meta">
                            <span><i class="ri-calendar-line"></i> Deadline: ${formatDateForDisplay(task.deadline)}</span>
                            ${task.score ? `<span><i class="ri-award-line"></i> Nilai: ${task.score}</span>` : ''}
                        </div>
                        ${task.comments ? `<p class="mentor-comment-preview"><strong>Komentar Mentor:</strong> ${task.comments.substring(0, 100)}...</p>` : ''}
                        <p class="task-description">${task.description}</p>
                    </div>
                    <div class="task-actions">
                        ${!isLocked ? 
                            (task.status === 'completed' ? 
                                `<button class="btn btn-outline btn-view" data-id="${task.id}" data-type="weekly">Lihat Pengumpulan</button>` : 
                                `<button class="btn btn-primary btn-upload" data-id="${task.id}" data-type="weekly">Upload Tugas</button>`
                            ) : 
                            `<button class="btn btn-outline" disabled>Selesaikan Minggu ${task.week - 1}</button>`
                        }
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
    
    // Setup event listeners...
    container.querySelectorAll('.btn-upload').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
    
    container.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-view/${taskType}/${taskId}`;
        });
    });
    
    container.querySelectorAll('.weekly-task-card:not(.locked)').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button')) return;
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
}

// Render halaman Detail Tugas
function renderTaskDetailPage(container, taskPath) {
    console.log('renderTaskDetailPage called with taskPath:', taskPath); // Debug
    
    if (!taskPath) {
        container.innerHTML = '<p>Task not found - No task path provided</p>';
        return;
    }
    
    const parts = taskPath.split('/');
    console.log('Task path parts:', parts); // Debug
    
    // Handle different URL formats
    let taskType, taskId;
    
    if (parts.length === 2) {
        taskType = parts[0];
        taskId = parseInt(parts[1]);
    } else {
        container.innerHTML = '<p>Invalid task URL format</p>';
        return;
    }
    
    console.log('Looking for task - Type:', taskType, 'ID:', taskId); // Debug
    
    let task;
    if (taskType === 'logbook') {
        task = appData.tasks.logbooks.find(t => t.id === taskId);
        console.log('Found logbook task:', task); // Debug
    } else if (taskType === 'weekly') {
        task = appData.tasks.weeklyTasks.find(t => t.id === taskId);
        console.log('Found weekly task:', task); // Debug
    }
    
    if (!task) {
        container.innerHTML = `
            <div class="task-detail">
                <div class="task-detail-header">
                    <h2>Task Not Found</h2>
                </div>
                <div class="task-description">
                    <p>Unable to find task with ID: ${taskId} and type: ${taskType}</p>
                    <p>Available logbooks: ${appData.tasks.logbooks.map(l => l.id).join(', ')}</p>
                    <p>Available weekly tasks: ${appData.tasks.weeklyTasks.map(t => t.id).join(', ')}</p>
                </div>
                <div class="payment-actions">
                    <button class="btn btn-outline" onclick="window.history.back()">Back to Tasks</button>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="task-detail">
            <div class="task-detail-header">
                <div class="task-detail-info">
                    <h2>${task.title}</h2>
                    <div class="task-detail-meta">
                        <span><i class="ri-calendar-line"></i> Deadline: ${task.deadline}</span>
                        <span class="task-status status-${task.status}">${task.status === 'open' ? 'Open' : task.status === 'completed' ? 'Completed' : 'Overdue'}</span>
                        ${task.score ? `<span><i class="ri-award-line"></i> Grade: ${task.score}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="task-description">
                <h3>Description</h3>
                <p>${task.description}</p>
            </div>
            
            ${task.comments ? `
                <div class="mentor-comment">
                    <h3>Mentor Comments</h3>
                    <p>${task.comments}</p>
                </div>
            ` : ''}
            
            <div class="upload-section" id="upload-area">
                <i class="ri-upload-cloud-2-line"></i>
                <h3>Upload Your Logbook</h3>
                <p>Click to upload or drag and drop your file here</p>
                <p>PDF, JPG, PNG (Max. 10MB)</p>
                <input type="file" id="file-input" class="file-input" accept=".pdf,.jpg,.jpeg,.png">
            </div>
            
            ${task.submittedFiles.length > 0 ? `
                <div class="uploaded-files">
                    <h3>Uploaded Files</h3>
                    ${task.submittedFiles.map(file => `
                        <div class="file-item">
                            <div class="file-info">
                                <i class="ri-file-text-line file-icon"></i>
                                <span>${file}</span>
                            </div>
                            <div class="file-actions">
                                <span>Uploaded: ${new Date(task.submittedDate).toLocaleDateString()}</span>
                                <button class="btn btn-outline btn-remove" data-filename="${file}">Remove</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="payment-actions">
                <button class="btn btn-outline" onclick="window.history.back()">Back</button>
                <button class="btn btn-primary" id="submit-task" ${task.status === 'completed' || task.submittedFiles.length === 0 ? 'disabled' : ''}>
                    ${task.status === 'completed' ? 'Already Submitted' : 'Submit Task'}
                </button>
            </div>
        </div>
    `;
    
    // Setup file upload
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const submitBtn = document.getElementById('submit-task');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.backgroundColor = 'var(--primary-light)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--gray-light)';
        uploadArea.style.backgroundColor = 'transparent';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--gray-light)';
        uploadArea.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload(task, fileInput.files[0]);
        }
    });
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileUpload(task, fileInput.files[0]);
        }
    });
    
    // Setup remove file buttons
    container.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const filename = this.getAttribute('data-filename');
            removeUploadedFile(task, filename);
        });
    });
    
    // Setup submit task
    submitBtn.addEventListener('click', () => {
        if (task.submittedFiles.length === 0) {
            alert('Please upload a file before submitting.');
            return;
        }
        
        // Update status task
        task.status = 'completed';
        task.submittedDate = new Date().toISOString();
        
        // Simpan perubahan ke localStorage
        localStorage.setItem('app_tasks', JSON.stringify(appData.tasks));
        
        // Hitung ulang statistik
        calculateTaskStats();
        
        alert('Task submitted successfully!');
        window.history.back();
    });
    
    // Fungsi untuk menangani upload file
    function handleFileUpload(task, file) {
        // Validasi file
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF, JPG, or PNG file.');
            return;
        }
        
        if (file.size > maxSize) {
            alert('File size exceeds 10MB limit.');
            return;
        }
        
        // Simpan file ke localStorage
        const fileName = `logbook_week_${task.week}_${Date.now()}_${file.name}`;
        task.submittedFiles = [fileName];
        
        // Simpan file data ke localStorage (simulasi)
        const fileData = {
            name: fileName,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            taskId: task.id,
            taskType: task.type,
            uploadDate: new Date().toISOString()
        };
        
        // Simpan metadata file ke localStorage
        let uploadedFiles = JSON.parse(localStorage.getItem('uploaded_files')) || {};
        uploadedFiles[fileName] = fileData;
        localStorage.setItem('uploaded_files', JSON.stringify(uploadedFiles));
        
        // Update UI
        uploadArea.innerHTML = `
            <i class="ri-checkbox-circle-line" style="color: var(--success); font-size: 40px;"></i>
            <h3>File Uploaded Successfully</h3>
            <p>${file.name}</p>
            <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <p>Uploaded: ${new Date().toLocaleDateString()}</p>
            <button class="btn btn-outline" id="change-file">Change File</button>
        `;
        
        // Aktifkan tombol submit
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Task';
        
        document.getElementById('change-file').addEventListener('click', () => {
            // Reset upload area
            uploadArea.innerHTML = `
                <i class="ri-upload-cloud-2-line"></i>
                <h3>Upload Your Logbook</h3>
                <p>Click to upload or drag and drop your file here</p>
                <p>PDF, JPG, PNG (Max. 10MB)</p>
                <input type="file" id="file-input" class="file-input" accept=".pdf,.jpg,.jpeg,.png">
            `;
            
            // Setup ulang event listeners
            const newFileInput = document.getElementById('file-input');
            uploadArea.addEventListener('click', () => newFileInput.click());
            newFileInput.addEventListener('change', () => {
                if (newFileInput.files.length) {
                    handleFileUpload(task, newFileInput.files[0]);
                }
            });
            
            // Hapus file yang diupload
            task.submittedFiles = [];
            delete uploadedFiles[fileName];
            localStorage.setItem('uploaded_files', JSON.stringify(uploadedFiles));
            
            // Nonaktifkan tombol submit
            submitBtn.disabled = true;
        });
        
        // Refresh uploaded files list
        if (task.submittedFiles.length > 0) {
            const uploadedFilesContainer = container.querySelector('.uploaded-files') || 
                (() => {
                    const newContainer = document.createElement('div');
                    newContainer.className = 'uploaded-files';
                    newContainer.innerHTML = '<h3>Uploaded Files</h3>';
                    uploadArea.parentNode.insertBefore(newContainer, uploadArea.nextSibling);
                    return newContainer;
                })();
            
            uploadedFilesContainer.innerHTML = `
                <h3>Uploaded Files</h3>
                <div class="file-item">
                    <div class="file-info">
                        <i class="ri-file-text-line file-icon"></i>
                        <span>${file.name}</span>
                    </div>
                    <div class="file-actions">
                        <span>Uploaded: ${new Date().toLocaleDateString()}</span>
                        <button class="btn btn-outline btn-remove" data-filename="${fileName}">Remove</button>
                    </div>
                </div>
            `;
            
            // Setup remove button
            uploadedFilesContainer.querySelector('.btn-remove').addEventListener('click', function() {
                removeUploadedFile(task, fileName);
            });
        }
    }
    
    // Fungsi untuk menghapus file yang diupload
    function removeUploadedFile(task, filename) {
        task.submittedFiles = task.submittedFiles.filter(f => f !== filename);
        
        // Hapus dari localStorage
        let uploadedFiles = JSON.parse(localStorage.getItem('uploaded_files')) || {};
        delete uploadedFiles[filename];
        localStorage.setItem('uploaded_files', JSON.stringify(uploadedFiles));
        
        // Refresh halaman
        renderTaskDetailPage(container, taskPath);
    }
}

// Render halaman View Tugas
function renderTaskViewPage(container, taskPath) {
    if (!taskPath) {
        container.innerHTML = '<p>Task not found</p>';
        return;
    }
    
    const parts = taskPath.split('/');
    const taskType = parts[0];
    const taskId = parseInt(parts[1]);
    
    let task;
    if (taskType === 'logbook') {
        task = appData.tasks.logbooks.find(t => t.id === taskId);
    } else if (taskType === 'weekly') {
        task = appData.tasks.weeklyTasks.find(t => t.id === taskId);
    }
    
    if (!task) {
        container.innerHTML = '<p>Task not found</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="file-viewer">
            <div class="file-viewer-header">
                <h2>${task.title}</h2>
                <button class="btn btn-outline" onclick="window.history.back()">Back</button>
            </div>
            
            <div class="file-preview">
                ${task.submittedFiles[0].endsWith('.pdf') ? `
                    <div class="pdf-placeholder">
                        <i class="ri-file-pdf-line"></i>
                    </div>
                    <p>PDF File: ${task.submittedFiles[0]}</p>
                ` : `
                    <img src="#" alt="Preview" onerror="this.style.display='none'">
                    <p>Image File: ${task.submittedFiles[0]}</p>
                `}
            </div>
            
            <div class="file-meta">
                <div class="file-meta-item">
                    <span class="file-meta-label">Submitted Date:</span>
                    <span>${new Date(task.submittedDate).toLocaleDateString()}</span>
                </div>
                ${task.score ? `
                    <div class="file-meta-item">
                        <span class="file-meta-label">Grade:</span>
                        <span>${task.score}</span>
                    </div>
                ` : ''}
                ${task.comments ? `
                    <div class="file-meta-item">
                        <span class="file-meta-label">Mentor Feedback:</span>
                        <span>${task.comments}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Render halaman Task Templates
function renderTemplatesPage(container) {
    const isVIP = appData.user.isVIP;
    
    container.innerHTML = `
        ${!isVIP ? `
            <div class="vip-upgrade-prompt">
                <h3>Upgrade to VIP to unlock features</h3>
                <p>Upgrade now to access all premium task templates</p>
                <button class="btn btn-warning" data-page="upgrade">Upgrade to VIP</button>
            </div>
        ` : ''}
        
        <div class="templates-grid">
            ${appData.templates.map(template => `
                <div class="template-card ${isVIP ? '' : 'vip'}">
                    <div class="template-icon">
                        <i class="ri-file-text-line"></i>
                    </div>
                    <h4>${template.title}</h4>
                    <p>${template.description}</p>
                    ${isVIP ? 
                        `<button class="btn btn-primary">Download Template</button>` : 
                        `<button class="btn btn-primary" disabled>Download Template</button>`
                    }
                </div>
            `).join('')}
        </div>
    `;
    
    // Event listener untuk tombol upgrade
    container.querySelector('.btn-warning')?.addEventListener('click', function() {
        window.location.hash = 'upgrade';
    });
}

// Render halaman Team Space
function renderTeamPage(container) {
    container.innerHTML = `
        <h2 class="section-title">Team Members</h2>
        <div class="team-grid">
            ${appData.team.map(member => `
                <div class="team-card">
                    <div class="team-avatar">${member.name.split(' ').map(n => n[0]).join('')}</div>
                    <h4>${member.name}</h4>
                    <div class="team-role">${member.role}</div>
                    <div class="team-contact">
                        <div><i class="ri-phone-line"></i> ${member.phone}</div>
                        <div><i class="ri-mail-line"></i> ${member.email}</div>
                    </div>
                    <button class="btn btn-outline" onclick="window.open('${member.cvLink}', '_blank')">View CV</button>
                </div>
            `).join('')}
        </div>
    `;
}