//util functions that allows us to format the price to display it properly
const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

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

//event listener that gets triggered when all dom content is loaded
window.addEventListener("DOMContentLoaded", getProducts);
