/* ==========================================
   VIGILCAP - Interactive Components
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initCarousel();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initEmailModal();
});

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });
    }
}

/* ==========================================
   MONEY SHOT CAROUSEL
   ========================================== */
function initCarousel() {
    const cards = document.querySelectorAll('.money-shot-card');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    if (cards.length === 0) return;

    function showSlide(index) {
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current card
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % cards.length;
        showSlide(nextIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Start autoplay
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.money-shot-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.mechanism-card, .money-shot-card, .pricing-column, .faq-item, .analysis-section'
    );

    // Intersection Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe elements
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   REPORT DEMO TABS
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const demoTabs = document.querySelectorAll('.demo-tab');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    update();
}

/* ==========================================
   NAVBAR STYLES ON SCROLL
   ========================================== */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .navbar.scrolled {
        padding: 0.75rem 0;
        background: rgba(10, 25, 47, 0.98);
    }
    
    .nav-links.mobile-open {
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(10, 25, 47, 0.98);
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(additionalStyles);

/* ==========================================
   TYPING EFFECT FOR HERO (Optional)
   ========================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ==========================================
   PARALLAX EFFECT
   ========================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

/* ==========================================
   FLOATING REPORT GLOW EFFECT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const floatingReport = document.querySelector('.floating-report');

    if (floatingReport) {
        floatingReport.addEventListener('mousemove', (e) => {
            const rect = floatingReport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            floatingReport.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        floatingReport.addEventListener('mouseleave', () => {
            floatingReport.style.transform = 'rotateX(5deg) rotateY(-5deg)';
        });
    }
});

/* ==========================================
   EMAIL CAPTURE MODAL
   ========================================== */

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'tz9q-Z7OWq0gFm3G4';
const EMAILJS_SERVICE_ID = 'service_v0iu30c';
const EMAILJS_TEMPLATE_ID = 'template_8u3nqnm';

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Send notification email
async function sendNotificationEmail(data) {
    try {
        const templateParams = {
            form_type: data.formType || 'Sample Report Download',
            user_email: data.email,
            enterprise_value: data.enterpriseValue || 'N/A',
            timeline: data.timeline || 'N/A',
            submitted_at: new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            })
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('Notification email sent successfully');
        return true;
    } catch (error) {
        console.error('EmailJS error:', error);
        return true; // Still allow user to proceed even if email fails
    }
}

function initEmailModal() {
    const modal = document.getElementById('email-modal');
    const openBtn = document.getElementById('open-email-modal');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const formState = document.getElementById('modal-form-state');
    const successState = document.getElementById('modal-success-state');

    if (!modal) return;

    // Open modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        emailInput.focus();
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            formState.style.display = 'block';
            successState.style.display = 'none';
            form.reset();
            emailInput.classList.remove('error');
            emailError.textContent = '';
        }, 300);
    }

    // Validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Event listeners
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validate
            if (!email) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter your email address';
                return;
            }

            if (!isValidEmail(email)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                return;
            }

            // Clear errors
            emailInput.classList.remove('error');
            emailError.textContent = '';

            // Send notification email
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            await sendNotificationEmail({
                formType: 'Sample Report Download',
                email: email
            });

            // Show success state
            formState.style.display = 'none';
            successState.style.display = 'block';

            submitBtn.textContent = 'Download Report';
            submitBtn.disabled = false;
        });
    }

    // Allow input to clear error on type
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            emailInput.classList.remove('error');
            emailError.textContent = '';
        });
    }
}

/* ==========================================
   INTAKE FORM MODAL (Get Your Report)
   ========================================== */

// Common personal email domains to block
const PERSONAL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
    'gmx.com', 'live.com', 'msn.com', 'me.com', 'inbox.com'
];

function isBusinessEmail(email) {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    return !PERSONAL_DOMAINS.includes(domain);
}

