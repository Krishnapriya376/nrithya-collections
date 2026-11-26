/* =====================================================
   NRITHYA COLLECTIONS - SHOP PAGE
   ===================================================== */


/* ================= CART DATA ================= */

let cart =
    JSON.parse(
        localStorage.getItem("nrithyaCart")
    ) || [];


/* ================= ELEMENTS ================= */

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


/* ================= UPDATE CART COUNT ================= */

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity;

    });

    cartCount.textContent =
        totalItems + " items";
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "nrithyaCart",
        JSON.stringify(cart)
    );

}


/* ================= ADD TO CART ================= */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const name =
                this.getAttribute("data-name");

            const price =
                Number(
                    this.getAttribute("data-price")
                );


            const existingProduct =
                cart.find(function (item) {

                    return item.name === name;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            saveCart();

            updateCartCount();

            renderCart();


            this.textContent =
                "Added ✓";


            setTimeout(
                function () {

                    button.textContent =
                        "Add to Cart";

                },
                1000
            );

        }
    );

});


/* ================= RENDER CART ================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-state">

                <div>
                    🛒
                </div>

                <h3>
                    Your Cart is Empty
                </h3>

                <p>
                    Add products to your cart
                    to see them here.
                </p>

            </div>

        `;

        cartTotal.textContent =
            "Total: ₹0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(
        function (item, index) {

            total +=
                item.price *
                item.quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-product";


            itemElement.innerHTML = `

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                </div>

                <div>

                    <p>
                        ₹${item.price *
                            item.quantity}
                    </p>

                    <button
                        class="remove-cart"
                        data-index="${index}">

                        Remove

                    </button>

                </div>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    cartTotal.textContent =
        "Total: ₹" + total;


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.getAttribute(
                                "data-index"
                            )
                        );


                    cart.splice(
                        index,
                        1
                    );


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        }
    );

}


/* ================= CART BUTTON ================= */

document
    .getElementById("cartButton")
    .addEventListener(
        "click",
        function () {

            document
                .getElementById("cartModal")
                .classList.add("show");

            renderCart();

        }
    );


/* ================= ACCOUNT BUTTON ================= */

document
    .getElementById("accountButton")
    .addEventListener(
        "click",
        function () {

            document
                .getElementById("accountModal")
                .classList.add("show");

        }
    );


/* ================= ORDERS BUTTON ================= */

document
    .getElementById("ordersButton")
    .addEventListener(
        "click",
        function () {

            document
                .getElementById("ordersModal")
                .classList.add("show");

        }
    );


/* ================= CLOSE MODALS ================= */

const closeButtons =
    document.querySelectorAll(
        ".close-button"
    );


closeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    this.getAttribute(
                        "data-close"
                    );


                document
                    .getElementById(
                        modalId
                    )
                    .classList.remove(
                        "show"
                    );

            }
        );

    }
);


/* ================= CLOSE OUTSIDE MODAL ================= */

document
    .querySelectorAll(".modal")
    .forEach(
        function (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === modal
                    ) {

                        modal.classList
                            .remove("show");

                    }

                }
            );

        }
    );


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchButton =
    document.getElementById(
        "searchButton"
    );


function searchProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    let foundProducts = 0;


    products.forEach(
        function (product) {

            const productText =
                product.textContent
                    .toLowerCase();


            if (
                searchText === "" ||
                productText.includes(
                    searchText
                )
            ) {

                product.style.display =
                    "";

                foundProducts++;

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    const noResults =
        document.getElementById(
            "noResults"
        );


    if (foundProducts === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}


searchButton.addEventListener(
    "click",
    searchProducts
);


searchInput.addEventListener(
    "input",
    searchProducts
);


/* ================= CATEGORY FILTER ================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


const products =
    document.querySelectorAll(
        ".product-card"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {

                        item.classList
                            .remove(
                                "active"
                            );

                    }
                );


                this.classList.add(
                    "active"
                );


                const filter =
                    this.getAttribute(
                        "data-filter"
                    );


                searchInput.value = "";


                let foundProducts = 0;


                products.forEach(
                    function (product) {

                        const category =
                            product.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "All" ||
                            category === filter
                        ) {

                            product.style.display =
                                "";

                            foundProducts++;

                        } else {

                            product.style.display =
                                "none";

                        }

                    }
                );


                document
                    .getElementById(
                        "noResults"
                    )
                    .style.display =
                        foundProducts === 0
                            ? "block"
                            : "none";

            }
        );

    }
);


/* ================= CATEGORY CARDS ================= */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const category =
                    this.getAttribute(
                        "data-category"
                    );


                const matchingButton =
                    document.querySelector(
                        `.filter-button[data-filter="${category}"]`
                    );


                if (matchingButton) {

                    matchingButton.click();

                }


                document
                    .getElementById(
                        "products"
                    )
                    .scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }
        );

    }
);


/* ================= SIGN IN ================= */

document
    .getElementById("signInButton")
    .addEventListener(
        "click",
        function () {

            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value.trim();


            if (
                email === "" ||
                password === ""
            ) {

                alert(
                    "Please enter your email and password."
                );

                return;

            }


            alert(
                "Sign in system will be connected to the backend later."
            );

        }
    );


/* ================= CREATE ACCOUNT ================= */

document
    .getElementById(
        "createAccountButton"
    )
    .addEventListener(
        "click",
        function () {

            alert(
                "Account registration will be connected to the backend later."
            );

        }
    );


/* ================= CHECKOUT ================= */

document
    .getElementById(
        "checkoutButton"
    )
    .addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;

            }


            alert(
                "Checkout will be available after the online ordering system is connected."
            );

        }
    );


/* ================= INITIALIZE ================= */

updateCartCount();

renderCart();
