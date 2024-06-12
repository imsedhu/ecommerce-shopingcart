const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.add-cart-bar');
const cartClose = document.querySelector('.close-btn');

/* cart bar open */
cartIcon.addEventListener('click', ()=>{
  cart.classList.add('add-cart-bar-live')
})
/* cart bar closed */
cartClose.addEventListener('click', ()=>{
  cart.classList.remove('add-cart-bar-live')
})

/* cart working js */
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}else{
  ready();
}

/* remove cart items function */
function ready(){
  const removeItemsBtn = document.getElementsByClassName('trash-bin');
  for(var i = 0; i < removeItemsBtn.length; i++){
    const deleteBtn = removeItemsBtn[i];
    deleteBtn.addEventListener('click', removeCartItems)
  }

  /* quality cahnges */
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  /* add to cart */
  var addCart = document.getElementsByClassName('product-cart-icon');
  for(var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
}

/* removeCartItems function*/
function removeCartItems(e){
  const btnClicked = e.target;
  btnClicked.parentElement.remove();
  updatePrice();
}

/* quantityChanged function */
function quantityChanged(e){
  var input = e.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updatePrice();
}
/* add to cart function */
function addCartClicked(e){
  var button = e.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-name')[0].innerText;
  var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
  var image = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, image);
  updatePrice();
}

/* add product to car function */
function addProductToCart(title, price, image){
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  for (var i = 0; i < cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText == title){
      alert('you have alredy added this item in your cart');
      return;
    }
  }
  var cartBoxContent = `
      <img src="${image}" alt="">
        <div class="cart-detail">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="ri-delete-bin-fill trash-bin"></i>
      <hr class="bottom-line">
`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('trash-bin')[0].addEventListener('click', removeCartItems);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
}




/* price total update function */
function updatePrice(){
  const cartContent = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for(var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("$",""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    /* if price contain decimal value */
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }
}