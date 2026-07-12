document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [header, footer] = await Promise.all([
            fetch("header.html").then(res => res.text()),
            fetch("footer.html").then(res => res.text())
        ]);

        document.getElementById("header").innerHTML = header;
        document.getElementById("footer").innerHTML = footer;

        // Call common functionality after HTML is loaded
        loadCommonFunctions();

        // Search Functionality
        var searchText = document.getElementById("search-collections");
        var collectionsContainer = document.getElementById("collections-container");
        var collectionList = collectionsContainer.querySelectorAll(".product-card");
        var noResults = document.getElementById("noResults");

        searchText.addEventListener("keyup", (event) => {
            var enteredDress = event.target.value.toLowerCase().trim();
            let searchCount = 0;

            if (collectionList) {
                collectionList.forEach((product) => {
                    let collectionName = product.querySelector(".product-name").textContent.toLowerCase().trim();

                    if (collectionName.includes(enteredDress)) {
                        product.style.display = "block";
                        searchCount++;
                    }
                    else {
                        product.style.display = "none";
                    }
                })
            }

            if (searchCount === 0) {
                noResults.style.display = "block";
            }
            else {
                noResults.style.display = "none";
            }

        })

        // Checkbox Filter
        const checkboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
        const allCheckbox = document.querySelector("input[value='all']");

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {

                // If any category checkbox is selected
                if (this !== allCheckbox && this.checked) {
                    allCheckbox.checked = false;
                }

                // If All checkbox selected
                if (this === allCheckbox && this.checked) {
                    checkboxes.forEach((item) => {

                        if (item !== allCheckbox) {
                            item.checked = false;
                        }
                    });
                }
                filterProducts();
            });
        });
        
        allCheckbox.addEventListener("change", function () {
            if (this.checked) {
                checkboxes.forEach((checkbox) => {

                    if (checkbox !== allCheckbox) {
                        checkbox.checked = false;
                    }
                });
            }
            filterProducts();
        });

        checkboxes.forEach((checkbox) => {
            if (checkbox !== allCheckbox) {
                checkbox.addEventListener("change", function () {
                    if (this.checked) {
                        allCheckbox.checked = false;
                    }
                });
            }
        });

        // filterProducts call from chekbox filter
        function filterProducts() {
            let selectedCategories = [];
            let filterCount = 0;

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked && checkbox.value !== "all") {

                    selectedCategories.push(
                        checkbox.value.toLowerCase()
                    );
                }
            });


            collectionList.forEach((product) => {
                let productCategory = product.getAttribute("data-category").toLowerCase();

                // Show all when All checked or no checkbox selected
                if (
                    allCheckbox.checked ||
                    selectedCategories.length === 0
                ) {
                    product.style.display = "block";
                    filterCount++;
                }
                else if ( // Match selected categories
                    selectedCategories.some(category =>
                        productCategory.includes(category)
                    )
                ) {
                    product.style.display = "block";
                    filterCount++;
                }
                else {
                    product.style.display = "none";
                }
            });

            if (filterCount === 0) {
                noResults.style.display = "block";
            }
            else {
                noResults.style.display = "none";
            }
        }

        //Focus on search icon click
        searchFocus();

        //Add to cart
        addToCart();

    } catch (error) {
        console.error("Failed to load components:", error);
    }

});

//Add to cart
function addToCart() {
    const quickAddButtons = document.querySelectorAll(".quick-add");
    const cartCount = document.getElementById("cartCount");
    let count = 0;

    quickAddButtons.forEach(button => {
        button.addEventListener("click", (event) => {

            event.stopPropagation();
            count++;
            if (cartCount) {
                cartCount.innerText = count;
            }
        });
    });
}

//Focus on search icon click
function searchFocus() {
    // 1. Get the target element to focus
    const targetElement = document.getElementById('search-collections');

    // 2. Scroll it into view and set focus
    targetElement.scrollIntoView({
        behavior: 'smooth', // Animates the scroll
        block: 'center',    // Aligns the element vertically in the middle of the screen
        inline: 'nearest'   // Aligns horizontally if needed
    });

    // 3. Programmatically focus the element if it's interactive (like an input)
    targetElement.focus({ preventScroll: true });
}


