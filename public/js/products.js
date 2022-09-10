//we define and initialize the productContainer variable that'll contain the products when filled
const productContainer = document.getElementById("productContainer");

//asynchronous function that returns all the products throught an API call, after returning it fills the array of products that we defined
const getProducts = async () => {
  fetch("http://localhost:3001/api/v1/products/")
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      fillProducts(products);
      console.log(products);
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
