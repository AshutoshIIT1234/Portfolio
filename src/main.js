/**
 * Main JavaScript - Animations & Interactions
 * Ashutosh Kumar Tripathi Portfolio
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initSmoothScroll();
    initProjectHover();
    initGitHubCalendar();
    initBlogAnimations();
    initChatbot();
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Background change on scroll
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScrollY = currentScrollY;
    });
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
        .to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3
        })
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.4')
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.6')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.4')
        .to('.hero-domains', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.4')
        .to('.domain-tag', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.4');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // About section
    gsap.to('.about-content', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // About cards stagger
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Experience items
    gsap.utils.toArray('.experience-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Flagship project
    gsap.to('.flagship-project', {
        scrollTrigger: {
            trigger: '.flagship-project',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Project cards stagger
    gsap.to('.projects-grid', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Skills constellation
    gsap.to('.skills-constellation', {
        scrollTrigger: {
            trigger: '.skills-constellation',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.skill-cluster').forEach((cluster, i) => {
        gsap.from(cluster, {
            scrollTrigger: {
                trigger: cluster,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Contact section
    gsap.to('.contact-title', {
        scrollTrigger: {
            trigger: '.contact-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.to('.contact-subtitle', {
        scrollTrigger: {
            trigger: '.contact-subtitle',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
    });

    gsap.to('.contact-cta', {
        scrollTrigger: {
            trigger: '.contact-cta',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.to('.contact-links', {
        scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// PROJECT CARD HOVER EFFECTS
// ============================================

function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Skill nodes interactive effect
    const skillNodes = document.querySelectorAll('.skill-node');

    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            gsap.to(node, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        node.addEventListener('mouseleave', () => {
            gsap.to(node, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn.querySelector('svg'), {
                x: 3,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn.querySelector('svg'), {
                x: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// GITHUB CALENDAR
// ============================================

async function initGitHubCalendar() {
    const calendarContainer = document.getElementById('github-calendar');
    const username = 'AshutoshIIT1234';

    if (!calendarContainer) return;

    // Add scroll animation for GitHub activity section
    gsap.to('.github-activity-wrapper', {
        scrollTrigger: {
            trigger: '.github-activity-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    try {
        // Fetch GitHub contribution data using a proxy service
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub data');
        }

        const data = await response.json();

        // Render the calendar
        renderContributionCalendar(calendarContainer, data);

        // Update stats
        updateGitHubStats(data, username);

    } catch (error) {
        console.error('GitHub Calendar Error:', error);
        // Fallback: Generate a placeholder calendar
        renderPlaceholderCalendar(calendarContainer);
    }
}

function renderContributionCalendar(container, data) {
    const contributions = data.contributions || [];

    if (contributions.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-tertiary);">No contribution data available</p>';
        return;
    }

    // GitHub organizes contributions by week (columns), each week has 7 days (rows)
    // The first day should align to the correct day of week
    const weeks = [];
    let currentWeek = [];

    // Get the day of week for the first contribution (0 = Sunday, 6 = Saturday)
    const firstDate = new Date(contributions[0].date);
    const firstDayOfWeek = firstDate.getDay();

    // Add empty cells for days before the first contribution in that week
    for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null);
    }

    contributions.forEach((day, index) => {
        currentWeek.push(day);

        // Each week has 7 days
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    // Push the last incomplete week if exists
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    // Generate month labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthLabels = '';
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
        // Find the first valid day in the week to get the month
        const validDay = week.find(d => d !== null);
        if (validDay) {
            const date = new Date(validDay.date);
            const month = date.getMonth();
            if (month !== lastMonth) {
                // Calculate position (each week is about 12px + 3px gap = 15px)
                monthLabels += `<span class="month-label" style="grid-column: ${weekIndex + 1};">${months[month]}</span>`;
                lastMonth = month;
            }
        }
    });

    let html = `
        <div class="github-graph">
            <div class="graph-months">${monthLabels}</div>
            <div class="graph-container">
                <div class="graph-days">
                    <span></span>
                    <span>Mon</span>
                    <span></span>
                    <span>Wed</span>
                    <span></span>
                    <span>Fri</span>
                    <span></span>
                </div>
                <div class="graph-weeks">
    `;

    weeks.forEach(week => {
        html += '<div class="graph-week">';
        week.forEach(day => {
            if (day === null) {
                html += '<div class="graph-day empty"></div>';
            } else {
                const level = getContributionLevel(day.count);
                const date = new Date(day.date);
                const formattedDate = date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                const tooltip = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formattedDate}`;

                html += `<div class="graph-day" data-level="${level}" data-tooltip="${tooltip}"></div>`;
            }
        });
        html += '</div>';
    });

    html += `
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Subtle animation
    gsap.from('.graph-day:not(.empty)', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.001,
        ease: 'power2.out'
    });
}

function getContributionLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}

function renderPlaceholderCalendar(container) {
    // Generate a placeholder calendar with random data
    let html = `
        <div class="calendar-days-wrapper">
            <div class="day-labels">
                <span class="day-label"></span>
                <span class="day-label">Mon</span>
                <span class="day-label"></span>
                <span class="day-label">Wed</span>
                <span class="day-label"></span>
                <span class="day-label">Fri</span>
                <span class="day-label"></span>
            </div>
            <div class="contribution-grid">
    `;

    // Generate 52 weeks of placeholder data
    for (let week = 0; week < 52; week++) {
        html += '<div class="contribution-week">';
        for (let day = 0; day < 7; day++) {
            const level = Math.floor(Math.random() * 5);
            html += `<div class="contribution-day" data-level="${level}" data-tooltip="Contribution data"></div>`;
        }
        html += '</div>';
    }

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
}

async function updateGitHubStats(data, username) {
    // Calculate total contributions
    const totalContributions = data.total?.lastYear ||
        data.contributions?.reduce((sum, day) => sum + day.count, 0) || 0;

    const totalContributionsEl = document.getElementById('total-contributions');
    if (totalContributionsEl) {
        animateNumber(totalContributionsEl, totalContributions);
    }

    // Fetch additional GitHub stats
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (userResponse.ok) {
            const userData = await userResponse.json();

            const publicReposEl = document.getElementById('public-repos');
            if (publicReposEl) {
                animateNumber(publicReposEl, userData.public_repos);
            }
        }

        // Fetch repos to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

            const totalStarsEl = document.getElementById('total-stars');
            if (totalStarsEl) {
                animateNumber(totalStarsEl, totalStars);
            }
        }
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
    }
}

function animateNumber(element, target) {
    const duration = 1500;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easeOut * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// LOADING COMPLETE
// ============================================

window.addEventListener('load', () => {
    // Remove loading state if any
    document.body.classList.add('loaded');

    // Refresh ScrollTrigger after everything loads
    ScrollTrigger.refresh();
});

// ============================================
// BLOG ANIMATIONS
// ============================================

function initBlogAnimations() {
    // Blog grid animation
    gsap.to('.blog-grid', {
        scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Blog cards stagger animation
    gsap.utils.toArray('.blog-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Toggle chatbot
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotInput.focus();
                // Play entrance animation
                animateRobotEntrance();
            }
        });
    }

    // Close chatbot
    if (chatbotClose && chatbotContainer) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Animate robot thinking
        animateRobotThinking();

        // Generate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
            // Animate robot response
            animateRobotResponse();
        }, 500);
    }

    // Send on button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    // Send on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Robot animation functions
    function animateRobotEntrance() {
        const avatar = document.querySelector('.chatbot-avatar');
        if (avatar) {
            gsap.fromTo(avatar, 
                { scale: 0.5, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
            );
        }
    }

    function animateRobotThinking() {
        const avatar = document.querySelector('.chatbot-avatar');
        if (avatar) {
            gsap.to(avatar, {
                rotation: 360,
                duration: 1,
                ease: 'power2.inOut',
                repeat: 1,
                yoyo: true
            });
        }
    }

    function animateRobotResponse() {
        const avatar = document.querySelector('.chatbot-avatar');
        if (avatar) {
            gsap.to(avatar, {
                scale: 1.2,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }
    }

    // Add hover effects to robot
    const avatar = document.querySelector('.chatbot-avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            gsap.to(avatar, {
                rotation: 15,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        avatar.addEventListener('mouseleave', () => {
            gsap.to(avatar, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    // Add interactive effects to toggle button
    if (chatbotToggle) {
        chatbotToggle.addEventListener('mouseenter', () => {
            gsap.to(chatbotToggle, {
                rotation: 10,
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        chatbotToggle.addEventListener('mouseleave', () => {
            gsap.to(chatbotToggle, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    // Generate bot response based on knowledge base
    function generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Knowledge base about Ashutosh Kumar Tripathi
        const knowledgeBase = {
            // Personal Information
            name: "Ashutosh Kumar Tripathi",
            education: "I'm a 3rd-year B.Sc. student in Computer Science and Data Analytics at IIT Patna, maintaining a strong CPI of 8.6.",
            location: "I'm currently based in India, studying at IIT Patna.",
            availability: "Yes, Ashutosh is currently available for opportunities! He's actively looking for full-time roles and internships in AI/ML and Full Stack Development.",
            
            // Skills
            skills: "Ashutosh is proficient in AI & Machine Learning (PyTorch, Scikit-learn, Keras, CNN/RNN, LLMs, Hugging Face), Web Development (React, Next.js, React Native, Node.js, Express.js, Three.js), and Tools & Databases (Python, JavaScript, PostgreSQL, NeonDB, Firebase, Git).",
            ai_ml: "Ashutosh has strong expertise in AI & Machine Learning, including PyTorch, Scikit-learn, Keras, CNN/RNN architectures, LLMs & GPT, and Hugging Face. He's built multiple AI-powered systems including Sahayak AI, TaskFlow AI, and a YouTube Sentiment Analyzer.",
            web_dev: "Ashutosh is expert in Web Development with React, Next.js, React Native, Node.js, and Express.js. He has experience building full-stack applications with modern frameworks and scalable architectures.",
            
            // Experience
            experience: "Ashutosh has experience as a Full Stack Intern at Nextute (Aug 2024 – Oct 2024) where he built dynamic web modules using Next.js, React, and Express.js, integrated NeonDB for database management, and designed scalable REST APIs.",
            internship: "Ashutosh worked as a Full Stack Intern at Nextute from August to October 2024. He built and deployed dynamic web modules, integrated NeonDB for real-time data updates, and collaborated with the backend team to improve performance.",
            
            // Projects
            projects: "Ashutosh has built 10+ projects including Sahayak AI (flagship EdTech platform), TaskFlow AI (AI project management), JARVIS (voice assistant), YouTube Sentiment Analyzer, Anime Recommendation System, and more.",
            flagship: "Sahayak AI is Ashutosh's flagship project - an intelligent platform for the Indian education sector that automates lesson planning, assessment creation, and paper digitization. It's trusted by 5,000+ educators and saves 10+ hours per week.",
            sahayak: "Sahayak AI is an AI-powered EdTech platform that automates critical tasks for educators including lesson planning, assessment creation, and paper digitization. Built with React, Next.js, Python, GPT-4, and Firebase.",
            taskflow: "TaskFlow AI is an AI-first Project Management app with intelligent task prioritization, automated status updates, and predictive risk reporting. Built with React, Node.js, and ML.",
            
            // Contact
            contact: "You can reach Ashutosh via email at ashutosh_2312res192@iitp.ac.in, phone at +91 8787262605, LinkedIn at linkedin.com/in/ashutosh-kumar-tripathi-926308237, or GitHub at github.com/AshutoshIIT1234.",
            email: "Ashutosh's email is ashutosh_2312res192@iitp.ac.in",
            phone: "Ashutosh's phone number is +91 8787262605",
            linkedin: "You can find Ashutosh on LinkedIn: linkedin.com/in/ashutosh-kumar-tripathi-926308237",
            github: "Ashutosh's GitHub profile is github.com/AshutoshIIT1234",
            
            // Resume
            resume: "You can download Ashutosh's resume from the website. Just click the 'Resume' button in the navigation bar.",
            
            // General
            hello: "Hello! I'm Ashutosh's AI assistant. How can I help you learn more about his skills, experience, or projects?",
            hi: "Hi there! I'm here to help you learn about Ashutosh. What would you like to know?",
            thanks: "You're welcome! Feel free to ask if you have any more questions about Ashutosh.",
            bye: "Goodbye! Feel free to reach out if you have more questions about Ashutosh in the future.",
            help: "I can help you with information about Ashutosh's skills, experience, projects, education, contact details, and more. Just ask me anything!",
            
            // Recruiter specific
            hire: "Ashutosh would be a great addition to your team! With his strong background in AI/ML and Full Stack Development, experience building production-ready systems, and excellent academic record (8.6 CPI at IIT Patna), he brings both technical expertise and practical problem-solving skills.",
            why_hire: "Ashutosh combines strong technical skills in AI/ML and Full Stack Development with practical experience building production-ready systems. His flagship project Sahayak AI impacts 5,000+ users, demonstrating his ability to create scalable solutions. With an 8.6 CPI at IIT Patna and experience at Nextute, he's well-equipped to contribute immediately to your team.",
            salary: "For salary expectations and availability details, please contact Ashutosh directly at ashutosh_2312res192@iitp.ac.in. He's open to discussing opportunities that align with his skills in AI/ML and Full Stack Development.",
            
            // Default
            default: "I'm not sure about that specific question, but I can help you with information about Ashutosh's skills, experience, projects, education, or contact details. What would you like to know?"
        };

        // Check for keywords in user message
        if (lowerMessage.includes('name') || lowerMessage.includes('who')) {
            return knowledgeBase.name;
        } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('university') || lowerMessage.includes('iit')) {
            return knowledgeBase.education;
        } else if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based')) {
            return knowledgeBase.location;
        } else if (lowerMessage.includes('available') || lowerMessage.includes('opportunity') || lowerMessage.includes('job') || lowerMessage.includes('position')) {
            return knowledgeBase.availability;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
            return knowledgeBase.skills;
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
            return knowledgeBase.ai_ml;
        } else if (lowerMessage.includes('web') || lowerMessage.includes('frontend') || lowerMessage.includes('backend') || lowerMessage.includes('full stack')) {
            return knowledgeBase.web_dev;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('intern')) {
            return knowledgeBase.experience;
        } else if (lowerMessage.includes('nextute')) {
            return knowledgeBase.internship;
        } else if (lowerMessage.includes('project')) {
            return knowledgeBase.projects;
        } else if (lowerMessage.includes('flagship') || lowerMessage.includes('best')) {
            return knowledgeBase.flagship;
        } else if (lowerMessage.includes('sahayak')) {
            return knowledgeBase.sahayak;
        } else if (lowerMessage.includes('taskflow')) {
            return knowledgeBase.taskflow;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
            return knowledgeBase.contact;
        } else if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
            return knowledgeBase.email;
        } else if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('mobile')) {
            return knowledgeBase.phone;
        } else if (lowerMessage.includes('linkedin')) {
            return knowledgeBase.linkedin;
        } else if (lowerMessage.includes('github')) {
            return knowledgeBase.github;
        } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return knowledgeBase.resume;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return knowledgeBase.hello;
        } else if (lowerMessage.includes('hi')) {
            return knowledgeBase.hi;
        } else if (lowerMessage.includes('thank')) {
            return knowledgeBase.thanks;
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return knowledgeBase.bye;
        } else if (lowerMessage.includes('help')) {
            return knowledgeBase.help;
        } else if (lowerMessage.includes('hire') || lowerMessage.includes('recruit')) {
            return knowledgeBase.hire;
        } else if (lowerMessage.includes('why') && (lowerMessage.includes('hire') || lowerMessage.includes('choose'))) {
            return knowledgeBase.why_hire;
        } else if (lowerMessage.includes('salary') || lowerMessage.includes('compensation') || lowerMessage.includes('pay')) {
            return knowledgeBase.salary;
        } else {
            return knowledgeBase.default;
        }
    }
}