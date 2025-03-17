/**
 * Main JavaScript functionality for the portfolio site
 */

document.addEventListener('DOMContentLoaded', function() {
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
});

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
 * Initialize page load animations
 */
function initAnimations() {
    // Add animation classes to elements
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.querySelector('h1').classList.add('fadeIn');
        hero.querySelector('.hero-subtitle').classList.add('slideUp');
        hero.querySelector('.lead-in').classList.add('slideIn');
    }

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

    // Add typing animation to fascination intro
    const fascintro = document.querySelector('.fascination-intro');
    if (fascintro) {
        fascintro.classList.add('typing-animation');
    }
}

/**
 * Add intersection observer for scroll animations
 */
function initScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.feature-box').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-up');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.project-card').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-left');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.pull-quote').forEach(element => {
        element.classList.add('animate-on-scroll', 'fade-in');
    });

    document.querySelectorAll('.contact-item').forEach((element, index) => {
        element.classList.add('animate-on-scroll', 'slide-right');
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.15}s`;
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Once the animation has played, we can unobserve the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}