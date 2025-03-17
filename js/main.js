/**
 * Professional animations for portfolio site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initPageLoadAnimations();
    initScrollRevealAnimations();
    initScrollProgress();
    initMobileNavigation();
    initSmoothScrolling();
});

/**
 * Initial page load animations
 */
function initPageLoadAnimations() {
    // Add animation classes to hero elements
    document.querySelector('.hero-content').classList.add('animate-fade-in');
    document.querySelector('.lead-in').classList.add('animate-slide-up');
    document.querySelector('.hero h1').classList.add('animate-slide-up');
    document.querySelector('.hero-subtitle').classList.add('animate-slide-up');
    document.querySelector('.massive-text').classList.add('animate-fade-in');

    // Add animation to nav links
    const navLinks = document.querySelectorAll('.nav-links > a');
    navLinks.forEach(link => {
        link.classList.add('nav-link');
    });

    // Reveal section numbers with animation
    const sectionNumbers = document.querySelectorAll('.section-number');
    sectionNumbers.forEach(number => {
        number.classList.add('animate-fade-in');
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollRevealAnimations() {
    // Elements to animate on scroll
    const elementsToAnimate = [
        { selector: '.feature-box', animation: 'slide-up', stagger: true },
        { selector: '.project-card', animation: 'slide-left', stagger: true },
        { selector: '.pull-quote', animation: 'scale-up', stagger: false },
        { selector: '.contact-item', animation: 'slide-right', stagger: true },
        { selector: '.article-sidebar > *', animation: 'slide-right', stagger: true },
        { selector: '.section-title-container', animation: 'slide-up', stagger: false },
        { selector: 'p.drop-cap', animation: 'slide-up', stagger: false }
    ];

    // Apply reveal classes to elements
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);

        elements.forEach((element, index) => {
            // Add base reveal class
            element.classList.add('reveal-element', item.animation);

            // Add staggered delay if needed
            if (item.stagger) {
                element.style.transitionDelay = `${index * 0.08}s`;
            }
        });
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal-element').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Create a scroll progress indicator
 */
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / height) * 100;

        progressBar.style.width = `${progress}%`;
    });
}

/**
 * Initialize mobile navigation
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
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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