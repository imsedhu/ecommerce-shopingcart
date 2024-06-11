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

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }
}