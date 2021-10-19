// import { productArray } from "./constants/productList.js";
// const url = "http://api.rainydays.noroff.wexox.no/wp-json/wc/v3/products/";
const params = new URLSearchParams(document.location.search);

const id = params.get("id");
const url = "http://rainydays.noroff.wexox.no/details.html?";

const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
const detailContainer = document.querySelector(".sw-details");
const buttons = document.querySelectorAll("button");
let cartArray = [];

// List products
async function getProducts() {
  try {
    const response = await fetch(url);
    const products = await response.JSON();
    const productsResults = products;
    productsResults.forEach(function (product) {
      productsContainer.innerHTML += `
  <div class="product">
    <h2>${product.name}</h2>
    <p>${product.short_description}</p>
      
    <div style="background-image: url(${product.images.srcset})" class="product-image"></div>
    <p>${product.description}</p>
    <div class="product-price">${product.prices.price}</div>
    <button class="product-button" data-product="${product.id}">Add to cart</button>
   </div>`;
    });
  } catch (error) {
    console.log(error);
    detailContainer.innerHTML = message("error", error);
  }
}

getProducts();