function initIntakeModal() {
    const modal = document.getElementById('intake-modal');
    const closeBtn = document.getElementById('close-intake-modal');
    const closeSuccessBtn = document.getElementById('close-intake-success');
    const form = document.getElementById('intake-form');
    const formState = document.getElementById('intake-form-state');
    const successState = document.getElementById('intake-success-state');

    // Form fields
    const evSelect = document.getElementById('enterprise-value');
    const timelineSelect = document.getElementById('timeline');
    const workEmailInput = document.getElementById('work-email');

    // Error elements
    const evError = document.getElementById('ev-error');
    const timelineError = document.getElementById('timeline-error');
    const workEmailError = document.getElementById('work-email-error');

    // Buttons that open this modal
    const ctaButtons = document.querySelectorAll('#cta-get-report, .hero-ctas .btn-primary, .pricing-cta .btn-primary');

    if (!modal) return;

    // Open modal
    function openIntakeModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeIntakeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form after animation
        setTimeout(() => {
            formState.style.display = 'block';
            successState.style.display = 'none';
            form.reset();
            clearErrors();
        }, 300);
    }

    function clearErrors() {
        evError.textContent = '';
        timelineError.textContent = '';
        workEmailError.textContent = '';
        evSelect.classList.remove('error');
        timelineSelect.classList.remove('error');
        workEmailInput.classList.remove('error');
    }

    // Event listeners for opening
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openIntakeModal();
        });
    });

    // Also handle any element with data-open-intake attribute
    document.querySelectorAll('[data-open-intake]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openIntakeModal();
        });
    });

    // Close buttons
    if (closeBtn) closeBtn.addEventListener('click', closeIntakeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeIntakeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeIntakeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeIntakeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            let hasError = false;

            // Validate enterprise value
            if (!evSelect.value) {
                evError.textContent = 'Please select an enterprise value range';
                evSelect.classList.add('error');
                hasError = true;
            }

            // Validate timeline
            if (!timelineSelect.value) {
                timelineError.textContent = 'Please select your timeline';
                timelineSelect.classList.add('error');
                hasError = true;
            }

            // Validate email
            const email = workEmailInput.value.trim();
            if (!email) {
                workEmailError.textContent = 'Please enter your work email';
                workEmailInput.classList.add('error');
                hasError = true;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                workEmailError.textContent = 'Please enter a valid email address';
                workEmailInput.classList.add('error');
                hasError = true;
            } else if (!isBusinessEmail(email)) {
                workEmailError.textContent = 'Please use a business email address (not Gmail, Yahoo, etc.)';
                workEmailInput.classList.add('error');
                hasError = true;
            }

            if (hasError) return;

            // Submit via EmailJS
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Map dropdown values to readable text
            const evLabels = {
                'under-1m': 'Under $1M',
                '1m-5m': '$1M - $5M',
                '5m-plus': '$5M+'
            };
            const timelineLabels = {
                'urgent': 'Under 2 weeks (Urgent)',
                'standard': '2-4 weeks',
                'flexible': '1-2 months',
                'exploratory': 'Just exploring options'
            };

            await sendNotificationEmail({
                formType: 'Deal Request - Get Your Report',
                email: email,
                enterpriseValue: evLabels[evSelect.value] || evSelect.value,
                timeline: timelineLabels[timelineSelect.value] || timelineSelect.value
            });

            formState.style.display = 'none';
            successState.style.display = 'block';

            submitBtn.textContent = 'Submit Request';
            submitBtn.disabled = false;
        });
    }

    // Clear errors on input
    if (evSelect) evSelect.addEventListener('change', () => {
        evError.textContent = '';
        evSelect.classList.remove('error');
    });
    if (timelineSelect) timelineSelect.addEventListener('change', () => {
        timelineError.textContent = '';
        timelineSelect.classList.remove('error');
    });
    if (workEmailInput) workEmailInput.addEventListener('input', () => {
        workEmailError.textContent = '';
        workEmailInput.classList.remove('error');
    });
}

// Initialize intake modal on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initIntakeModal();
});
