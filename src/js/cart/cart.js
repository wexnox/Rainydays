// Add items to Cart

buttons.forEach(function (button) {
  button.onclick = function (event) {
    // cartArray.push(event.target.dataset.product);
    const itemToAdd = productArray.find(
      (item) => item.id === event.target.dataset.product
    );
    cartArray.push(itemToAdd);
    showCart(cartArray);
    localStorage.setItem("cartList", JSON.stringify(cartArray));
  };
});

function showCart(cartItems) {
  cart.style.display = "flex";
  cartList.innerHTML = " ";
  let total = 0;
  cartItems.forEach(function (cartElement) {
    total += cartElement.price;
    cartList.innerHTML += `
            <div class="cart-item">
            <h4>${cartElement.name}</h4>
            <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
            </div>`;
  });
  totalContainer.innerHTML = `Total: ${total}`;
}

let total = 0;

cartItems.forEach(function (cartElement) {
  total += cartElement.price;
  cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${cartElement.name}</h4>
                <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
            </div>
            `;
});

totalContainer.innerHTML = `Total: ${total}`;
