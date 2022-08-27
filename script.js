const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};
mobile_nav.addEventListener("click", () => toggleNavbar());





if(document.addEventListener == "loading"){
  document.addEventListener("DOMContentLoaded",ready);
}
else{
  ready();
}
function openNav() {
  document.getElementById("mySidenav_sc").style.width = "88%";
  document.getElementById("mySidenav_sc").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav_sc").style.width = "0";
  document.getElementById("mySidenav_sc").style.display = "none";
}
function ready(){
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for( var i =0; i< removeCartButtons.length;i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
}
  var quantityInputs = document.getElementsByClassName("cart-quantity")
  for( var i =0; i< quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
}
  var addCart = document.getElementsByClassName('add-cart')
  for( var i =0; i< addCart.length;i++){
    var button = addCart[i]
    button.addEventListener("click", addCartClicked)
  }
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updatetotal();
}
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <=0){
    input.value = 1;
  }
  updatetotal();
}
function addCartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  Swal.fire({
    position: 'top',
    icon: 'success',
    
    // html: true,
    title: 'Items Added In Cart',
    showConfirmButton: false,
    timer: 1500,
    customClass: 'swal-wide'
    
  })
  updatetotal();
}
function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for(var i =0;i<cartItemsNames.length;i++){
    if(cartItemsNames[i].innerText == title){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Item Is Aleardy In Cart',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
  }
  
var cartBoxContent = `
                    <img src="${productImg}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">$ ${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i style="color: red" class="fa-solid fa-trash cart-remove"></i>`;
                    cartShopBox.innerHTML=cartBoxContent;
                    cartItems.append(cartShopBox);
                    cartShopBox
                    .getElementsByClassName("cart-remove")[0]
                    .addEventListener("click", removeCartItem);
                    cartShopBox
                    .getElementsByClassName("cart-quantity")[0]
                    .addEventListener("change", quantityChanged);
  }

  function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total=0
  for( var i =0; i< cartBoxes.length;i++){
    var cartBox = cartBoxes[i]

    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace("$",""))
    var quantity = quantityElement.value;
  
    total = total + price * quantity;
  }
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  
}
function buyButtonClicked(){
  Swal.fire({
    title: 'Your Order Has Been Placed Successfully',
    imageUrl: 'https://cdn.dribbble.com/users/143127/screenshots/2475556/media/3d00af4a31c2902aea8bc05b0e1dbdde.gif',
    imageWidth: 400,
    imageHeight: 250,
    imageAlt: 'Custom image',
    
    customClass: 'swal-buywide',
    
    showConfirmButton: false,
    // timer: 4000,
    
    customClass: 'swal-buywide',
    
    showConfirmButton: false,
    html: 'I will close in <b></b> milliseconds.',
    timer: 4000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  
  
  })
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal()
}
