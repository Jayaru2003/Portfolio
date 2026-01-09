// Import Portfolio Data
import portfolioData from './data.js';

// ===== GSAP Initialization =====
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== GSAP Animations =====
function initGSAPAnimations() {
    // Animate hero section on load
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.hero-buttons .btn', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8,
        onComplete: function() {
            const buttons = document.querySelectorAll('.hero-buttons .btn');
            buttons.forEach(btn => {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            });
        }
    });

    gsap.from('.social-links .social-link', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1,
        onComplete: function() {
            const socialLinks = document.querySelectorAll('.social-links .social-link');
            socialLinks.forEach(link => {
                link.style.opacity = '1';
                link.style.visibility = 'visible';
            });
        }
    });

    gsap.from('.floating-card', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1.2
    });

    // Animate floating cards continuously
    gsap.to('.floating-card', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: {
            each: 0.3,
            repeat: -1,
            yoyo: true
        }
    });

    // Section animations on scroll
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate about section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    // Animate stats
    gsap.from('.stat', {
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animate project cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
        },
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        onComplete: function() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            });
        }
    });

    // Animate contact section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -80,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 80,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    // Parallax effect for hero particles
    gsap.to('.hero-particles', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        ease: 'none'
    });

    // Navbar animation on scroll
    ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
            targets: '.navbar',
            className: 'scrolled'
        }
    });
}

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
function loadProfile() {
    const profile = portfolioData.profile;
    
    // Update hero section - Full Name
    if (profile.fullName) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `Hi, I'm <span class="gradient-text">${profile.fullName}</span>`;
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
    
    // Update about description
    if (profile.aboutDescription) {
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        if (aboutParagraphs.length > 0) {
            aboutParagraphs[0].textContent = profile.aboutDescription;
        }
    }
    
    // Update profile image
    if (profile.profileImageUrl) {
        const profileImg = document.querySelector('.profile-img img');
        if (profileImg) {
            // Add cache-busting parameter to force reload
            const imageUrl = profile.profileImageUrl.includes('?') 
                ? `${profile.profileImageUrl}&t=${Date.now()}`
                : `${profile.profileImageUrl}?t=${Date.now()}`;
            
            // Preload image before showing to prevent flash
            const tempImg = new Image();
            tempImg.onload = function() {
                profileImg.src = imageUrl;
                profileImg.style.opacity = '1';
            };
            tempImg.src = imageUrl;
        }
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
    if (profile.emailAddress && socialLinks[2]) {
        socialLinks[2].href = `mailto:${profile.emailAddress}`;
    }
    
    // Update contact section email and phone
    const contactDetails = document.querySelectorAll('.contact-item');
    if (contactDetails.length >= 3) {
        // Location
        if (profile.location && contactDetails[0]) {
            const locationP = contactDetails[0].querySelector('p');
            if (locationP) locationP.textContent = profile.location;
        }
        // Email
        if (profile.emailAddress && contactDetails[1]) {
            const emailP = contactDetails[1].querySelector('p');
            if (emailP) emailP.textContent = profile.emailAddress;
        }
        // Phone
        if (profile.phoneNumber && contactDetails[2]) {
            const phoneP = contactDetails[2].querySelector('p');
            if (phoneP) phoneP.textContent = profile.phoneNumber;
        }
    }
    
    // Update contact section social links
    const contactSocialLinks = document.querySelectorAll('.contact-social a');
    if (profile.githubUrl && contactSocialLinks[0]) {
        contactSocialLinks[0].href = profile.githubUrl;
    }
    if (profile.linkedinUrl && contactSocialLinks[1]) {
        contactSocialLinks[1].href = profile.linkedinUrl;
    }
    if (profile.instagramUrl && contactSocialLinks[2]) {
        contactSocialLinks[2].href = profile.instagramUrl;
    }
    
    // Update about section social links
    const aboutSocialLinks = document.querySelectorAll('.about-social-link');
    if (profile.githubUrl && aboutSocialLinks[0]) {
        aboutSocialLinks[0].href = profile.githubUrl;
    }
    if (profile.linkedinUrl && aboutSocialLinks[1]) {
        aboutSocialLinks[1].href = profile.linkedinUrl;
    }
    if (profile.instagramUrl && aboutSocialLinks[2]) {
        aboutSocialLinks[2].href = profile.instagramUrl;
    }
    
    // Update stats in about section
    const stats = document.querySelectorAll('.about-stats .stat .counter');
    if (profile.projectsCompleted && stats[0]) {
        stats[0].setAttribute('data-target', profile.projectsCompleted);
    }
    if (profile.happyClients && stats[1]) {
        stats[1].setAttribute('data-target', profile.happyClients);
    }
    if (profile.yearsExperience && stats[2]) {
        stats[2].setAttribute('data-target', profile.yearsExperience);
    }
}

// ===== Load Projects =====
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projects = portfolioData.projects;
    
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
                        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link github">
                            <i class="fab fa-github"></i> Code
                        </a>` : ''}
                    ${project.demoUrl ? 
                        `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link demo">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

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
    
    // Simulate form submission (since we don't have a backend)
    setTimeout(() => {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been received. (Note: This is a demo - no actual email sent)';
        
        // Reset form
        contactForm.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // In a real application, you would integrate with a service like:
        // - Formspree (https://formspree.io/)
        // - EmailJS (https://www.emailjs.com/)
        // - Netlify Forms (https://www.netlify.com/products/forms/)
        // - Or your own serverless function
        
        console.log('Form submission:', formData);
    }, 1000);
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
            // Use GSAP for smooth scroll
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Note: GSAP handles scroll animations - old manual animations removed

// ===== Load Skills with Icons =====
function loadSkills() {
    const skills = portfolioData.skills;
    
    // Skill icon mapping
    const skillIcons = {
        'Azure': 'fab fa-microsoft',
        'AWS': 'fab fa-aws',
        'JavaScript': 'fab fa-js',
        'HTML': 'fab fa-html5',
        'Java': 'fab fa-java',
        'Spring Boot': 'fas fa-leaf',
        'Python': 'fab fa-python',
        'C': 'fas fa-copyright',
        'Docker': 'fab fa-docker',
        'Git': 'fab fa-git-alt'
    };
    
    // Helper to create skill HTML with icon
    const createSkillHTML = (skill) => `
        <span class="skill-tag">
            <i class="${skillIcons[skill] || 'fas fa-code'}"></i>
            ${skill}
        </span>
    `;
    
    // Load Cloud skills
    const cloudContainer = document.getElementById('cloudSkills');
    if (cloudContainer && skills.cloud) {
        cloudContainer.innerHTML = skills.cloud.map(createSkillHTML).join('');
    }
    
    // Load Frontend skills
    const frontendContainer = document.getElementById('frontendSkills');
    if (frontendContainer && skills.frontend) {
        frontendContainer.innerHTML = skills.frontend.map(createSkillHTML).join('');
    }
    
    // Load Backend skills
    const backendContainer = document.getElementById('backendSkills');
    if (backendContainer && skills.backend) {
        backendContainer.innerHTML = skills.backend.map(createSkillHTML).join('');
    }
    
    // Load Languages skills
    const languagesContainer = document.getElementById('languagesSkills');
    if (languagesContainer && skills.languages) {
        languagesContainer.innerHTML = skills.languages.map(createSkillHTML).join('');
    }
    
    // Load Tools skills
    const toolsContainer = document.getElementById('toolsSkills');
    if (toolsContainer && skills.tools) {
        toolsContainer.innerHTML = skills.tools.map(createSkillHTML).join('');
    }
    
    console.log('✅ Skills loaded with icons');
}

// ===== Initialize Portfolio =====
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadSkills();
    loadProjects();
    
    // Initialize GSAP animations after a short delay to ensure DOM is ready
    setTimeout(() => {
        initGSAPAnimations();
    }, 100);
    
    console.log('✨ Serverless Portfolio loaded successfully! 🚀');
    console.log('🎬 GSAP animations activated!');
});
