const detailContainer = document.querySelector(".sw-details");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "http://rainydays.noroff.wexox.no/details.html?" + id;

async function fetchProduct() {
  try {
    const response = await fetch(url);

    products = await response.text();
    // console.log(products);

    const product = products;
    // console.log(product);
    // document.name = product.name;
    createHtml(product);
  } catch (error) {
    console.log(error);
    detailContainer.innerHTML = message("error", error);
  }
}

fetchProduct();

function createHtml(product) {
  detailContainer.innerHTML = ` <h2>${product.name}</h2>
                                <p>${product.description}</p>
                                <div style="background-image: url(${product.image})" class="product-image"></div>
                                <div class="product-price">${product.price}</div>
                                <button class="product-button" data-product="${product.id}">Add to cart</button>
                                `;
}
