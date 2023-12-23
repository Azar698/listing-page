// Selecting elements
const productEl = document.querySelector(".products-container");
const productTitleEl = document.querySelector(".product-title");
const listAciveBtn = document.getElementById("list-acive-btn");
const gridAciveBtn = document.getElementById("grid-acive-btn");
const apiUrl = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";

// Function to handle search
function highlightText() {
    const searchText = document.getElementById('searchText').value;
    const container = document.querySelector('.products-container');
    const productTitles = container.querySelectorAll('.product-title');

    // Reset previous highlights
    productTitles.forEach(title => {
        title.innerHTML = title.textContent;
    });

    if (searchText.trim() !== '') {
        const regex = new RegExp(searchText, 'gi');
        productTitles.forEach(title => {
            title.innerHTML = title.textContent.replace(regex, match => `<mark>${match}</mark>`);
        });
    }
}

// Switching to list view
function listView() {
    productEl.classList.remove("products-container-grid");
    productEl.classList.add("products-container");
}

// Switching to grid view
function gridView() {
    productEl.classList.remove("products-container");
    productEl.classList.add("products-container-grid");
}

// Event listeners for view buttons
listAciveBtn.addEventListener("click", listView);
gridAciveBtn.addEventListener("click", gridView);

// Fetching data
const fetchData = async () => {
    try {
        const response = await fetch(apiUrl);
        const { data } = await response.json();

        data.forEach((eachItem) => {
            const { product_variants, product_badge, product_title } = eachItem;
            productEl.innerHTML += `
                <div class="product-card">
                    <div class="image-container">
                        <div class="new-box">${product_badge}</div>
                        <img id="productImage" src="assets/cap-1.png" alt="product-img"/>
                    </div>
                    <div class="product-details">
                        <h1 class="product-title">${product_title}</h1>
                        <p>Blue / S</p>
                        <p>BLUE / M</p>
                        <p>BLUE / L</p>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error(error);
    }
};

// Callback for fetching data
fetchData();
