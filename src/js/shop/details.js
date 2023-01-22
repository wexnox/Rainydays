const detailsContainer = document.querySelector(".product")
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getProduct(id) {
    try {
        const url = "http://api.rainydays.wexox.no/wp-json/wc/store/products/" + id;
        console.log(url);

        const response = await fetch(url);
        const product = await response.json();

        document.title = product.name;
        createHTML(product);
    } catch {

        // detailsContainer.innerHTML = message("error");
    }
}

getProduct(id);
// TODO: Styling
function createHTML(product) {
    detailsContainer.innerHTML =
        `
<div class="product">
    <h2>${product.name}</h2>
	    <p>Description: ${product.description}</p>
	<div style="background-image: url(${product.images[0].src})" class="product-image"></div>
   <div>  
        <p>Price: </p>
        <div class="product-price">${product.prices.price}  ${product.prices.currency_symbol}</div>
   </div>
   <button class="product-button" data-product="${product.id}">Add to cart</button>
</div>
`

}