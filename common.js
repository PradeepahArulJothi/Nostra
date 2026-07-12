function loadCommonFunctions() {
    var headerAddCloseBtn = document.getElementById("header-add-close-btn");
    var headerNotification = document.getElementById("header-noticication");

    var menuIcon = document.getElementById("menu-icon");

    var mobileMenu = document.getElementById("mobile-menu");
    var mobileMenuCloseBtn = document.getElementById("mobile-menu-close-btn");
    var searchIcon = document.getElementById("search-icon");

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.style.top = "2px";
    }

    mobileMenu.addEventListener("click", () => {
        mobileMenu.style.display = "none";

    })

    headerAddCloseBtn.addEventListener("click", () => {
        headerNotification.style.display = "none";
        if (mobileMenuCloseBtn) {
            mobileMenuCloseBtn.style.top = "1px";
        }

    })

    menuIcon.addEventListener("click", () => {
        mobileMenu.style.display = "flex";
        mobileMenu.classList.add("mobile-menu");

    })

    mobileMenuCloseBtn.addEventListener("click", () => {
        mobileMenu.style.display = "none";
        mobileMenu.classList.remove("mobile-menu");
    })

    searchIcon.addEventListener("click", () => {
        if (mobileMenu) {
            mobileMenu.style.display = "none";
        }
        // targetElement.scrollIntoView();
        window.location.href = `collections.html#search-collections`;

    })

}