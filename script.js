const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.add-cart-bar');
const cartClose = document.querySelector('.close-btn');

cartIcon.addEventListener('click', ()=>{
  cart.classList.add('add-cart-bar-live')
})
cartClose.addEventListener('click', ()=>{
  cart.classList.remove('add-cart-bar-live')
})