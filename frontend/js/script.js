// Import API Configuration
import API_BASE_URL from './config.js';

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Hamburger Menu Toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Typing Effect =====
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Problem Solver', 'Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

setTimeout(type, 1000);

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    });
}

// Trigger counter animation when About section is in view
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    observer.observe(aboutSection);
}

// ===== Load Profile =====
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        if (response.ok) {
            const profile = await response.json();
            updateProfileUI(profile);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function updateProfileUI(profile) {
    // Update hero section - Full Name
    if (profile.fullName) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const typingText = heroTitle.querySelector('.typing-text');
            if (typingText) {
                heroTitle.innerHTML = `Hi, I'm <span class="gradient-text">${profile.fullName}</span>`;
            }
        }
    }
    
    // Update hero title/position
    if (profile.title) {
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) heroDesc.textContent = profile.title;
    }
    
    // Update hero bio
    if (profile.bio) {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = profile.bio;
    }
    
    // Update about section heading
    if (profile.fullName) {
        const aboutHeading = document.querySelector('.about-text h3');
        if (aboutHeading) aboutHeading.textContent = `Hello! I'm ${profile.fullName}`;
    }
    
    // Update about description - update both paragraphs or first one
    if (profile.aboutDescription) {
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        if (aboutParagraphs.length > 0) {
            aboutParagraphs[0].textContent = profile.aboutDescription;
        }
    }
    
    // Update profile image
    if (profile.profileImageUrl) {
        const profileImg = document.querySelector('.profile-img img');
        if (profileImg) profileImg.src = profile.profileImageUrl;
    }
    
    // Update CV link
    if (profile.cvUrl) {
        const cvBtn = document.querySelector('.about-text .btn-primary');
        if (cvBtn) cvBtn.href = profile.cvUrl;
    }
    
    // Update social links in hero section
    const socialLinks = document.querySelectorAll('.social-links a');
    if (profile.githubUrl && socialLinks[0]) {
        socialLinks[0].href = profile.githubUrl;
    }
    if (profile.linkedinUrl && socialLinks[1]) {
        socialLinks[1].href = profile.linkedinUrl;
    }
    if (profile.twitterUrl && socialLinks[2]) {
        socialLinks[2].href = profile.twitterUrl;
    }
    if (profile.emailAddress && socialLinks[3]) {
        socialLinks[3].href = `mailto:${profile.emailAddress}`;
    }
    
    // Update stats in about section
    const stats = document.querySelectorAll('.about-stats .stat .counter');
    if (profile.projectsCompleted && stats[0]) {
        stats[0].setAttribute('data-target', profile.projectsCompleted);
        stats[0].textContent = '0';
    }
    if (profile.happyClients && stats[1]) {
        stats[1].setAttribute('data-target', profile.happyClients);
        stats[1].textContent = '0';
    }
    if (profile.yearsExperience && stats[2]) {
        stats[2].setAttribute('data-target', profile.yearsExperience);
        stats[2].textContent = '0';
    }
    
    // Re-trigger counter animation
    animateCountersAgain();
}

function animateCountersAgain() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    });
}

// ===== Load Projects from API =====
async function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="loading">
                    <p>No projects available yet. Check back soon!</p>
                </div>
            `;
            return;
        }
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.imageUrl || 'https://via.placeholder.com/400x250'}" 
                     alt="${project.title}" 
                     class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    <div class="project-tech">
                        ${project.techStack ? project.techStack.split(',').map(tech => 
                            `<span class="tech-tag">${tech.trim()}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="project-links">
                        ${project.githubUrl ? 
                            `<a href="${project.githubUrl}" target="_blank" class="project-link github">
                                <i class="fab fa-github"></i> Code
                            </a>` : ''}
                        ${project.demoUrl ? 
                            `<a href="${project.demoUrl}" target="_blank" class="project-link demo">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="loading">
                <p style="color: var(--accent-color);">
                    <i class="fas fa-exclamation-circle"></i> 
                    Unable to load projects. Please try again later.
                </p>
            </div>
        `;
    }
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadProjects();
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scroll for all links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Animate elements on scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animation
document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Add parallax effect to hero section =====
const heroParticles = document.querySelector('.hero-particles');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('Portfolio website loaded successfully! 🚀');
