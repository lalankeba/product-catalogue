const baseUrl = 'https://fakestoreapi.com/products';
const productArea = document.getElementById('product-area');
const errorArea = document.getElementById('error-area');
const errorDescription = document.getElementById('error-description');

productArea.style.display = "none";
errorArea.style.display = "none";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const searchProduct = async (id) => {
    try {
        const url = `${baseUrl}/${id}`;
        const response = await fetch(url);

        if (response.status == 200) {
            const text = await response.text();
            if (text === '' || text === undefined || text === null) {
                displayError("Product cannot be found for id: " + id);
            } else {
                const product = JSON.parse(text);
                displayProduct(product);
            }
        } else if (response.status == 404) {
            displayError("Product cannot be found for id: " + id);
        } else {
            displayError("Something unexpected happened. " + response.status);
        }
    } catch (error) {
        displayError("Error occurred. " + error);
        console.log(error);
    }
}

const displayProduct = (product) => {
    productArea.style.display = "block";
    errorArea.style.display = "none";

    const productImg = document.getElementById('product-image');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const productCategory = document.getElementById('product-category');

    document.title = product.title;
    productImg.classList.add("product-image");
    productImg.setAttribute("src", product.image);
    productTitle.innerHTML = product.title;
    productDescription.innerHTML = product.description;
    productPrice.innerHTML = '$ ' + product.price;
    productCategory.innerHTML = product.category;

    console.log(product);
}

const displayError = (message) => {
    productArea.style.display = "none";
    errorArea.style.display = "block";

    errorDescription.innerHTML = message;
}

if (urlParams.has('id')) {
    const id = urlParams.get('id');
    if (isNaN(id)) {
        displayError("Product id: " + id + " is NOT a number. It must be a valid number.");
    } else {
        searchProduct(id);
    }
} else {
    displayError("Need to pass id as a parameter in the url.");
}
