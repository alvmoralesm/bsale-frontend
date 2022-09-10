//we define and initialize variables/constants
const productContainer = document.getElementById("productContainer"); //the productContainer variable that'll contain the products when filled

const productsSection = document.getElementById("productsSection"); // nav section that contains all products

const searchBox = document.getElementById("searchBox"); //searchBox, for later retrieval of its value

//asynchronous function that returns all the products throught an API call, after returning it fills the array of products that we defined
const getProducts = async () => {
  fetch("http://localhost:3001/api/v1/products/")
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      fillProducts(products);
    });
};

//here we fill the product for each instance of the list we pass, in this case the JSON Array returned from the API call
const fillProducts = (productsList) => {
  productsList.forEach((product) => {
    createCard(
      product.name,
      product.price,
      product.url_image === null || !product.url_image
        ? "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" //we ask if the instance of the product contains image, if not we fill it with another one that displays that no image could be found
        : product.url_image
    );
  });
};

//we make the call to our API passing the search paramaters
const searchProduct = (searchValue) => {
  fetch("http://localhost:3001/api/v1/products/search/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchValue: searchValue, categoryId: categoryId }),
  })
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      clearElement("productContainer"); //we clear our container
      fillProducts(products); //then fill it with our searched products
    });
};

//
searchBox.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  searchProduct(e.target.value);
});

//we add an event listener to de nav item that'll display all of our products
productsSection.addEventListener("click", () => {
  categoryId = ""; //we pass an empty string because where not filtering by category, this comes in handy for the search functionality
  clearElement("productContainer");
  getProducts();
});
