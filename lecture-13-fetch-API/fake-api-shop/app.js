let BASE_URL = "https://fakestoreapi.com/products";
const categoryFilter = document.querySelector("#category-filter");
const productList = document.querySelector("#product-list");
const priceSort = document.getElementById("price-sort");

let allProducts = []; //globlystores all products feteched from api
let filteredProducts = []; //globaly storing filtered products based on category

async function fetchProducts() {
  try {
    const categoriesResponse = await fetch(`${BASE_URL}/categories`);
    // console.log(response);
    const categories = await categoriesResponse.json();
    // console.log(products);
    populateCategories(categories);
    
    const productResponse = await fetch(BASE_URL);
    allProducts = await productResponse.json();
    // console.log(allProducts);
    filteredProducts = [...allProducts];// storing all products initialy in filteredProducts 
    // console.log(filteredProducts);
    displayProducts(filteredProducts);

    categoryFilter.addEventListener("change", () => filterByCategory());
    priceSort.addEventListener("change", () => sortProducts());
  } catch (error) {
    console.log(error.message);
  }
}

// populate categories in categories option
function populateCategories(categories) {
  try {
    // console.log(categories)
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryFilter.appendChild(option);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function displayProducts(products) {
  try {
    productList.innerHTML = "";
    console.log(products);
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");

      productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-info">
                        <h2 class="product-title">${product.title}</h2>
                        <p class="product-price">$${product.price}</p>
                    </div>
                `;

      productList.appendChild(productCard);
    });
  } catch (error) {
    console.log(error.message);
  }
}

//filtering products by category 
async function filterByCategory() {
  try {
    const category = categoryFilter.value;
    // console.log(category)
    if (category === "all") {
      filteredProducts = [...allProducts];
      console.log(filteredProducts);
    } else {
      filteredProducts = filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
    }

    displayProducts(filteredProducts);
    sortProducts();
  } catch (error) {
    console.log(error.message);
  }
}
// Sort products by price
function sortProducts() {
  const sortOption = priceSort.value;

  console.log(priceSort.value);
  

  let sortedProducts = [...filteredProducts];

  if (sortOption === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } 

  displayProducts(sortedProducts);
}
fetchProducts();
