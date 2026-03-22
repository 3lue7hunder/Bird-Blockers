// ===================================
// Mobile Navigation
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking any link or button in the menu
const navMenuItems = document.querySelectorAll('.nav-menu a');

navMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===================================
// Smooth Scrolling with offset for fixed nav
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.problem-card, .service-item, .gallery-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// Form Handling — Netlify
// ===================================

const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');
const submitButton = quoteForm.querySelector('button[type="submit"]');
const originalButtonHTML = submitButton.innerHTML;

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // Collect all form fields including the hidden Netlify fields
    const formData = new FormData(quoteForm);

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            // Hide the form and show the success message
            quoteForm.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Something went wrong submitting your request. Please try again or call us directly.');
            setFormLoading(false);
        }
    } catch (err) {
        console.error('Form submission error:', err);
        alert('Submission failed. Please check your connection and try again, or call us directly.');
        setFormLoading(false);
    }
});

// ===================================
// Loading State for Form Submission
// ===================================

function setFormLoading(isLoading) {
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" 
                        stroke-dasharray="40 10" stroke-linecap="round" opacity="0.8"/>
            </svg>
            Submitting...
        `;
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
    }
}

// Add spin animation for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===================================
// Gallery Image Click (placeholder for lightbox)
// ===================================

document.querySelectorAll('.gallery-image').forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', function() {
        // Implement a lightbox/modal here if desired
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const navHeight = navbar.offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
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
// Real-Time Form Validation
// ===================================

const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.style.borderColor = emailRegex.test(this.value) ? 'var(--success)' : 'var(--error)';
});

phoneInput.addEventListener('blur', function () {
    const digits = this.value.replace(/\D/g, '');
    this.style.borderColor = digits.length >= 10 ? 'var(--success)' : 'var(--error)';
});

// Reset border color on focus
[emailInput, phoneInput].forEach(input => {
    input.addEventListener('focus', function () {
        this.style.borderColor = 'var(--primary-color)';
    });
});