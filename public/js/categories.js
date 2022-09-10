//we define and initialize the categoriesLis variable that'll contain the different categories of products
const categoriesList = document.getElementById("categoriesList");

//asynchronous function that returns all the categories throught an API call, after returning it fills the array of products that we defined
const getCategories = async () => {
  fetch("http://localhost:3001/api/v1/categories/")
    .then((data) => {
      return data.json();
    })
    .then((categories) => {
      console.log(categories);
      fillCategories(categories);
    });
};

//here we fill the category for each instance of the list we pass, in this case the JSON Array returned from the API call
const fillCategories = (categoriesList) => {
  categoriesList.forEach((category) => {
    createNavCategory(category.id, capitalizeFirstChar(category.name));
  });
};
