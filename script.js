// Page Navigation
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

// Navigation function
function navigateToPage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Add click listeners to all navigation elements
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        navigateToPage(pageName);
    });
});

// Logo click goes to home
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage('home');
});

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email', 'error');
        return;
    }
    
    // Show success message (no actual sending)
    showFormStatus('Message sent! Thanks for reaching out. We\'ll get back to you soon.', 'success');
    
    // Clear form
    setTimeout(() => {
        contactForm.reset();
        formStatus.classList.remove('success');
        formStatus.style.display = 'none';
    }, 3000);
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's not a data-page link (those are handled above)
        if (!this.getAttribute('data-page')) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            if (target) {
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

// Mobile menu handling (for future mobile nav)
function handleMobileNav() {
    const navContainer = document.querySelector('.nav-container');
    if (window.innerWidth <= 768) {
        // Mobile adjustments if needed
    }
}

window.addEventListener('resize', handleMobileNav);
handleMobileNav();

// Analytics tracking (optional - add your tracking code here)
function trackPageView(pageName) {
    // Add your analytics code here
    console.log(`Page viewed: ${pageName}`);
}

// Track page views when navigating
const originalNavigate = navigateToPage;
function navigateToPageWithTracking(pageName) {
    originalNavigate(pageName);
    trackPageView(pageName);
}

// Override the navigation function
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        navigateToPageWithTracking(pageName);
    });
});

// Initialize home page on load
document.addEventListener('DOMContentLoaded', () => {
    navigateToPage('home');
});
