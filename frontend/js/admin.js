// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// State Management
let currentEditId = null;
let authToken = localStorage.getItem('authToken');
let currentUsername = localStorage.getItem('username');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

function checkAuth() {
    if (authToken && currentUsername) {
        showDashboard();
        loadDashboardData();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminContainer').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';
    document.getElementById('adminUsername').textContent = currentUsername;
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Login Form
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    
    // Project Form
    document.getElementById('projectForm')?.addEventListener('submit', handleProjectSubmit);
}

// ===== Authentication =====
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            authToken = data.token;
            currentUsername = username;
            
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('username', username);
            
            showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                showDashboard();
                loadDashboardData();
            }, 1000);
        } else {
            showMessage(messageDiv, 'Invalid credentials. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage(messageDiv, 'Login failed. Please check if the backend is running.', 'error');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    authToken = null;
    currentUsername = null;
    showLogin();
}

// ===== Tab Navigation =====
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.closest('.tab').classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Load data for the tab
    if (tabName === 'profile') {
        loadProfile();
    } else if (tabName === 'projects') {
        loadProjects();
    } else if (tabName === 'messages') {
        loadMessages();
    } else if (tabName === 'stats') {
        loadStats();
    }
}

// ===== Load Dashboard Data =====
function loadDashboardData() {
    loadProfile();
    loadProjects();
    loadStats();
}

// ===== Profile Management =====
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        
        if (response.ok) {
            const profile = await response.json();
            populateProfileForm(profile);
        } else {
            console.log('No profile found, using defaults');
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function populateProfileForm(profile) {
    document.getElementById('profileId').value = profile.id || '';
    document.getElementById('fullName').value = profile.fullName || '';
    document.getElementById('profileTitle').value = profile.title || '';
    document.getElementById('bio').value = profile.bio || '';
    document.getElementById('aboutDescription').value = profile.aboutDescription || '';
    document.getElementById('profileImageUrl').value = profile.profileImageUrl || '';
    document.getElementById('cvUrl').value = profile.cvUrl || '';
    document.getElementById('githubUrl').value = profile.githubUrl || '';
    document.getElementById('linkedinUrl').value = profile.linkedinUrl || '';
    document.getElementById('twitterUrl').value = profile.twitterUrl || '';
    document.getElementById('emailAddress').value = profile.emailAddress || '';
    document.getElementById('phoneNumber').value = profile.phoneNumber || '';
    document.getElementById('yearsExperience').value = profile.yearsExperience || '';
    document.getElementById('projectsCompleted').value = profile.projectsCompleted || '';
    document.getElementById('happyClients').value = profile.happyClients || '';
}

async function saveProfile() {
    const messageDiv = document.getElementById('profileMessage');
    const profileId = document.getElementById('profileId').value;
    
    const profileData = {
        fullName: document.getElementById('fullName').value,
        title: document.getElementById('profileTitle').value,
        bio: document.getElementById('bio').value,
        aboutDescription: document.getElementById('aboutDescription').value,
        profileImageUrl: document.getElementById('profileImageUrl').value,
        cvUrl: document.getElementById('cvUrl').value,
        githubUrl: document.getElementById('githubUrl').value,
        linkedinUrl: document.getElementById('linkedinUrl').value,
        twitterUrl: document.getElementById('twitterUrl').value,
        emailAddress: document.getElementById('emailAddress').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        yearsExperience: parseInt(document.getElementById('yearsExperience').value) || 0,
        projectsCompleted: parseInt(document.getElementById('projectsCompleted').value) || 0,
        happyClients: parseInt(document.getElementById('happyClients').value) || 0
    };

    try {
        const url = profileId ? `${API_BASE_URL}/profile/${profileId}` : `${API_BASE_URL}/profile`;
        const method = profileId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(profileData)
        });

        if (response.ok) {
            const saved = await response.json();
            document.getElementById('profileId').value = saved.id;
            showMessage(messageDiv, 'Profile updated successfully!', 'success');
            
            // Reload the main portfolio page if open
            setTimeout(() => {
                window.opener?.location.reload();
            }, 1000);
        } else {
            showMessage(messageDiv, 'Failed to save profile', 'error');
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        showMessage(messageDiv, 'Error saving profile', 'error');
    }
}

