// ============== MOBILE MENU TOGGLE ==============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// ============== HEALTH CENTRES FILTER ==============
function filterCentres(region, buttonEl) {
    const cards = document.querySelectorAll('.centre-card');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonEl) {
        buttonEl.classList.add('active');
    }

    cards.forEach(card => {
        if (card.dataset.region === region) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 0);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
        }
    });
}

// Add transition styles to centre cards
const centreCards = document.querySelectorAll('.centre-card');
centreCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ============== CONTACT FORM SUBMISSION ==============
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent Successfully! ✓';
    submitBtn.style.backgroundColor = '#27ae60';
    
    // Reset form
    form.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
    }, 3000);
    
    console.log('Form submitted with data:', {
        name: formData.get('name') || form.querySelector('input[type="text"]').value,
        email: formData.get('email') || form.querySelector('input[type="email"]').value,
        message: formData.get('message') || form.querySelector('textarea').value
    });
}

// ============== SMOOTH SCROLL BEHAVIOR ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============== SCROLL ANIMATIONS ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
const cardsToObserve = document.querySelectorAll(
    '.hospital-card, .centre-card, .fact-card, .news-card, .leader-card, .accreditation-card'
);

cardsToObserve.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============== STATS COUNTER ANIMATION ==============
function animateStats() {
    const factCards = document.querySelectorAll('.fact-card h3');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const finalValue = parseInt(entry.target.textContent.replace(/,/g, ''));
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let currentValue = 0;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        entry.target.textContent = finalValue.toLocaleString();
                        entry.target.classList.add('counted');
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(currentValue).toLocaleString();
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    factCards.forEach(card => observer.observe(card));
}

// Run stats animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
} else {
    animateStats();
}

// ============== ACCESSIBILITY & KEYBOARD NAVIGATION ==============
// Handle keyboard navigation for forms
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
inputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && index === inputs.length - 1 && !e.shiftKey) {
            e.preventDefault();
            inputs[0].focus();
        } else if (e.key === 'Tab' && index === 0 && e.shiftKey) {
            e.preventDefault();
            inputs[inputs.length - 1].focus();
        }
    });
});

// ============== ACTIVE NAVIGATION LINK ==============
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============== LAZY LOADING PLACEHOLDER ==============
// This can be extended for actual image lazy loading
const images = document.querySelectorAll('[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============== CONSOLE LOG FOR DEBUGGING ==============
console.log('Trinity Hospital Tanzania website loaded successfully');
console.log('Features enabled: Mobile menu, Health centres filter, Form submission, Smooth scrolling');

// ============== UTILITY FUNCTIONS ==============
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.textContent = '↑ Top';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        display: none;
        font-weight: 600;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', scrollToTop);
    
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#004d5c';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// ============== SERVICE WORKER REGISTRATION (Optional PWA support) ==============
// Uncomment if you want to add PWA support
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('Service Worker registered');
    }).catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}
*/
