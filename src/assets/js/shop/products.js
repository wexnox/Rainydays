import { productArray } from "../constants/productList.js";
import displayMessage from "../component/displayMessage.js";

const productsContainer = document.querySelector(".products");

function getProducts() {
  try {
    productsContainer.innerHTML = "";

    productArray.forEach(function (product) {
      productsContainer.innerHTML += `
<article class="product">
    <a href="details.html?id=${product.id}" aria-label="Se detaljer for ${product.name}">
        <div class="product-image">
            <img src="${product.image}" alt="${product.name} - ${product.description}" />
        </div>
        <div class="product-info">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
        </div>
    </a>
    <div class="product-footer">
        <p class="product-price"><span class="sr-only">Pris: </span>${product.price} NOK</p>
        <button class="product-button" aria-label="Legg ${product.name} i handlekurv" data-product="${product.id}">Add to cart</button>
    </div>
</article>
`;
    });
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = displayMessage("error", error);
  }
}

getProducts();
