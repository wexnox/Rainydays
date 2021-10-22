const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let total = 0;
// console.log(cartItems);
console.log(cartList);

cartItems.forEach(function (cartElement) {
  // total += cartElement.prices.price;
  total += cartElement.prices.price;
  cartContainer.innerHTML += `
    <div class="cart-item">
        <h4>${cartElement.name}</h4>
        <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
    </div>`;
});
totalContainer.innerHTML = `Total: ${total}`;
