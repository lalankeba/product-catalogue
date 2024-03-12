const baseUrl = 'https://fakestoreapi.com/products';
const productsArea = document.getElementById('products-area');
const productsContainer = document.getElementById('products-container');
const refreshBtn = document.getElementById('refresh-btn');
const errorArea = document.getElementById('error-area');
const errorDescription = document.getElementById('error-description');

productsArea.style.display = "none";
errorArea.style.display = "none";

const fetchProducts = async () => {
    try {
        const url = `${baseUrl}`;
        const response = await fetch(url);

        if (response.status == 200) {
            const products = await response.json();
            const shuffledProducts = shuffleArray(products);
            console.log(products);
            displayProducts(shuffledProducts);
        } else if (response.status == 404) {
            displayError("Products cannot be found");
        } else {
            displayError("Something unexpected happened. " + response.status);
        }
    } catch (error) {
        console.log('Error occurred', error);
    }
}

const displayProducts = (products) => {
    productsArea.style.display = "block";
    errorArea.style.display = "none";

    productsContainer.innerHTML = '';
    products.map(product => {
        const productLink = document.createElement("a");
        const productDiv = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const price = document.createElement("p");

        productLink.classList.add("product-link");
        productDiv.classList.add("product");
        title.classList.add("product-title");
        price.classList.add("product-price");

        productLink.setAttribute("href", "product.html?id=" + product.id);
        img.setAttribute("src", product.image);
        title.innerHTML = `${product.title}`;
        price.innerHTML = `$${product.price}`;

        productLink.appendChild(productDiv);
        productDiv.appendChild(img);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productsContainer.appendChild(productLink);
    });
}

const displayError = (message) => {
    productsArea.style.display = "none";
    errorArea.style.display = "block";

    errorDescription.innerHTML = message;
}

const shuffleArray = (array) => {
    return array.toSorted(() => 0.5 - Math.random());
}

fetchProducts();

const refreshProducts = () => {
    fetchProducts();
}

refreshBtn.addEventListener('click', refreshProducts);

