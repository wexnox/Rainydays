const url = "http://api.rainydays.noroff.wexox.no/wp-json/wc/store/products/";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

export async function getProducts() {
  let response = await fetch(url);
  let data = await response.json();
  let products = data.items;
  return products;
}
//# sourceMappingURL=api.js.map
