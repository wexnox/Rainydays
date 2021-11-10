const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url =
  "http://api.rainydays.noroff.wexox.no/wp-json/wc/store/products/" + id;
async function getProduct() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    const details = results;
    document.title = details.name;
    console.log(details);

    document.querySelector(".product__name").innerHTML = `${details.name}`;
    document.querySelector(
      ".product__short_description"
    ).innerHTML = `${details.short_description}`;
    document.querySelector(
      ".product__image"
    ).innerHTML = `<img class="product__image" src="${details.images[0].src}">`;
    document.querySelector(
      ".product__description"
    ).innerHTML = `${details.description}`;
    document.querySelector(
      ".product__price"
    ).innerHTML = `${details.price_html}`;
  } catch (error) {
    document.querySelector(".alert").innerHTML = message("error", error);
  }
}

getProduct(id);
//# sourceMappingURL=details.js.map
