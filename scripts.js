document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartCount = document.getElementById('cart-count');
  const cartCountIcon = document.getElementById('cart-count-icon');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  const buttons = document.querySelectorAll('.buy-btn');
  buttons.forEach(button => {
      button.addEventListener('click', (event) => {
          const product = event