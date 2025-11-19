// Render halaman Profile
function renderProfilePage(container) {
    const user = appData.user;
    const transactions = appData.transactions;
    
    container.innerHTML = `
        <div class="profile-container">
            <div class="profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${user.avatar}
                        <div class="profile-avatar-edit">
                            <i class="ri-pencil-line"></i>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${user.name} ${user.isVIP ? '<span class="vip-badge">VIP</span>' : ''}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="detail-item">
                        <label>Email</label>
                        <p>${user.email}</p>
                    </div>
                    <div class="detail-item">
                        <label>Phone Number</label>
                        <p>${user.phone}</p>
                    </div>
                    <div class="detail-item">
                        <label>CV Link</label>
                        <p><a href="${user.cvLink}" target="_blank">View CV</a></p>
                    </div>
                    <div class="detail-item">
                        <label>Membership</label>
                        <p>${user.isVIP ? 'PRO' : 'Free'}</p>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-primary" onclick="window.location.hash = 'edit-profile'">Edit Profile</button>
                    <button class="btn btn-outline">Change Password</button>
                </div>
            </div>
            
            <div class="profile-card">
                <h3>Account Status</h3>
                <div class="profile-details">
                    <div class="detail-item">
                        <label>Tasks Completed</label>
                        <p>${appData.tasks.completed}</p>
                    </div>
                    <div class="detail-item">
                        <label>Logbooks Submitted</label>
                        <p>${appData.tasks.logbookCompleted}</p>
                    </div>
                    <div class="detail-item">
                        <label>Pending Tasks</label>
                        <p>${appData.tasks.pending}</p>
                    </div>
                    <div class="detail-item">
                        <label>Overdue Tasks</label>
                        <p>${appData.tasks.overdue}</p>
                    </div>
                </div>
            </div>
            
            ${transactions.length > 0 ? `
                <div class="profile-card transaction-history">
                    <h3>Transaction History</h3>
                    <table class="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.map(transaction => `
                                <tr>
                                    <td>${transaction.date}</td>
                                    <td>${transaction.description}</td>
                                    <td>${transaction.amount}</td>
                                    <td>${transaction.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            
            <div class="action-cards">
                <div class="action-card">
                    <i class="ri-vip-crown-line" style="font-size: 40px; color: var(--warning);"></i>
                    <h3>Upgrade to VIP</h3>
                    <p>Unlock all premium features and templates</p>
                    <button class="btn btn-warning" data-page="upgrade">Upgrade Now</button>
                </div>
                <div class="action-card">
                    <i class="ri-refresh-line" style="font-size: 40px; color: var(--danger);"></i>
                    <h3>Reset Demo</h3>
                    <p>Clear all data and reset the application</p>
                    <button class="btn btn-danger" id="reset-demo">Reset</button>
                </div>
            </div>
        </div>
    `;
    
    // Event listener untuk reset demo
    document.getElementById('reset-demo').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    });
    
    // Event listener untuk tombol upgrade
    container.querySelector('.btn-warning').addEventListener('click', function() {
        window.location.hash = 'upgrade';
    });
}

// Render halaman Edit Profile
function renderEditProfilePage(container) {
    const user = appData.user;
    
    container.innerHTML = `
        <div class="edit-profile-form">
            <div class="form-section">
                <h3 class="form-section-title">Profile Information</h3>
                <div class="form-group">
                    <label class="form-label" for="edit-name">Full Name</label>
                    <input type="text" id="edit-name" class="form-input" value="${user.name}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-email">Email</label>
                    <input type="email" id="edit-email" class="form-input" value="${user.email}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-phone">Phone Number</label>
                    <input type="tel" id="edit-phone" class="form-input" value="${user.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-cv">CV Link</label>
                    <input type="url" id="edit-cv" class="form-input" value="${user.cvLink}">
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">Change Password</h3>
                <div class="form-group">
                    <label class="form-label" for="current-password">Current Password</label>
                    <input type="password" id="current-password" class="form-input" placeholder="Enter current password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="new-password">New Password</label>
                    <input type="password" id="new-password" class="form-input" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" class="form-input" placeholder="Confirm new password">
                </div>
            </div>
            
            <div class="payment-actions">
                <button class="btn btn-outline" onclick="window.history.back()">Cancel</button>
                <button class="btn btn-primary" id="save-profile">Save Changes</button>
            </div>
        </div>
    `;
    
    // Event listener untuk save profile
    document.getElementById('save-profile').addEventListener('click', function() {
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const phone = document.getElementById('edit-phone').value;
        const cvLink = document.getElementById('edit-cv').value;
        
        // Update user data
        appData.user.name = name;
        appData.user.email = email;
        appData.user.phone = phone;
        appData.user.cvLink = cvLink;
        appData.user.avatar = name.split(' ').map(n => n[0]).join('');
        
        // Simpan ke localStorage
        localStorage.setItem('app_user', JSON.stringify(appData.user));
        
        // Update sidebar
        document.getElementById('sidebar-user-name').textContent = name;
        document.getElementById('sidebar-avatar').textContent = appData.user.avatar;
        
        alert('Profile updated successfully!');
        window.history.back();
    });
}