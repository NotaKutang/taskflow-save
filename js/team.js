// Render halaman Team Space dengan forum diskusi
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

        <!-- Team Discussion Forum -->
        <div class="team-discussion-section">
            <h3 class="section-title">Team Discussion Forum</h3>
            <div class="discussion-preview" id="discussion-preview">
                <div class="discussion-messages">
                    ${getLastTeamMessages(3).map(msg => `
                        <div class="discussion-message ${msg.sender === 'user' ? 'user-message' : 'team-message'}">
                            <div class="message-sender">${msg.senderName}:</div>
                            <div class="message-text">${msg.message}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="discussion-input-container">
                    <input type="text" class="discussion-input" placeholder="Type your message..." id="discussion-input">
                    <button class="btn-send-discussion" id="btn-send-discussion">
                        <i class="ri-send-plane-line"></i>
                    </button>
                </div>
            </div>
            <div class="discussion-actions">
                <button class="btn btn-primary" id="view-full-discussion">Open Full Discussion</button>
            </div>
        </div>
    `;
    
    // Setup event listeners untuk discussion forum
    setupDiscussionEventListeners();
}

// Ambil pesan terakhir untuk preview
function getLastTeamMessages(limit) {
    const messages = appData.teamChat || [];
    return messages.slice(-limit);
}

// Setup event listeners untuk discussion
function setupDiscussionEventListeners() {
    // Kirim pesan
    document.getElementById('btn-send-discussion').addEventListener('click', sendTeamMessage);
    
    // Enter key
    document.getElementById('discussion-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendTeamMessage();
        }
    });
    
    // Buka full discussion
    document.getElementById('view-full-discussion').addEventListener('click', function() {
        window.location.hash = 'team-discussion';
    });
}