// ===== Projects Management =====
async function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading projects...</p></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        if (projects.length === 0) {
            projectsList.innerHTML = '<div class="card"><p style="text-align:center;color:#999;">No projects yet. Click "Add New Project" to create one.</p></div>';
            return;
        }
        
        projectsList.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.imageUrl || 'https://via.placeholder.com/400x250'}" 
                     alt="${project.title}" 
                     class="project-image">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description || 'No description'}</p>
                    <div class="project-tech">
                        ${project.techStack ? project.techStack.split(',').map(tech => 
                            `<span class="tech-badge">${tech.trim()}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="project-actions">
                        <button class="btn-edit" onclick="editProject(${project.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-delete" onclick="deleteProject(${project.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsList.innerHTML = '<div class="card"><p style="text-align:center;color:#f5576c;">Failed to load projects.</p></div>';
    }
}

function showAddProject() {
    currentEditId = null;
    document.getElementById('formTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('projectFormCard').style.display = 'block';
    document.getElementById('projectFormCard').scrollIntoView({ behavior: 'smooth' });
}

function hideProjectForm() {
    document.getElementById('projectFormCard').style.display = 'none';
    currentEditId = null;
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const projectData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        imageUrl: document.getElementById('projectImage').value,
        demoUrl: document.getElementById('projectDemo').value,
        githubUrl: document.getElementById('projectGithub').value,
        techStack: document.getElementById('projectTech').value
    };
    
    const projectId = document.getElementById('projectId').value;
    const url = projectId 
        ? `${API_BASE_URL}/projects/${projectId}` 
        : `${API_BASE_URL}/projects`;
    const method = projectId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        
        if (response.ok) {
            hideProjectForm();
            loadProjects();
            showNotification(projectId ? 'Project updated successfully!' : 'Project added successfully!', 'success');
        } else {
            showNotification('Failed to save project', 'error');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        showNotification('Error saving project', 'error');
    }
}

async function editProject(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        const project = await response.json();
        
        document.getElementById('formTitle').textContent = 'Edit Project';
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.imageUrl || '';
        document.getElementById('projectDemo').value = project.demoUrl || '';
        document.getElementById('projectGithub').value = project.githubUrl || '';
        document.getElementById('projectTech').value = project.techStack || '';
        
        document.getElementById('projectFormCard').style.display = 'block';
        document.getElementById('projectFormCard').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading project:', error);
        showNotification('Error loading project', 'error');
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProjects();
            showNotification('Project deleted successfully!', 'success');
        } else {
            showNotification('Failed to delete project', 'error');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('Error deleting project', 'error');
    }
}

// ===== Messages Management =====
async function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading messages...</p></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`);
        const messages = await response.json();
        
        document.getElementById('messageCount').textContent = messages.length;
        
        if (messages.length === 0) {
            messagesList.innerHTML = '<div class="card"><p style="text-align:center;color:#999;">No messages yet.</p></div>';
            return;
        }
        
        messagesList.innerHTML = messages.map(msg => {
            const initial = msg.name.charAt(0).toUpperCase();
            const date = new Date(msg.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div class="message-card">
                    <div class="message-header">
                        <div class="message-sender">
                            <div class="sender-avatar">${initial}</div>
                            <div class="sender-info">
                                <h4>${msg.name}</h4>
                                <span>${msg.email}</span>
                            </div>
                        </div>
                        <div class="message-date">${date}</div>
                    </div>
                    <div class="message-content">
                        <p>${msg.message}</p>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading messages:', error);
        messagesList.innerHTML = '<div class="card"><p style="text-align:center;color:#f5576c;">Failed to load messages.</p></div>';
    }
}

// ===== Statistics =====
async function loadStats() {
    try {
        const [projectsRes, messagesRes] = await Promise.all([
            fetch(`${API_BASE_URL}/projects`),
            fetch(`${API_BASE_URL}/contact`)
        ]);
        
        const projects = await projectsRes.json();
        const messages = await messagesRes.json();
        
        document.getElementById('totalProjects').textContent = projects.length;
        document.getElementById('totalMessages').textContent = messages.length;
        document.getElementById('messageCount').textContent = messages.length;
        
        const today = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        document.getElementById('todayDate').textContent = today;
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ===== Utility Functions =====
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#43e97b' : '#f5576c'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

console.log('Admin panel loaded successfully! 🚀');
