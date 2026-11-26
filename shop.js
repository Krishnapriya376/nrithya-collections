/* =====================================================
   NRITHYA COLLECTIONS - SHOP JAVASCRIPT
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
            "Traditional accessories arranged as a Kathakali performance set.",

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

let cart = JSON.parse(
    localStorage.getItem("nrithyaCart")
) || [];


/* ================= DOM ELEMENTS ================= */

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

const cartDrawer =
    document.getElementById("cartDrawer");

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


let selectedCategory = "all";


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        noProducts.style.display = "block";

        return;
    }

    noProducts.style.display = "none";


    productList.forEach(function (product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        const badge = product.badge
            ? `
                <div class="product-badge">
                    ${product.badge}
                </div>
              `
            : "";


        card.innerHTML = `

            ${badge}

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='logo.png';">

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

    const names = {

        costumes: "Costumes",

        jewellery: "Jewellery",

        ghungroo: "Ghungroo",

        accessories: "Accessories"

    };

    return names[category] || category;

}


/* ================= FILTER PRODUCTS ================= */

function filterProducts() {

    const searchText =
        searchInput.value
        .trim()
        .toLowerCase();


    let filteredProducts =
        products.filter(function (product) {

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText) ||

                product.description
                    .toLowerCase()
                    .includes(searchText) ||

                product.category
                    .toLowerCase()
                    .includes(searchText);


            return matchesCategory &&
                   matchesSearch;

        });


    displayProducts(filteredProducts);

}


/* ================= CATEGORY BUTTONS ================= */

categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            categoryButtons.forEach(
                function (item) {

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


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            filterProducts();

        }

    }
);


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(function (item) {

            return item.id === productId;

        });


    if (existingItem) {

        existingItem.quantity++;

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

    let totalQuantity = 0;

    let totalPrice = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    displayCartItems();

}


/* ================= DISPLAY CART ================= */

function displayCartItems() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function (item) {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.src='logo.png';">

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p class="cart-item-price">

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


        cartItems.appendChild(cartItem);

    });

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(function (product) {

            return product.id === productId;

        });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function (product) {

                return product.id !== productId;

            });

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function (item) {

            return item.id !== productId;

        });


    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

cartButton.addEventListener(
    "click",
    function () {

        cartDrawer.classList.add("open");

        cartOverlay.classList.add("show");

    }
);


/* ================= CLOSE CART ================= */

function closeCartDrawer() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("show");

}


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


/* ================= ACCOUNT ================= */

accountButton.addEventListener(
    "click",
    function () {

        accountModal.classList.add("show");

    }
);


/* ================= CLOSE MODALS ================= */

document
    .querySelectorAll(".modal-close")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    this.dataset.close;

                document
                    .getElementById(modalId)
                    .classList.remove("show");

            }
        );

    });


/* ================= LOGIN / REGISTER ================= */

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const accountLogin =
    document.getElementById("accountLogin");

const accountRegister =
    document.getElementById("accountRegister");


showRegister.addEventListener(
    "click",
    function () {

        accountLogin.classList.add("hidden");

        accountRegister.classList.remove("hidden");

    }
);


showLogin.addEventListener(
    "click",
    function () {

        accountRegister.classList.add("hidden");

        accountLogin.classList.remove("hidden");

    }
);


/* ================= REGISTER ================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function (event) {

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


            accountRegister.classList.add(
                "hidden"
            );

            accountLogin.classList.remove(
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
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value;


            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "nrithyaUser"
                    )
                );


            if (
                savedUser &&
                savedUser.email === email
            ) {

                showToast(
                    "Welcome back, " +
                    savedUser.name + "!"
                );

            } else {

                showToast(
                    "Demo sign in successful."
                );

            }


            accountModal.classList.remove(
                "show"
            );

        }
    );


/* ================= ORDERS ================= */

ordersButton.addEventListener(
    "click",
    function () {

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

        ordersList.innerHTML = `

            <div class="empty-orders">

                <div class="empty-icon">
                    📦
                </div>

                <h3>No orders yet</h3>

                <p>
                    Your placed orders will appear here.
                </p>

            </div>

        `;

        return;
    }


    ordersList.innerHTML = "";


    orders.forEach(function (order) {

        const orderCard =
            document.createElement("div");

        orderCard.className = "order-card";


        orderCard.innerHTML = `

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
                Total: ₹${order.total.toLocaleString("en-IN")}
            </p>

            <p>
                Status: Order Placed
            </p>

        `;


        ordersList.appendChild(orderCard);

    });

}


/* ================= CHECKOUT ================= */

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;
        }


        const total =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        item.price *
                        item.quantity;

                },
                0
            );


        const itemCount =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        item.quantity;

                },
                0
            );


        const orders =
            JSON.parse(
                localStorage.getItem(
                    "nrithyaOrders"
                )
            ) || [];


        const newOrder = {

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

        };


        orders.push(newOrder);


        localStorage.setItem(
            "nrithyaOrders",
            JSON.stringify(orders)
        );


        cart = [];


        saveCart();

        updateCart();

        closeCartDrawer();


        showToast(
            "Demo order placed successfully."
        );

    }
);


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* ================= INITIAL LOAD ================= */

displayProducts(products);

updateCart();              
                            
