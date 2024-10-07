document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        cartTotal.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }

    function removeFromCart(id) {
        const productIndex = cart.findIndex(item => item.id === id);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    document.getElementById('checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    // Initialize cart on page load
    updateCart();
});
