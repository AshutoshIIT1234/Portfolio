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