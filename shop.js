/* =====================================================
   NRITHYA COLLECTIONS - SHOP
   ===================================================== */


/* ================= PRODUCT DATA ================= */

const products = [

    {
        id: 1,
        name: "Bharatanatyam Costume",
        category: "costumes",
        price: 4999,
        image: "images/bharatanatyam.png",
        description:
            "Traditional Bharatanatyam costume for performances and Arangetram.",
        badge: "Featured"
    },

    {
        id: 2,
        name: "Mohiniyattam Costume",
        category: "costumes",
        price: 4499,
        image: "images/mohiniyattam.png",
        description:
            "Elegant traditional costume for Mohiniyattam performances.",
        badge: ""
    },

    {
        id: 3,
        name: "Kuchipudi Costume",
        category: "costumes",
        price: 4799,
        image: "images/kuchipudi.png",
        description:
            "Classical Kuchipudi costume collection for stage performances.",
        badge: ""
    },

    {
        id: 4,
        name: "Kathakali Costume",
        category: "costumes",
        price: 6999,
        image: "images/kathakali.png",
        description:
            "Traditional Kathakali costume collection for performances.",
        badge: ""
    },

    {
        id: 5,
        name: "Ottamthullal Costume",
        category: "costumes",
        price: 3999,
        image: "images/ottamthullal.png",
        description:
            "Traditional Ottamthullal costume and performance essentials.",
        badge: ""
    },

    {
        id: 6,
        name: "Temple Jewellery Set",
        category: "jewellery",
        price: 1899,
        image: "images/jwellery.jpg",
        description:
            "Traditional temple jewellery for classical dance performances.",
        badge: "Popular"
    },

    {
        id: 7,
        name: "Traditional Ghungroo",
        category: "ghungroo",
        price: 899,
        image: "images/ghungroo.png",
        description:
            "Traditional dance bells for practice and performances.",
        badge: ""
    },

    {
        id: 8,
        name: "Kathakali Accessories Set",
        category: "accessories",
        price: 2299,
        image: "images/Kathakali%20Accessories.png",
        description:
            "Traditional accessories arranged as a performance set.",
        badge: ""
    },

    {
        id: 9,
        name: "Ottamthullal Accessories Set",
        category: "accessories",
        price: 1799,
        image: "images/Ottamthullal%20Accessories.png",
        description:
            "Traditional accessories for Ottamthullal performances.",
        badge: ""
    }

];


/* ================= CART ================= */

let cart =
    JSON.parse(
        localStorage.getItem("nrithyaCart")
    ) || [];


/* ================= VARIABLES ================= */

let selectedCategory = "all";


const productGrid =
    document.getElementById("productGrid");

const noProducts =
    document.getElementById("noProducts");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const categoryButtons =
    document.querySelectorAll(".category-button");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const accountButton =
    document.getElementById("accountButton");

const ordersButton =
    document.getElementById("ordersButton");

const accountModal =
    document.getElementById("accountModal");

const ordersModal =
    document.getElementById("ordersModal");

