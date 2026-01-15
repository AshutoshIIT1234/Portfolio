// import { gsap } from "gsap";

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked and add smooth scrolling
    navLinksItems.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');

            // Smooth scroll to the section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event to change navbar background opacity and highlight active section
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for better active state

        // Change navbar background opacity
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Highlight active section in navbar
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    });

    // Set initial active state
    const setInitialActive = () => {
        const firstSection = document.querySelector('section[id]');
        if (firstSection) {
            const firstSectionId = firstSection.getAttribute('id');
            document.querySelector(`.nav-links a[href="#${firstSectionId}"]`)?.classList.add('active');
        }
    };

    setInitialActive();
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7
    });
});
// Projects section animation
gsap.to('.project-grid', {
    scrollTrigger: {
        trigger: '.project-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1
});

// Section title animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
});

gsap.to('.skills-grid', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1
});

// Timeline animations (Education, Experience, Projects)
gsap.utils.toArray('.timeline').forEach(timeline => {
    gsap.to(timeline, {
        scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
});

// Contact section animation
gsap.from('.contact-content', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 1
});

// Resume section animation
gsap.to('.resume-content', {
    scrollTrigger: {
        trigger: '.resume-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1
});

gsap.to('.download-btn', {
    scrollTrigger: {
        trigger: '.resume',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3
});

// Remove Three.js project card initialization block