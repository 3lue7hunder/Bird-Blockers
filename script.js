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
// Form Handling
// ===================================

const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        panels: document.getElementById('panels').value,
        stories: document.getElementById('stories').value,
        problems: document.getElementById('problems').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        additional: document.getElementById('additional').value,
        timestamp: new Date().toLocaleString()
    };
    
    // For demonstration purposes, log the form data
    console.log('Form submitted:', formData);
    
    // In production, you would send this data to your backend
    // Example:
    /*
    try {
        const response = await fetch('/api/submit-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Show success message
            quoteForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Send email and SMS notification to business owner
            // This would be handled by your backend
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your request. Please try again or call us directly.');
    }
    */
    
    // For now, simulate successful submission
    setTimeout(() => {
        quoteForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Create email content for business owner
        const emailSubject = `New Quote Request from ${formData.name}`;
        const emailBody = `
New Quote Request Received:

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}

Service Details:
- Number of Panels: ${formData.panels}
- Home Type: ${formData.stories}
- Problems Experienced: ${formData.problems}

Additional Notes:
${formData.additional || 'None provided'}

Submitted: ${formData.timestamp}

Please contact this customer within 24 hours.
        `.trim();
        
        console.log('Email to be sent:', {
            to: 'business@birdblockers.com', // Replace with your business email
            subject: emailSubject,
            body: emailBody
        });
        
        // SMS notification content
        const smsMessage = `New quote request from ${formData.name}. ${formData.panels} panels, ${formData.stories}. Phone: ${formData.phone}`;
        
        console.log('SMS to be sent:', {
            to: '+1234567890', // Replace with your business phone
            message: smsMessage
        });
        
    }, 500);
});

// ===================================
// Gallery Image Modal (Optional Enhancement)
// ===================================

document.querySelectorAll('.gallery-image').forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', function() {
        // This is a placeholder for a lightbox/modal functionality
        // You could implement a full-screen image viewer here
        console.log('Image clicked - implement lightbox modal if desired');
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
        const sectionHeight = section.clientHeight;
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
// Form Validation Enhancement
// ===================================

// Add real-time validation
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        this.style.borderColor = 'var(--error)';
    } else {
        this.style.borderColor = 'var(--success)';
    }
});

phoneInput.addEventListener('blur', function() {
    // Basic phone validation (formats: 1234567890, 123-456-7890, (123) 456-7890)
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(this.value) || this.value.replace(/\D/g, '').length < 10) {
        this.style.borderColor = 'var(--error)';
    } else {
        this.style.borderColor = 'var(--success)';
    }
});

// Reset border colors on focus
[emailInput, phoneInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// ===================================
// Loading State for Form Submission
// ===================================

const submitButton = quoteForm.querySelector('button[type="submit"]');
const originalButtonText = submitButton.innerHTML;

// You can use this function when implementing actual form submission
function setFormLoading(isLoading) {
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" stroke-linecap="round" opacity="0.3"/>
            </svg>
            Submitting...
        `;
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
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
// Console Message
// ===================================

console.log('%c🐦 Bird Blockers Website', 'color: #2c5282; font-size: 20px; font-weight: bold;');
console.log('%cTo integrate this with your backend:', 'color: #4a5568; font-size: 14px;');
console.log('%c1. Set up email service (e.g., SendGrid, AWS SES, or SMTP)', 'color: #718096; font-size: 12px;');
console.log('%c2. Set up SMS service (e.g., Twilio)', 'color: #718096; font-size: 12px;');
console.log('%c3. Create API endpoint to receive form submissions', 'color: #718096; font-size: 12px;');
console.log('%c4. Update the fetch URL in the form submission handler', 'color: #718096; font-size: 12px;');