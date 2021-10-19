// Lists all products
async function getProducts() {
  try {
    const response = await fetch(
      "http://api.rainydays.noroff.wexox.no/wp-json/wc/store/products"
    );
    const productsResponse = await response.json();
    const productResults = productsResponse;

    productResults.forEach((product) => {
      document.querySelector(".products").innerHTML += `
        <div class="product">
        <a href="details.html?id=${product.id}">
        <h2>${product.name}</h2>
         </a>
            <p>${product.short_description}</p>
            
            <div style="background-image: url(${product.images[0].src})" class="product-image"></div>

            <p>${product.description}</p>
            <div class="product-price">${product.price_html}</div>
            <button class="product-button" data-product="${product.id}">Add to cart</button>
        </div>`;
    });
  } catch (error) {
    console.log(error);
    document.querySelector(".alert").innerHTML = message("error", error);
  }
}

getProducts();
