document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  const cartCountIcon = document.getElementById('cart-count-icon');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  const buttons = document.querySelectorAll('.buy-btn');
  buttons.forEach(button => {
      button.addEventListener('click', (event) => {
          const product = event.target.closest('.product');
          const productId = product.getAttribute('data-id');
          const productName = product.getAttribute('data-name');
          const productPrice = parseFloat(product.getAttribute('data-price'));

          addToCart(productId, productName, productPrice);
          animateCart();
      });
  });

  function addToCart(id, name, price) {
      const existingProduct = cart.find(item => item.id === id);
      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          cart.push({ id, name, price, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
  }

  function updateCart() {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountIcon.textContent = cartCount.textContent;
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

  function animateCart() {
      cartCountIcon.classList.add('bounce');
      setTimeout(() => {
          cartCountIcon.classList.remove('bounce');
      }, 500);
  }

  // Initialize cart on page load
  updateCart();
});
