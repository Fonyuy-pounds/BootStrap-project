// Custom JavaScript for SoleStep

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
    
    // Product filtering functionality
    const filterDropdownItems = document.querySelectorAll('[data-category]');
    const sortDropdownItems = document.querySelectorAll('[data-sort]');
    const productsContainer = document.getElementById('productsContainer');
    const products = Array.from(document.querySelectorAll('[data-category]'));
    
    if (filterDropdownItems.length && productsContainer) {
        filterDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                if (category === 'all') {
                    products.forEach(product => {
                        product.style.display = 'block';
                    });
                } else {
                    products.forEach(product => {
                        if (product.getAttribute('data-category') === category) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    if (sortDropdownItems.length && productsContainer) {
        sortDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const sortType = this.getAttribute('data-sort');
                
                let sortedProducts = [...products];
                
                switch(sortType) {
                    case 'price-low':
                        sortedProducts.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
                        break;
                    case 'price-high':
                        sortedProducts.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
                        break;
                    case 'rating':
                        sortedProducts.sort((a, b) => parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')));
                        break;
                    case 'newest':
                        sortedProducts.sort((a, b) => new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date')));
                        break;
                    default:
                        // Default sorting (original order)
                        sortedProducts = products;
                }
                
                // Re-append products in sorted order
                sortedProducts.forEach(product => {
                    productsContainer.appendChild(product);
                });
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            products.forEach(product => {
                const productTitle = product.querySelector('.card-title').textContent.toLowerCase();
                
                if (productTitle.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Form validation for login form
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                alert('Login successful! Redirecting to your account...');
                loginForm.reset();
            } else {
                alert('Please enter both email and password.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});