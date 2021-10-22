import { getProducts } from "./api.js";
const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let cartArray = [];

getProducts().then((productList) => {
  productList.forEach((product) => {
    productsContainer.innerHTML += `
        <div class="product">
        <a href="details.html?id=${product.id}">
        <h2>${product.name}</h2>
         </a>
            ${product.short_description}
            <div style="background-image: url(${product.images[0].src})" class="product-image"></div>
            ${product.description}
            <div class="product-price">${product.price_html}</div>
            <button class="product-button" data-product="${product.id}">Add to cart</button>
        </div>`;
  });
  const buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.onclick = function (event) {
      console.log(productList);
      console.log(event.target);

      const itemToAdd = productList.find(
        (item) => item.id === event.target.dataset
      );

      cartArray.push(itemToAdd);
      showCart(cartArray);
      localStorage.setItem("cartList", JSON.stringify(cartArray));
    };
  });
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
//# sourceMappingURL=products.js.map