const toast =
    document.getElementById("toast");


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts(list) {

    productGrid.innerHTML = "";


    if (list.length === 0) {

        noProducts.style.display = "block";

        return;
    }


    noProducts.style.display = "none";


    list.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        /* Product badge */

        let badgeHTML = "";

        if (product.badge !== "") {

            badgeHTML = `
                <div class="product-badge">
                    ${product.badge}
                </div>
            `;

        }


        /*
         * PRODUCT IMAGE
         *
         * This is the only part changed
         * to display your uploaded images.
         */

        card.innerHTML = `

            ${badgeHTML}

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-details">

                <div class="product-category">
                    ${getCategoryName(product.category)}
                </div>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <div class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>


                    <button
                        class="add-cart-button"
                        onclick="addToCart(${product.id})">

                        Add to Cart

                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


/* ================= CATEGORY NAME ================= */

function getCategoryName(category) {

    if (category === "costumes") {
        return "Costumes";
    }

    if (category === "jewellery") {
        return "Jewellery";
    }

    if (category === "ghungroo") {
        return "Ghungroo";
    }

    if (category === "accessories") {
        return "Accessories";
    }

    return category;
}


/* =====================================================
   SEARCH AND FILTER
   ===================================================== */

function filterProducts() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(function(product) {

            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchText)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchText);


            return categoryMatch &&
                   searchMatch;

        });


    displayProducts(filtered);

}


/* ================= CATEGORY BUTTONS ================= */

categoryButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            categoryButtons.forEach(
                function(item) {

                    item.classList.remove("active");

                }
            );


            this.classList.add("active");


            selectedCategory =
                this.dataset.category;


            filterProducts();

        }
    );

});


/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    filterProducts
);


searchButton.addEventListener(
    "click",
    filterProducts
);


/* =====================================================
   CART
   ===================================================== */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const existing =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    showToast(
        product.name + " added to cart."
    );

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "nrithyaCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    let quantity = 0;

    let total = 0;


    cart.forEach(function(item) {

        quantity += item.quantity;

        total +=
            item.price *
            item.quantity;

    });


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        "₹" +
        total.toLocaleString("en-IN");


    displayCart();

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p style="
                text-align:center;
                padding:40px 10px;
                color:#806d65;
            ">

                Your cart is empty.

            </p>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function(item) {

        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)">

                        +

                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item =
        cart.find(function(product) {

            return product.id === id;

        });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(product) {

                return product.id !== id;

            });

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE ITEM ================= */

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

cartButton.addEventListener(
    "click",
    function() {

        cartPanel.classList.add("open");

        cartOverlay.classList.add("show");

    }
);


/* ================= CLOSE CART ================= */

function closeCartPanel() {

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("show");

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* =====================================================
   ACCOUNT
   ===================================================== */

accountButton.addEventListener(
    "click",
    function() {

        accountModal.classList.add("show");

    }
);


/* ================= CLOSE MODALS ================= */

document
    .querySelectorAll(".modal-close")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const id =
                    this.dataset.close;


                document
                    .getElementById(id)
                    .classList.remove("show");

            }
        );

    });


/* ================= LOGIN / REGISTER ================= */

const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");


document
    .getElementById("showRegister")
    .addEventListener(
        "click",
        function() {

            loginSection.classList.add(
                "hidden"
            );

            registerSection.classList.remove(
                "hidden"
            );

        }
    );


document
    .getElementById("showLogin")
    .addEventListener(
        "click",
        function() {

            registerSection.classList.add(
                "hidden"
            );

            loginSection.classList.remove(
                "hidden"
            );

        }
    );


/* ================= REGISTER ================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value;


            const email =
                document.getElementById(
                    "registerEmail"
                ).value;


            localStorage.setItem(
                "nrithyaUser",
                JSON.stringify({

                    name: name,

                    email: email

                })
            );


            registerSection.classList.add(
                "hidden"
            );

            loginSection.classList.remove(
                "hidden"
            );


            showToast(
                "Account created successfully."
            );

        }
    );


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            showToast(
                "Sign in successful."
            );


            accountModal.classList.remove(
                "show"
            );

        }
    );


/* =====================================================
   ORDERS
   ===================================================== */

ordersButton.addEventListener(
    "click",
    function() {

        displayOrders();

        ordersModal.classList.add("show");

    }
);


function displayOrders() {

    const ordersList =
        document.getElementById(
            "ordersList"
        );


    const orders =
        JSON.parse(
            localStorage.getItem(
                "nrithyaOrders"
            )
        ) || [];


    if (orders.length === 0) {

        return;
    }


    ordersList.innerHTML = "";


    orders.forEach(function(order) {

        const div =
            document.createElement("div");

        div.className = "order-card";


        div.innerHTML = `

            <h3>
                Order #${order.id}
            </h3>

            <p>
                Date: ${order.date}
            </p>

            <p>
                Items: ${order.items}
            </p>

            <p>
                Total:
                ₹${order.total.toLocaleString("en-IN")}
            </p>

            <p>
                Status: Order Placed
            </p>

        `;


        ordersList.appendChild(div);

    });

}


/* =====================================================
   CHECKOUT
   ===================================================== */

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;
        }


        let total = 0;

        let itemCount = 0;


        cart.forEach(function(item) {

            total +=
                item.price *
                item.quantity;

            itemCount +=
                item.quantity;

        });


        const orders =
            JSON.parse(
                localStorage.getItem(
                    "nrithyaOrders"
                )
            ) || [];


        orders.push({

            id:
                Date.now()
                    .toString()
                    .slice(-6),

            date:
                new Date()
                    .toLocaleDateString("en-IN"),

            items:
                itemCount,

            total:
                total

        });


        localStorage.setItem(
            "nrithyaOrders",
            JSON.stringify(orders)
        );


        cart = [];


        saveCart();

        updateCart();

        closeCartPanel();


        showToast(
            "Order placed successfully."
        );

    }
);


/* =====================================================
   TOAST MESSAGE
   ===================================================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   START SHOP
   ===================================================== */

displayProducts(products);

updateCart();              
                            
