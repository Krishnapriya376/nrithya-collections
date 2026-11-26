// ===============================
// PRODUCT DATA
// ===============================

const products = [
    {
        id: 1,
        name: "Bharatanatyam Costume",
        category: "costumes",
        price: 4999,
        image: "images/bharatanatyam.png",
        description: "Traditional Bharatanatyam costume for performances and Arangetram.",
        badge: "Featured"
    },

    {
        id: 2,
        name: "Mohiniyattam Costume",
        category: "costumes",
        price: 4499,
        image: "images/mohiniyattam.png",
        description: "Elegant traditional costume for Mohiniyattam performances.",
        badge: ""
    },

    {
        id: 3,
        name: "Kuchipudi Costume",
        category: "costumes",
        price: 4799,
        image: "images/kuchipudi.png",
        description: "Classical Kuchipudi costume collection for stage performances.",
        badge: ""
    },

    {
        id: 4,
        name: "Kathakali Costume",
        category: "costumes",
        price: 6999,
        image: "images/kathakali.png",
        description: "Traditional Kathakali costume collection for performances.",
        badge: ""
    },

    {
        id: 5,
        name: "Ottamthullal Costume",
        category: "costumes",
        price: 3999,
        image: "images/ottamthullal.png",
        description: "Traditional Ottamthullal costume and performance essentials.",
        badge: ""
    },

    {
        id: 6,
        name: "Temple Jewellery Set",
        category: "jewellery",
        price: 1899,
        image: "images/jwellery.jpg",
        description: "Traditional temple jewellery for classical dance performances.",
        badge: "Popular"
    },

    {
        id: 7,
        name: "Traditional Ghungroo",
        category: "ghungroo",
        price: 899,
        image: "images/ghungroo.png",
        description: "Traditional dance bells for practice and performances.",
        badge: ""
    },

    {
        id: 8,
        name: "Kathakali Accessories Set",
        category: "accessories",
        price: 2299,
        image: "images/Kathakali Accessories.png",
        description: "Traditional accessories arranged as a performance set.",
        badge: ""
    },

    {
        id: 9,
        name: "Ottamthullal Accessories Set",
        category: "accessories",
        price: 1799,
        image: "images/Ottamthullal Accessories.png",
        description: "Traditional accessories for Ottamthullal performances.",
        badge: ""
    }
];


// ===============================
// VARIABLES
// ===============================

let cart = JSON.parse(localStorage.getItem("nrithyaCart")) || [];

let currentCategory = "all";


// ===============================
// PRODUCT DISPLAY
// ===============================

function displayProducts(productList) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try searching for another dance costume or accessory.</p>
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";


        productCard.innerHTML = `

            <div class="product-image">

                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
                >

            </div>


            ${product.badge ? `
                <span class="product-badge">
                    ${product.badge}
                </span>
            ` : ""}


            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button 
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(productCard);

    });

}


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();


    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        return matchesSearch && matchesCategory;

    });


    displayProducts(filteredProducts);

}


// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory(category) {

    currentCategory = category;


    document.querySelectorAll(".category-btn").forEach(button => {

        button.classList.remove("active");

    });


    const selectedButton =
        document.querySelector(
            `.category-btn[data-category="${category}"]`
        );


    if (selectedButton) {
        selectedButton.classList.add("active");
    }


    searchProducts();

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;


    const existingItem = cart.find(
        item => item.id === productId
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast(`${product.name} added to cart`);

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "nrithyaCart",
        JSON.stringify(cart)
    );

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
            </div>
        `;

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img 
                    src="${item.image}" 
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>


                <div class="quantity-controls">

                    <button 
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button 
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button 
                    class="remove-cart-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    if (cartCount) {
        cartCount.textContent = count;
    }


    if (cartTotal) {

        cartTotal.textContent =
            `₹${total.toLocaleString("en-IN")}`;

    }

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(productId, change) {

    const item = cart.find(
        product => product.id === productId
    );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }


    saveCart();

    updateCart();

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(productId) {

    cart = cart.filter(
        product => product.id !== productId
    );


    saveCart();

    updateCart();

}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    const cartPanel =
        document.getElementById("cartPanel");

    if (cartPanel) {
        cartPanel.classList.add("active");
    }

}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    const cartPanel =
        document.getElementById("cartPanel");

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty.");

        return;
    }


    showToast(
        "Checkout feature will be connected to the backend."
    );

}


// ===============================
// ACCOUNT MODAL
// ===============================

function openAccount() {

    const accountModal =
        document.getElementById("accountModal");

    if (accountModal) {
        accountModal.classList.add("active");
    }

}


function closeAccount() {

    const accountModal =
        document.getElementById("accountModal");

    if (accountModal) {
        accountModal.classList.remove("active");
    }

}


// ===============================
// ORDERS MODAL
// ===============================

function openOrders() {

    const ordersModal =
        document.getElementById("ordersModal");

    if (ordersModal) {
        ordersModal.classList.add("active");
    }

}


function closeOrders() {

    const ordersModal =
        document.getElementById("ordersModal");

    if (ordersModal) {
        ordersModal.classList.remove("active");
    }

}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ===============================
// PAGE INITIALIZATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    displayProducts(products);

    updateCart();


    // Search

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }


    // Category buttons

    document.querySelectorAll(
        ".category-btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;

                filterCategory(category);

            }
        );

    });

});
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
                            
