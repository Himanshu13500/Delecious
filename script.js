document.addEventListener("DOMContentLoaded", function () {
    // Header Scroll Effect
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Smooth Scroll for All Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Add to Cart Functionality
    const cartButtons = document.querySelectorAll(".flavor-card button");
    let cartCount = 0;
    
    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            cartCount++;
            const flavor = this.closest('.flavor-card').querySelector('.flavor-name').textContent;
            
            // Create floating notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${flavor} added to cart!`;
            document.body.appendChild(notification);

            // Animate notification
            setTimeout(() => {
                notification.remove();
            }, 3000);

            // Update cart count in nav
            updateCartCount(cartCount);
        });
    });

    // Cart Count Update
    function updateCartCount(count) {
        let cartLink = document.querySelector('a[href="#"][title="Cart"]');
        if (!cartLink) {
            cartLink = document.querySelector('a[href="#"]:contains("ADD TO CART")');
        }
        if (cartLink) {
            cartLink.textContent = `CART (${count})`;
        }
    }

    // Image Lazy Loading
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px"
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, sectionOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Enhanced Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Auto advance testimonials
    setInterval(nextTestimonial, 5000);
    showTestimonial(0);

    // Create Account Modal
    document.getElementById("createAccount").addEventListener("click", function(e) {
        e.preventDefault();
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Create Account</h2>
                <form id="signupForm">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close').onclick = function() {
            modal.remove();
        };
        
        modal.querySelector('form').onsubmit = function(e) {
            e.preventDefault();
            alert('Account creation feature coming soon!');
            modal.remove();
        };
    });

    // Add to cart animation
    function createCartAnimation(button) {
        const circle = document.createElement('div');
        circle.className = 'cart-animation';
        button.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 1000);
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            createCartAnimation(this);
        });
    });

    // Dropdown Menu Functionality
    const dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("mouseover", function () {
        this.querySelector(".dropdown-menu").style.display = "block";
    });
    dropdown.addEventListener("mouseleave", function () {
        this.querySelector(".dropdown-menu").style.display = "none";
    });

    // Create Account Button Alert
    document.getElementById("createAccount").addEventListener("click", function () {
        alert("Account creation feature coming soon!");
    });

    // Testimonials Slider (Auto-Sliding)
    let reviewIndex = 0;
    function showNextReview() {
        const reviews = document.querySelectorAll(".review");
        reviews.forEach((review, index) => {
            review.style.display = index === reviewIndex ? "block" : "none";
        });
        reviewIndex = (reviewIndex + 1) % reviews.length;
    }
    setInterval(showNextReview, 5000);
    showNextReview();

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
            const answer = this.querySelector(".faq-answer");
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });

    // Newsletter Subscription Alert
    document.getElementById("subscribeBtn")?.addEventListener("click", function () {
        const email = document.getElementById("emailInput").value;
        if (email) {
            alert("Thank you for subscribing!");
        } else {
            alert("Please enter a valid email address.");
        }
    });
});

// Add necessary styles
const styles = `
    .cart-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a3f35;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        position: relative;
        width: 90%;
        max-width: 500px;
        animation: scaleIn 0.3s ease-out;
    }

    .close {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 24px;
        cursor: pointer;
    }

    .cart-animation {
        position: absolute;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        animation: cartPulse 1s ease-out;
    }

    @keyframes cartPulse {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(20); opacity: 0; }
    }

    .fade-in {
        animation: fadeIn 0.5s ease-out;
    }

    /* Mobile Responsive Improvements */
    @media (max-width: 768px) {
        header {
            padding: 10px 20px;
        }

        .logo img {
            height: 40px;
        }

        nav ul {
            gap: 15px;
        }

        nav a {
            font-size: 0.85em;
            padding: 3px 6px;
        }

        .flavor-card {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }

        .cart-item {
            padding: 15px;
        }

        .cart-item-image {
            width: 80px;
            height: 80px;
        }

        .quantity-btn {
            width: 25px;
            height: 25px;
        }

        .cart-summary {
            padding: 20px;
        }

        .highlight {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 30px;
        }

        .hero-content {
            text-align: center;
        }

        .hero-features {
            justify-content: center;
            flex-wrap: wrap;
        }

        .hero-content h1 {
            font-size: 2.5em;
        }

        .hero-image {
            grid-row: 1;
            max-width: 400px;
            margin: 0 auto;
        }

        .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 30px;
        }

        .footer-section h3::after {
            left: 50%;
            transform: translateX(-50%);
        }

        .footer-section ul li a {
            justify-content: center;
        }

        .social-links {
            justify-content: center;
        }

        .newsletter-form {
            max-width: 400px;
            margin: 20px auto 0;
        }
    }

    @media (max-width: 480px) {
        .cart-notification {
            bottom: 10px;
            right: 10px;
            left: 10px;
            font-size: 0.85em;
            text-align: center;
            max-width: none;
        }

        .cart-item {
            grid-template-columns: 1fr;
            text-align: center;
        }

        .cart-item-image {
            margin: 0 auto;
        }

        .quantity-controls {
            justify-content: center;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
