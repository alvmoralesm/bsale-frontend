//we define and initialize variables/constants
const categoriesList = document.getElementById("categoriesList"); //the categoriesLis variable that'll contain the different categories of products
let categories; //we initialize this variable for later use
let categoryId = ""; //we initialize this variable for later use

//asynchronous function that returns all the categories through an API call, after returning it fills the array of products that we defined
const getCategories = () => {
  fetch("https://bsale-api-am.herokuapp.com/api/v1/categories/")
    .then((data) => {
      return data.json();
    })
    .then((categories) => {
      fillCategories(categories); //we call the function that fills our categories and we pass the data returned from the backend
    })
    .then(() => {
      categories = document.querySelectorAll(".dropdown-item"); //we fill this variable previously initialized
      eventListenerToCategories(categories); //we call the function that adds the event listener to our elements and pass the list of category elements previously filled
    });
};

//here we fill the category for each instance of the list we pass, in this case the JSON Array returned from the API call
const fillCategories = (categoriesList) => {
  categoriesList.forEach((category) => {
    createNavCategory(category.id, capitalizeFirstChar(category.name)); //we call our function that creates the element containing our category on the nav, then we pass the paramaters to fill it
  });
};

//asynchronous function that returns all the products by categoryId which we pass as an entry parameter for the function, all of this through an API call
const getProductsByCategory = (categoryId) => {
  fetch(
    `https://bsale-api-am.herokuapp.com/api/v1/categories/${categoryId}/products`
  )
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      clearElement("productContainer"); //we clear the current products]
      fillProducts(products); //we call the function that fills our products passing the products on this API call
      getCategoryById();
    });
};

//function that returns the category by id which is defined as a global variable and passed as an entry parameter
const getCategoryById = () => {
  if (categoryId || categoryId !== "") {
    fetch(`https://bsale-api-am.herokuapp.com/api/v1/categories/${categoryId}`)
      .then((data) => {
        return data.json();
      })
      .then((category) => {
        fillCategoryName(capitalizeFirstChar(category[0].name));
      });
  }
};

//function that fills our element that'll contain our category name as a subtitle
const fillCategoryName = (categoryName) => {
  document.getElementById("categoryName").innerHTML = categoryName;
};

//we add an event listener for each category on the html
const eventListenerToCategories = (list) => {
  list.forEach((category) => {
    category.addEventListener("click", () => {
      categoryId = category.id.slice(-1); //we define the categoryId and get only the last character which corresponds to the categoryId

      getProductsByCategory(categoryId); //we call the function that makes the API call getting products by the categoryId, we pass the categoryId to make it work

      order.value = "";
    });
  });
};
