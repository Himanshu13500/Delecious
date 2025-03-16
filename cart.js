// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
        this.initializeCart();
    }

    initializeCart() {
        // Add to cart buttons
        document.querySelectorAll('.flavor-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default form submission
                const card = e.target.closest('.flavor-card');
                const product = {
                    id: Date.now(), // Unique ID for each item
                    name: card.querySelector('.flavor-name').textContent,
                    price: parseInt(card.querySelector('.price').textContent.replace('₹', '')),
                    image: card.querySelector('img').src,
                    quantity: 1
                };
                this.addItem(product);
                this.showNotification(`${product.name} added to cart!`);
            });
        });

        // Initialize cart page if we're on it
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
            this.initializeCartControls();
        }
    }

    initializeCartControls() {
        // Add event delegation for cart controls
        document.querySelector('.cart-items').addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const itemId = parseInt(cartItem.dataset.id);

            if (e.target.closest('.remove-item')) {
                e.preventDefault();
                this.removeItem(itemId);
            } else if (e.target.closest('.quantity-btn.minus')) {
                e.preventDefault();
                this.updateQuantity(itemId, -1);
            } else if (e.target.closest('.quantity-btn.plus')) {
                e.preventDefault();
                this.updateQuantity(itemId, 1);
            }
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(product);
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    }

    updateQuantity(id, change) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                this.removeItem(id);
            } else {
                this.saveCart();
                this.updateCartCount();
                if (window.location.pathname.includes('cart.html')) {
                    this.renderCartPage();
                }
            }
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
        } catch (e) {
            console.error('Failed to save cart:', e);
        }
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = `(${count})`;
        });
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification && notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    renderCartPage() {
        const cartItems = document.querySelector('.cart-items');
        const subtotal = document.querySelector('.subtotal');
        const total = document.querySelector('.total-amount');

        if (!cartItems || !subtotal || !total) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="index.html#shop" class="continue-shopping">
                        <i class="fas fa-arrow-left"></i> Continue Shopping
                    </a>
                </div>
            `;
            subtotal.textContent = '₹0';
            total.textContent = '₹50';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const subtotalAmount = this.calculateTotal();
        subtotal.textContent = `₹${subtotalAmount}`;
        total.textContent = `₹${subtotalAmount + 50}`; // Adding shipping cost
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    window.cart = cart; // Make cart accessible globally

    // Update cart links to navigate to cart page
    document.querySelectorAll('.cart-link').forEach(link => {
        link.href = 'cart.html';
    });
}); 