// ========================================
// LOCOMOTIVE SCROLL INITIALIZATION
// ========================================

let locoScroll;

// Detect mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmallScreen = window.innerWidth <= 768;

function initSmoothScroll() {
    // Always initialize Locomotive Scroll but use native scroll on mobile
    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true, // Enable smooth scroll on all screens
        smoothMobile: true, // Enable smooth scroll on mobile
        multiplier: 1.0,
        lerp: 0.1,
        class: 'is-inview',
        repeat: false,
        reloadOnContextChange: true,
        touchMultiplier: 2.5,
        firefoxMultiplier: 50,
        smartphone: {
            smooth: true, // Enable smooth scroll on smartphones
            breakpoint: 0 // Apply to all sizes
        },
        tablet: {
            smooth: true, // Enable smooth scroll on tablets
            breakpoint: 0 // Apply to all sizes
        }
    });

    // Update scroll on window resize
    window.addEventListener('resize', () => {
        if (locoScroll) {
            locoScroll.update();
        }
    });

    // Refresh scroll after images load
    window.addEventListener('load', () => {
        if (locoScroll) {
            locoScroll.update();
        }
    });

    return locoScroll;
}

// ========================================
// TEXT SPLIT ANIMATIONS
// ========================================

function initTextAnimations() {
    // Full character animation on all devices
    // Removed mobile-specific simplified animation block

    // Full character animation on desktop
    const heroTitleLines = document.querySelectorAll('.hero-title-line');
    heroTitleLines.forEach((line, index) => {
        const text = new SplitType(line, { types: 'chars' });
        line.classList.add('split-text');

        // Animate in with delay
        setTimeout(() => {
            line.classList.add('is-inview');
        }, 300 + (index * 200));
    });

    // Split section titles for scroll reveal (desktop only)
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const text = new SplitType(title, { types: 'chars, words' });
        title.classList.add('split-text');
    });

    // Split about heading
    const aboutHeading = document.querySelector('.about-heading');
    if (aboutHeading) {
        const text = new SplitType(aboutHeading, { types: 'words' });
    }
}

// ========================================
// SCROLL-TRIGGERED ANIMATIONS
// ========================================

function initScrollAnimations() {
    // Use Intersection Observer for mobile compatibility
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-inview');
            }
        });
    }, observerOptions);

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        scrollObserver.observe(title);
    });

    // Observe all data-scroll elements
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe sections
    const sections = document.querySelectorAll('[data-scroll-section]');
    sections.forEach(section => {
        section.classList.add('fade-in-scroll');
        scrollObserver.observe(section);
    });
}

// ========================================
// ENHANCED NAVIGATION
// ========================================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// Enhanced scroll effect for navigation - works on both Locomotive and native scroll
function handleNavScroll() {
    const scrollY = window.pageYOffset || window.scrollY;
    if (scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Use Locomotive scroll events if available
if (locoScroll) {
    locoScroll.on('scroll', (args) => {
        if (args.scroll.y > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
} else {
    // Fallback to native scroll for mobile
    window.addEventListener('scroll', handleNavScroll);
}

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links with Locomotive
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target && locoScroll) {
                locoScroll.scrollTo(target, {
                    duration: 1500,
                    easing: [0.25, 0.0, 0.35, 1.0],
                    offset: -80
                });
            } else if (target) {
                // Fallback for native scroll (mobile)
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// SCROLL INDICATOR CLICK TO SCROLL
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            if (locoScroll && !isSmallScreen) {
                // Use Locomotive Scroll on desktop
                locoScroll.scrollTo(aboutSection, {
                    duration: 1500,
                    easing: [0.25, 0.0, 0.35, 1.0],
                    offset: -80
                });
            } else {
                // Use native smooth scroll on mobile
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Add pulsing animation to make it more noticeable
    scrollIndicator.style.animation = 'fadeInUp 0.8s ease 1s forwards, pulse 2s ease-in-out 2s infinite';
}

// Add pulse animation to stylesheet dynamically
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        50% {
            opacity: 0.7;
            transform: translateX(-50%) translateY(-10px);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ========================================
// THEME TOGGLE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Theme toggle event listener
themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 400);

    // Update Locomotive Scroll after theme change
    setTimeout(() => {
        if (locoScroll) locoScroll.update();
    }, 500);
});

// ========================================
// MAGNETIC BUTTON EFFECT (Desktop Only)
// ========================================

function initMagneticButtons() {
    // Skip magnetic effect on touch devices
    if (isTouch || isMobile) {
        return;
    }

    const magneticElements = document.querySelectorAll('.btn, .social-link, .music-card, .video-card, .gallery-item');

    magneticElements.forEach(el => {
        el.classList.add('magnetic');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// RIPPLE EFFECT ON BUTTONS
// ========================================

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

const buttons = document.querySelectorAll('.btn, .social-link');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasK = text.includes('K');
                const number = parseInt(text.replace(/\D/g, ''));

                let current = 0;
                const duration = 2000;
                const increment = number / (duration / 16);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + (hasK ? 'K' : '') + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (hasK ? 'K' : '') + (hasPlus ? '+' : '');
                    }
                }, 16);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ========================================
// SOCIAL LINKS
// ========================================

const socialLinks = {
    instagram: 'https://www.instagram.com/sameekshamusic/?igsh=MTYyNzVuc21nZmE5OQ%3D%3D&utm_source=qr#',
    youtube: 'https://www.youtube.com/@sameekshapatil9',
    spotify: 'https://open.spotify.com/artist/sameekshapatil',
    twitter: 'https://twitter.com/sameekshamusic'
};

document.getElementById('instagramLink')?.setAttribute('href', socialLinks.instagram);
document.getElementById('youtubeLink')?.setAttribute('href', socialLinks.youtube);
document.getElementById('spotifyLink')?.setAttribute('href', socialLinks.spotify);
document.getElementById('twitterLink')?.setAttribute('href', socialLinks.twitter);

document.querySelectorAll('.social-link').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========================================
// PARALLAX EFFECT FOR HERO VIDEO
// ========================================

function initParallaxEffects() {
    // Enable parallax on all devices with Locomotive smooth scroll
    if (!locoScroll) return;

    locoScroll.on('scroll', (args) => {
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            const scrolled = args.scroll.y;
            heroVideo.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0003})`;
        }
    });
}

// ========================================
// LAZY LOAD OPTIMIZATION
// ========================================

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');

    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
                lazyLoadObserver.unobserve(element);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));
    lazyVideos.forEach(video => lazyLoadObserver.observe(video));
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Initializing premium animations...');

    // Initialize smooth scroll
    initSmoothScroll();

    // Wait for locomotive to be ready
    setTimeout(() => {
        initTextAnimations();
        initScrollAnimations();
        initMagneticButtons();
        initParallaxEffects();
        initLazyLoad();

        console.log('🎬 All animations initialized!');

        // Final update
        if (locoScroll) {
            locoScroll.update();
        }
    }, 100);
});

// Update on window load (for images)
window.addEventListener('load', () => {
    if (locoScroll) {
        setTimeout(() => {
            locoScroll.update();
        }, 500);
    }
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (locoScroll) locoScroll.stop();
    } else {
        if (locoScroll) locoScroll.start();
    }
});
