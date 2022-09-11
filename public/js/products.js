//we define and initialize variables/constants
const productContainer = document.getElementById("productContainer"); //the productContainer variable that'll contain the products when filled

const productsSection = document.getElementById("productsSection"); // nav section that contains all products

const searchBox = document.getElementById("searchBox"); //searchBox, for later retrieval of its value

const order = document.getElementById("orderBy"); //

let orderBy = "";
let sort = "";

//asynchronous function that returns all the products throught an API call, after returning it fills the array of products that we defined
const getProducts = () => {
  fetch("https://bsale-api-am.herokuapp.com/api/v1/products")
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
      product.discount,
      product.url_image === null || !product.url_image
        ? "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" //we ask if the instance of the product contains image, if not we fill it with another one that displays that no image could be found
        : product.url_image
    );
  });
};

//we make the call to our API passing the search paramaters
const searchProduct = (searchValue) => {
  fetch("https://bsale-api-am.herokuapp.com/api/v1/products/search/", {
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

//function that brings us our products sorted
const getSortedProducts = () => {
  let apiUrl = ""; //we initialize our API url as an empty string

  //we evaluate if there is a categoryId
  if (!categoryId || categoryId == "") {
    apiUrl = `https://bsale-api-am.herokuapp.com/api/v1/products?orderBy=${orderBy}&sort=${sort}`;
  } else {
    //if there is a categoryId we change a litte the url and pass the categoryId to sort the products obtained by that category
    apiUrl = `https://bsale-api-am.herokuapp.com/api/v1/categories/${categoryId}/products?orderBy=${orderBy}&sort=${sort}`;
  }
  fetch(apiUrl)
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      clearElement("productContainer"); //we clear our container
      fillProducts(products); //then fill it with our new sorted products
    });
};

//we add an event listener to de nav item that'll display all of our products
searchBox.addEventListener("keyup", (e) => {
  searchProduct(e.target.value);
});

//we add an event listener to de nav item that'll display all of our products
productsSection.addEventListener("click", () => {
  categoryId = ""; //we pass an empty string because where not filtering by category, this comes in handy for the search functionality
  clearElement("productContainer");
  getProducts();
});

//we add and event listener to our select filter
order.addEventListener("change", (e) => {
  //we evaluate if the selected option has a value, if truthy we fill and split or variables for future sorting, if falsy we fill them as empty strings
  if (e.target.value !== "" || e.target.value) {
    const splitValue = e.target.value.split("-"); //we split the value because we need to handle it in the query as two separate values
    orderBy = splitValue[0];
    sort = splitValue[1].toUpperCase();
  } else {
    orderBy = "";
    sort = "";
  }

  //we call our sort product function
  getSortedProducts();
});
