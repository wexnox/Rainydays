const detailsContainer = document.querySelector(".product__details__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(params);

console.log(id);

const url = "https://rainydays.wexox.no/" + id;

async function fetchFilm() {
  try {
    const response = await fetch(url);

    const details = await response.json();
    console.log(details);

    const product = details;
    console.log(fproduct);
    document.title = product.properties.title;
    createHtml(fproduct);
  } catch (error) {
    console.log(error);
    // detailsContainer.innerHTML = message("error", error);
  }
}

fetchFilm();

function createHtml(product) {
  detailsContainer.innerHTML += `
    <div class="product">
  <a href="details.html?id${product.id}">
    <h2>${product.name}</h2>
      <p>${product.description}</p>
    <div style="background-image: url(${product.image})" class="product-image"></div>
    </a>
    <div class="product-price">${product.price}</div>
    <button class="product-button" data-product="${product.id}">Add to cart</button>
  </div> `;
}
//# sourceMappingURL=details.js.map
