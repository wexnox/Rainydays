const detailsContainer = document.querySelector(".product-details")
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
        `<h2>${product.name}</h2>
		<p>Description: ${product.description}</p>
		<p>Price: ${product.prices.price}</p>`

}