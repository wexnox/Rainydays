// import { getProducts } from "./api.js";
const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

const url = "http://api.rainydays.noroff.wexox.no/wp-json/wc/store/products/";
let cartArray = [];
// let data = [];
async function getProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = json;

    data.forEach((product) => {
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
        console.log(data);
        // console.log(event.target);
        // console.log(event.target.dataset);
        // console.log(event.target.dataset.product);

        // cartArray.push(event.target.dataset.product).toString();

        // console.log(cartArray);

        const itemToAdd = data.find(
          (item) => item.id === parseInt(event.target.dataset.product)
        );

        cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
      };
    });
  } catch (error) {
    console.log(error);
  }
}
getProducts();

function showCart(cartItems) {
  cart.style.display = "flex";
  cartList.innerHTML = " ";
  let total = 0;
  cartItems.forEach(function (cartElement) {
    total += parseInt(cartElement.prices.price);
    cartList.innerHTML += `
            <div class="cart-item">
            <h4>${cartElement.name}</h4>
            <div style="background-image: url(${cartElement.image})" class="cart-image"></div>
            </div>`;
  });
  totalContainer.innerHTML = `Total: ${total}`;
}
//# sourceMappingURL=products.js.map
