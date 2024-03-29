// import { productArray } from "/assets/js/constants/productList.js";

const url = 'http://api.rainydays.wexox.no/wp-json/wc/store/products'

const productsContainer = document.querySelector(".products");
const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let cartArray = [];

async function getProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    productsContainer.innerHTML = "";

    json.forEach(function(product) {
      productsContainer.innerHTML += `
<div class="product">
    <a href="details.html?id=${product.id}"><h2>${product.name}</h2>
        <p>${product.description}</p>
         <div style="background-image: url(${product.images[0].src})" class="product-image"></div>
    </a>
   <div>  
       <p>Price: </p>
            <div class="product-price">
           ${product.prices.price}  ${product.prices.currency_symbol}
            </div>
   </div>
   <button class="product-button" data-product="${product.id}">Add to cart</button>
</div>
`

    })
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = alert("error", error);
  }
}
getProducts();

//
// productArray.forEach(function (product) {
//   productsContainer.innerHTML += `
//   <div class="product">
//
//     <h2>${product.name}</h2>
//     <p>${product.description}</p>
//     <div style="background-image: url(${product.image})" class="product-image"></div>
//     <div>
//       <p>Price: </p>
//         <div class="product-price">
//           ${product.price}
//         </div>
//     </div>
//     <button class="product-button" data-product="${product.id}">Add to cart</button>
//   </div> `;
// });

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