// Kirim pesan ke forum team
function sendTeamMessage() {
    const input = document.getElementById('discussion-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Tambahkan pesan user
    const userMessage = {
        id: Date.now(),
        sender: 'user',
        senderName: 'Jessie Anggasta',
        message: message,
        timestamp: new Date().toISOString()
    };
    
    appData.teamChat.push(userMessage);
    
    // Clear input
    input.value = '';
    
    // Save to localStorage
    localStorage.setItem('app_team_chat', JSON.stringify(appData.teamChat));
    
    // Update UI
    updateDiscussionPreview();
    
    // Auto-reply dari anggota tim
    setTimeout(() => {
        autoReplyTeam();
    }, 1500 + Math.random() * 1000);
}

// Update preview discussion
function updateDiscussionPreview() {
    const container = document.querySelector('.discussion-messages');
    if (!container) return;
    
    container.innerHTML = getLastTeamMessages(3).map(msg => `
        <div class="discussion-message ${msg.sender === 'user' ? 'user-message' : 'team-message'}">
            <div class="message-sender">${msg.senderName}:</div>
            <div class="message-text">${msg.message}</div>
        </div>
    `).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Auto-reply dari anggota tim (bergantian)
function autoReplyTeam() {
    const teamMembers = [
        { id: 2, name: 'Dimas Putra' },
        { id: 3, name: 'Adrian Pratama' },
        { id: 4, name: 'Nazwa Tsabitah' }
    ];
    
    // Ambil counter dan update
    let counter = appData.teamChatAutoReply || 0;
    const replyMember = teamMembers[counter % teamMembers.length];
    
    // Pesan auto-reply
    const autoReplies = [
        "Terima kasih informasinya!",
        "Saya setuju dengan pendapat itu.",
        "Bagus sekali progressnya!",
        "Mari kita diskusikan lebih lanjut.",
        "Saya akan segera kerjakan bagian saya.",
        "Tolong di-check kembali ya.",
        "Sudah saya review, looks good!",
        "Ada yang perlu saya bantu?",
        "Saya ada ide untuk improvement...",
        "Mari kita schedule meeting untuk bahas ini."
    ];
    
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    
    const teamMessage = {
        id: Date.now() + 1,
        sender: replyMember.id.toString(),
        senderName: replyMember.name,
        message: randomReply,
        timestamp: new Date().toISOString()
    };
    
    appData.teamChat.push(teamMessage);
    appData.teamChatAutoReply = counter + 1;
    
    // Save to localStorage
    localStorage.setItem('app_team_chat', JSON.stringify(appData.teamChat));
    localStorage.setItem('app_team_chat_auto_reply', JSON.stringify(appData.teamChatAutoReply));
    
    // Update UI
    updateDiscussionPreview();
}

// Render halaman full team discussion
function renderTeamDiscussionPage(container) {
    container.innerHTML = `
        <div class="team-discussion-full">
            <div class="discussion-header">
                <button class="btn btn-outline btn-back" id="btn-back-discussion">
                    <i class="ri-arrow-left-line"></i> Back
                </button>
                <h2 class="section-title">Team Chat</h2>
            </div>
            
            <div class="team-members-list">
                <h4>Participants:</h4>
                <div class="participants">
                    ${appData.team.map(member => `
                        <div class="participant">
                            <div class="participant-avatar">${member.name.split(' ').map(n => n[0]).join('')}</div>
                            <span>${member.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="discussion-messages-full" id="discussion-messages-full">
                ${(appData.teamChat || []).map(msg => `
                    <div class="discussion-message-full ${msg.sender === 'user' ? 'user-message-full' : 'team-message-full'}">
                        <div class="message-header">
                            <div class="message-avatar">${msg.senderName.split(' ').map(n => n[0]).join('')}</div>
                            <div class="message-info">
                                <div class="message-sender-full">${msg.senderName}</div>
                                <div class="message-time-full">${formatChatTime(msg.timestamp)}</div>
                            </div>
                        </div>
                        <div class="message-text-full">${msg.message}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="discussion-input-full-container">
                <input type="text" class="discussion-input-full" placeholder="Type your message..." id="discussion-input-full">
                <button class="btn-send-discussion-full" id="btn-send-discussion-full">
                    <i class="ri-send-plane-line"></i> Send
                </button>
            </div>
        </div>
    `;
    
    // Scroll to bottom
    const messagesContainer = document.getElementById('discussion-messages-full');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Setup event listeners
    setupFullDiscussionEventListeners();
}

// Setup event listeners untuk full discussion
function setupFullDiscussionEventListeners() {
    // Tombol back
    document.getElementById('btn-back-discussion').addEventListener('click', function() {
        window.history.back();
    });
    
    // Kirim pesan
    document.getElementById('btn-send-discussion-full').addEventListener('click', sendTeamMessageFull);
    
    // Enter key
    document.getElementById('discussion-input-full').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendTeamMessageFull();
        }
    });
}

// Kirim pesan dari full discussion
function sendTeamMessageFull() {
    const input = document.getElementById('discussion-input-full');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Tambahkan pesan user
    const userMessage = {
        id: Date.now(),
        sender: 'user',
        senderName: 'Jessie Anggasta',
        message: message,
        timestamp: new Date().toISOString()
    };
    
    appData.teamChat.push(userMessage);
    
    // Clear input
    input.value = '';
    
    // Save to localStorage
    localStorage.setItem('app_team_chat', JSON.stringify(appData.teamChat));
    
    // Update UI
    updateFullDiscussionMessages();
    
    // Auto-reply dari anggota tim
    setTimeout(() => {
        autoReplyTeamFull();
    }, 1500 + Math.random() * 1000);
}

// Update messages di full discussion
function updateFullDiscussionMessages() {
    const container = document.getElementById('discussion-messages-full');
    if (!container) return;
    
    container.innerHTML = (appData.teamChat || []).map(msg => `
        <div class="discussion-message-full ${msg.sender === 'user' ? 'user-message-full' : 'team-message-full'}">
            <div class="message-header">
                <div class="message-avatar">${msg.senderName.split(' ').map(n => n[0]).join('')}</div>
                <div class="message-info">
                    <div class="message-sender-full">${msg.senderName}</div>
                    <div class="message-time-full">${formatChatTime(msg.timestamp)}</div>
                </div>
            </div>
            <div class="message-text-full">${msg.message}</div>
        </div>
    `).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Auto-reply di full discussion
function autoReplyTeamFull() {
    const teamMembers = [
        { id: 2, name: 'Dimas Putra' },
        { id: 3, name: 'Adrian Pratama' },
        { id: 4, name: 'Nazwa Tsabitah' }
    ];
    
    // Ambil counter dan update
    let counter = appData.teamChatAutoReply || 0;
    const replyMember = teamMembers[counter % teamMembers.length];
    
    // Pesan auto-reply
    const autoReplies = [
        "Terima kasih informasinya!",
        "Saya setuju dengan pendapat itu.",
        "Bagus sekali progressnya!",
        "Mari kita diskusikan lebih lanjut.",
        "Saya akan segera kerjakan bagian saya.",
        "Tolong di-check kembali ya.",
        "Sudah saya review, looks good!",
        "Ada yang perlu saya bantu?",
        "Saya ada ide untuk improvement...",
        "Mari kita schedule meeting untuk bahas ini."
    ];
    
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    
    const teamMessage = {
        id: Date.now() + 1,
        sender: replyMember.id.toString(),
        senderName: replyMember.name,
        message: randomReply,
        timestamp: new Date().toISOString()
    };
    
    appData.teamChat.push(teamMessage);
    appData.teamChatAutoReply = counter + 1;
    
    // Save to localStorage
    localStorage.setItem('app_team_chat', JSON.stringify(appData.teamChat));
    localStorage.setItem('app_team_chat_auto_reply', JSON.stringify(appData.teamChatAutoReply));
    
    // Update UI
    updateFullDiscussionMessages();

}// Format chat timestamp
function formatChatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}