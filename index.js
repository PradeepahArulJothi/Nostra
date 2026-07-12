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

        // Add Link Button
        addToCart();


    } catch (error) {
        console.error("Failed to load components:", error);
    }

});


// Add Link Button
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


// left button scroll
function scrollIconLeftFunc() {
    document.getElementById("IconSlide")
        .scrollBy({ left: -350, behavior: "smooth" });
}


// right button scroll
function scrollIconRightFunc() {
    document.getElementById("IconSlide")
        .scrollBy({ left: 350, behavior: "smooth" });
}