// ===================================
// Global Variables
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const scrollProgress = document.getElementById('scrollProgress');
const scrollTopBtn = document.getElementById('scrollTop');

// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress indicator
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ===================================
// Smooth Scroll Navigation
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===================================
// Scroll to Top Button
// ===================================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Hero Stats Counter Animation
// ===================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.floor(current);
                        setTimeout(updateCount, 20);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };

                updateCount();
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// ===================================
// Modal Functionality
// ===================================
const modal = document.getElementById('membershipModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalPlan = document.getElementById('modalPlan');

// Function to open modal
function openModal(title, subtitle, selectedPlan = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (title) modalTitle.textContent = title;
    if (subtitle) modalSubtitle.textContent = subtitle;
    if (selectedPlan) {
        modalPlan.value = selectedPlan;
    }
}

// Function to close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal button
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Nav Join Button
// ===================================
const navJoinBtn = document.getElementById('navJoinBtn');
navJoinBtn.addEventListener('click', () => {
    openModal('JOIN IRONCORE FITNESS', 'Start your transformation journey today with a 7-day free trial');
});

// ===================================
// Hero Buttons
// ===================================
const startTrialBtn = document.getElementById('startTrialBtn');
startTrialBtn.addEventListener('click', () => {
    openModal('START YOUR FREE TRIAL', 'Experience IronCore Fitness with full access for 7 days - no credit card required');
});

const tourBtn = document.getElementById('tourBtn');
tourBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ===================================
// Program Details Buttons
// ===================================
const programDetailsBtns = document.querySelectorAll('.btn-details');
programDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const program = btn.getAttribute('data-program');
        openModal(
            `${program.toUpperCase()} PROGRAM`,
            'Join this specialized program and transform your fitness journey',
            'pro'
        );
    });
});

// ===================================
// Get Started Buttons (Pricing)
// ===================================
const getStartedBtns = document.querySelectorAll('.get-started-btn');
getStartedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        openModal(
            `GET STARTED WITH ${plan.toUpperCase()} PLAN`,
            `Join IronCore Fitness with the ${plan.charAt(0).toUpperCase() + plan.slice(1)} membership`,
            plan
        );
    });
});

// ===================================
// Membership Form Submission
// ===================================
const membershipForm = document.getElementById('membershipForm');
membershipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(membershipForm);
    const data = {
        name: formData.get('name') || membershipForm.querySelector('input[type="text"]').value,
        email: formData.get('email') || membershipForm.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || membershipForm.querySelector('input[type="tel"]').value,
        plan: document.getElementById('modalPlan').value
    };
    
    // Simulate form submission
    console.log('Membership Data:', data);
    alert(`🔥 Welcome to IronCore Fitness, ${data.name}!\n\nWe'll contact you at ${data.email} to schedule your free trial.\n\nGet ready to transform your life! 💪`);
    
    // Reset form and close modal
    membershipForm.reset();
    closeModal();
});

// ===================================
// BMI Calculator
// ===================================
const bmiForm = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiMessage = document.getElementById('bmiMessage');

bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    
    // Calculate BMI
    const bmi = (weight / (height * height)).toFixed(1);
    
    // Determine category and message
    let category = '';
    let message = '';
    let categoryColor = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryColor = '#FFD93D';
        message = 'You may need to gain weight. Our nutrition coaches can help you build a healthy meal plan to reach your goals.';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        categoryColor = '#6BCB77';
        message = 'Great! You\'re in the healthy weight range. Our fitness programs can help you maintain and improve your overall fitness.';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryColor = '#FF9A3C';
        message = 'You may benefit from weight loss. Our HIIT and strength training programs combined with nutrition guidance can help you achieve your goals.';
    } else {
        category = 'Obese';
        categoryColor = '#FF6B6B';
        message = 'We recommend consulting with our trainers for a personalized fitness and nutrition plan to help you achieve a healthy weight safely.';
    }
    
    // Display results
    bmiValue.textContent = bmi;
    bmiCategory.textContent = category;
    bmiCategory.style.color = categoryColor;
    bmiMessage.textContent = message;
    bmiResult.classList.add('show');
    
    // Scroll to result
    bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===================================
// Transformation Slider
// ===================================
const transformationSlides = document.querySelectorAll('.transformation-slide');
const prevBtn = document.querySelector('.transformations .slider-btn.prev');
const nextBtn = document.querySelector('.transformations .slider-btn.next');
const dotsContainer = document.querySelector('.transformations .slider-dots');

let currentSlide = 0;
let autoPlayInterval;

// Create dots for transformation slider
transformationSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.transformations .slider-dot');

function showSlide(n) {
    transformationSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    if (n >= transformationSlides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = transformationSlides.length - 1;
    } else {
        currentSlide = n;
    }

    transformationSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
    resetAutoPlay();
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 6000);
}

// Event listeners for transformation slider
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Pause on hover
    const transformationSlider = document.querySelector('.transformation-slider');
    transformationSlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    transformationSlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 6000);
    });

    // Start auto-play
    autoPlayInterval = setInterval(nextSlide, 6000);
}

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Contact Form Data:', formData);
    
    // Show success message
    successMessage.classList.add('show');
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
});

// ===================================
// Active Section Highlighting in Nav
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Ripple Effect on Buttons
// ===================================
const rippleButtons = document.querySelectorAll('.ripple');

rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ===================================
// Schedule Table - Click to Book
// ===================================
const classCells = document.querySelectorAll('.class-cell');
classCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const className = cell.querySelector('.class-name').textContent;
        const trainerName = cell.querySelector('.class-trainer').textContent;
        
        openModal(
            `BOOK ${className.toUpperCase()} CLASS`,
            `Reserve your spot with ${trainerName} - Limited availability!`,
            'pro'
        );
    });
});

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Prevent Default on Empty Links
// ===================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===================================
// Add Active Class on Page Load
// ===================================
window.addEventListener('load', () => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetLink = document.querySelector(`a[href="${targetId}"]`);
        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    }
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c💪 WELCOME TO IRONCORE FITNESS! 💪', 'font-size: 24px; color: #FF3E3E; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c🔥 Transform Your Body. Elevate Your Mind. Achieve The Impossible. 🔥', 'font-size: 14px; color: #FFD700; font-weight: bold;');
console.log('%cBuilt with passion by the IronCore Dev Team', 'font-size: 12px; color: #AAAAAA;');

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event if needed
const debouncedScroll = debounce(() => {
    // Additional scroll logic if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Smooth Scroll Polyfill for older browsers
// ===================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// ===================================
// Add Animation on Scroll for Stats
// ===================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.stat-item, .feature-card, .program-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// ===================================
// Initialize Tooltips (if needed)
// ===================================
const initTooltips = () => {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
};

// Initialize on page load
initTooltips();

// ===================================
// Form Validation Helper
// ===================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
};

// Add real-time validation if needed
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (!validateEmail(input.value) && input.value !== '') {
            input.style.borderColor = '#FF3E3E';
        } else {
            input.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (!validatePhone(input.value) && input.value !== '') {
            input.style.borderColor = '#FF3E3E';
        } else {
            input.style.borderColor = '';
        }
    });
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// End of Script
// ===================================
console.log('✅ IronCore Fitness - All systems operational!');
