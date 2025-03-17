/**
 * Main JavaScript functionality for the animation-heavy portfolio site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll progress bar
    createScrollProgressBar();

    // Create background particles
    createParticles();

    // Mobile navigation toggle
    initMobileNavigation();

    // Detect support for hover
    detectHoverSupport();

    // Smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize animations
    initAnimations();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize text splitting animations
    initTextSplitting();

    // Initialize 3D card effect
    init3DCardEffect();
});

/**
 * Create progress bar that shows scroll position
 */
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
}

/**
 * Create floating particles in the background
 */
function createParticles() {
    const particleCount = 20;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 10 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 5;

        // Set random positions for the bezier animation
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y2 = Math.random() * 100;
        const x3 = Math.random() * 100;
        const y3 = Math.random() * 100;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty('--x1', `${x1 - x}%`);
        particle.style.setProperty('--y1', `${y1 - y}%`);
        particle.style.setProperty('--x2', `${x2 - x}%`);
        particle.style.setProperty('--y2', `${y2 - y}%`);
        particle.style.setProperty('--x3', `${x3 - x}%`);
        particle.style.setProperty('--y3', `${y3 - y}%`);

        // Animation
        particle.style.animation = `moveParticle ${duration}s ease-in-out ${delay}s infinite`;

        container.appendChild(particle);
    }
}

/**
 * Initialize mobile navigation menu
 */
function initMobileNavigation() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // Toggle scroll on body when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Detect if the device supports hover interactions
 */
function detectHoverSupport() {
    function updateHoverClass() {
        const hasHover = window.matchMedia('(hover: hover)').matches;
        document.body.classList.toggle('has-hover', hasHover);
    }

    // Call initially and on window resize
    updateHoverClass();
    window.addEventListener('resize', updateHoverClass);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize text splitting animations (letter by letter)
 */
function initTextSplitting() {
    document.querySelectorAll('.split-letters').forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        // Split text into individual spans for animation
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${0.05 * i}s`;
            element.appendChild(span);
        }
    });
}

/**
 * Initialize 3D card effect
 */
function init3DCardEffect() {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;

            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Add class to feature boxes for the 3D effect
    document.querySelectorAll('.feature-box').forEach(box => {
        box.classList.add('card-3d');
    });
}

/**
 * Initialize page load animations
 */
function initAnimations() {
    // Add dynamic section number effect
    document.querySelectorAll('.section-number').forEach(num => {
        // Extract the number from the element
        const number = num.textContent;
        // Set data attribute for the large background number
        num.setAttribute('data-number', number);
    });

    // Add animation classes to elements
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.querySelector('h1').classList.add('split-letters');
        setTimeout(() => {
            hero.querySelector('h1').classList.add('revealed');
        }, 300);

        hero.querySelector('.hero-subtitle').classList.add('typing-effect');
        hero.querySelector('.lead-in').classList.add('slideIn');
    }

    // Add section transition effects
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-transition');
    });

    // Add stagger animations to nav links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.add('stagger-children');
    }

    // Add animated underline to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.add('animated-underline');
    });

    // Reveal section numbers
    setTimeout(() => {
        document.querySelectorAll('.section-number').forEach(num => {
            num.classList.add('revealed');
        });
    }, 500);

    // Reveal sections
    setTimeout(() => {
        document.querySelectorAll('.section-transition').forEach(section => {
            section.classList.add('revealed');
        });
    }, 800);

    // Line-by-line text reveal
    document.querySelectorAll('.reveal-text').forEach(element => {
        const textContent = element.innerHTML;
        element.innerHTML = `<span>${textContent}</span>`;
        setTimeout(() => {
            element.classList.add('revealed');
        }, 800);
    });

    // Make fascination intro a typing effect
    const fascintro = document.querySelector('.fascination-intro');
    if (fascintro) {
        fascintro.classList.add('typing-effect');
    }
}

/**
 * Add intersection observer for scroll animations
 */
function initScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.feature-box').forEach((element, index) => {
        const animations = ['slide-up', 'scale-in', 'rotate-in'];
        const randomAnimation = animations[index % animations.length];
        element.classList.add('animate-on-scroll', randomAnimation);
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.project-card').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-left');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.pull-quote').forEach(element => {
        element.classList.add('animate-on-scroll', 'fade-in');
    });

    document.querySelectorAll('.contact-item').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-right');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.split-letters, .reveal-text').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Add animation to sidebar elements
    document.querySelectorAll('.article-sidebar > *').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-right');
        element.style.transitionDelay = `${0.2 + (index * 0.2)}s`;
    });

    // Create intersection observer with options for different thresholds
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // Create observer for regular animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('split-letters') ||
                    entry.target.classList.contains('reveal-text')) {
                    entry.target.classList.add('revealed');
                }
                // Once the animation has played, we can unobserve the element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer for section numbers and transitions
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Observe sections and section numbers
    document.querySelectorAll('.section-number, .section-transition').forEach(element => {
        sectionObserver.observe(element);
    });
}