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
 * Add intersection observer for animations (optional enhancement)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations if present
document.addEventListener('DOMContentLoaded', initScrollAnimations);