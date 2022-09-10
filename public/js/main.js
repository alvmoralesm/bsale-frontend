//util functions that allows us to format the price to display it properly
const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

//function to capitalize the first character of a string
const capitalizeFirstChar = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

//function that creates the different elements that'll contain the product, when used we pass the parameters of the table into the card to fill it
const createCard = (productName, productPrice, productImg) => {
  let divCol = document.createElement("div");
  divCol.classList.add("col-lg-3");
  divCol.classList.add("col-md-6");
  divCol.classList.add("col-12");

  let divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.classList.add("shadow");
  divCard.classList.add("mt-3");

  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.src = productImg;

  let divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = productName;

  let cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text");
  cardPrice.innerHTML = formatter.format(productPrice);

  divCol.append(divCard);
  divCard.append(cardImg);
  divCard.append(divCardBody);
  divCardBody.append(cardTitle);
  divCardBody.append(cardPrice);

  productContainer.append(divCol);
};

//function that creates the different elements that'll contain the product, when used we pass the parameters of the table into the card to fill it
const createNavCategory = (categoryId, categoryName) => {
  //the structure is in this particular way because it is following how you create a list item in a dropdown according to Bootstrap 5
  let li = document.createElement("li");
  let a = document.createElement("a");

  a.classList.add("dropdown-item");
  a.id = `category-id-${categoryId}`;
  a.innerHTML = categoryName;

  li.append(a);

  categoriesList.append(li);
};

//event listener that gets triggered when all dom content is loaded
window.addEventListener("DOMContentLoaded", () => {
  getProducts();
  getCategories();
});
