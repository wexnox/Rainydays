const detailsContainer = document.querySelector(".product__details__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "http://rainydays.wexox.no/details.html?" + id;
console.log(id);
console.log(url);

async function fetchDetails() {
  try {
    // const response = await fetch(url);
    // const details = await response.text();
    // console.log(details);
    console.log(id);

    // createHtml(details);
  } catch (error) {
    console.log(error);
    // detailsContainer.innerHTML = message("error", error);
  }
}

fetchDetails();

// function createHtml(details) {
//   detailsContainer.innerHTML = ` <h2>${details.name}</h2>
//                                 <a href="${details.id}"> Link to movie</a></p>
//                                 <h4>Opening crawl:</h4>
//                                 <p>${details.description}</p>
//                                 `;
// }
