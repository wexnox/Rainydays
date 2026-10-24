import { productArray } from "../constants/productList.js";

const detailsContainer = document.querySelector(".product");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

function getProduct(id) {
    const product = productArray.find((item) => item.id === id);

    if (!product) {
        detailsContainer.innerHTML = `<p>Product not found</p>`;
        return;
    }

    document.title = product.name;
    createHTML(product);
}

getProduct(id);

function createHTML(product) {
    detailsContainer.innerHTML =
        `
<article class="product-detail">
    <div class="product-image">
        <img src="${product.image}" alt="${product.name} - ${product.description}" />
    </div>
    <div class="product-detail-info">
        <h1>${product.name}</h1>
        <p class="product-description">${product.description}</p>
        <p class="product-price"><span class="sr-only">Pris: </span>${product.price} NOK</p>
        <button class="product-button" aria-label="Legg ${product.name} i handlekurv" data-product="${product.id}">Add to cart</button>
    </div>
</article>
`;
}
