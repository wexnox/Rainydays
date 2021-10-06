import { productArray } from "./constants/productList.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "http://api.rainydays.noroff.wexox.no/wp-json/wc/v3/products/";

const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let cartArray = [];

async function fetchProducts() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

productArray.forEach(function (product) {
  productsContainer.innerHTML += `
  <div class="product">
    <h2>${product.name}</h2>
      <p>${product.description}</p>
    <div style="background-image: url(${product.image})" class="product-image"></div
    <div class="product-price">${product.price}</div>
    <button class="product-button" data-product="${product.id}">Add to cart</button>
   </div>`;
});
fetchProducts();

const buttons = document.querySelectorAll("button");

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
