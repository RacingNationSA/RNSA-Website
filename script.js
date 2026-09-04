const SUPABASE_URL = "https://rbabiowcirxgwxuhughx.supabase.co";

const SUPABASE_KEY = "sb_publishable_2xLI0qxaaVze-w4raM3-Pw_JH9hMlUD";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// ==========================================
// RNSA - RACING NATION SOUTH AFRICA
// Website JavaScript
// ==========================================


// ---------- NEXT EVENT COUNTDOWN ----------

// We don't have the real RNSA event date yet.
// This is a temporary date that we will replace
// once RNSA gives us the next event details.

const eventDate = new Date("November 14, 2026 19:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = eventDate - now;


    // If the event has already started
    if (difference <= 0) {

        document.getElementById("countdown").innerHTML =
            "EVENT DAY";

        return;
    }


    // Calculate time remaining

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display countdown

    const countdown = document.getElementById("countdown");


    if (countdown) {

        countdown.innerHTML = `
            <div class="countdown-box">
                <strong>${days}</strong>
                <span>DAYS</span>
            </div>

            <div class="countdown-box">
                <strong>${hours}</strong>
                <span>HOURS</span>
            </div>

            <div class="countdown-box">
                <strong>${minutes}</strong>
                <span>MINUTES</span>
            </div>

            <div class="countdown-box">
                <strong>${seconds}</strong>
                <span>SECONDS</span>
            </div>
        `;
    }
}


// Update immediately
updateCountdown();


// Update every second
setInterval(updateCountdown, 1000);
// ---------- MOBILE MENU ----------

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});
// ==========================================
// RNSA MERCH ORDER
// ==========================================

function orderProduct(product, price) {

    const phoneNumber = "27000000000";

    const message =
        `Hi RNSA! 👋%0A%0A` +
        `I'd like to order RNSA merchandise.%0A%0A` +
        `Product: ${product}%0A` +
        `Price: ${price}%0A%0A` +
        `Please send me the available sizes, ` +
        `colours and payment information.`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(
        whatsappURL,
        "_blank"
    );

}
// ==========================================
// RNSA SHOPPING CART
// ==========================================

let cart = [];


// ADD PRODUCT TO CART

function addToCart(productName, price) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    // Take customer to cart
    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// UPDATE CART

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Calculate quantity

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // Calculate price

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "R" + totalPrice.toLocaleString();


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    YOUR CART IS EMPTY
                </h3>

                <p>
                    Add some official RNSA merchandise
                    to your cart.
                </p>

                <a
                    href="#merch"
                    class="btn primary"
                >
                    VIEW MERCH
                </a>

            </div>

        `;

        return;

    }


    // Display products

    cartItems.innerHTML = cart.map(
        (item, index) => `

        <div class="cart-item">

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    R${item.price.toLocaleString()}
                    each
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>


            <strong class="cart-item-total">

                R${(
                    item.price *
                    item.quantity
                ).toLocaleString()}

            </strong>


            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                REMOVE
            </button>

        </div>

    `).join("");

}


// CHANGE QUANTITY

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// REMOVE PRODUCT

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// START WITH EMPTY CART

updateCart();
// RNSA SUPABASE TEST

async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .limit(1);

    if (error) {
        console.error("RNSA Supabase error:", error);
    } else {
        console.log("RNSA Supabase connected successfully!");
    }
}

testSupabaseConnection();
// ==========================================
// RNSA DEVELOPER LOGIN
// ==========================================

const developerLoginButton =
    document.getElementById("developer-login-button");

const developerLogin =
    document.getElementById("developer-login");

const closeDeveloperLogin =
    document.getElementById("close-developer-login");


if (developerLoginButton && developerLogin) {
    developerLoginButton.addEventListener("click", () => {
        developerLogin.style.setProperty("display", "flex", "important");
    });
}


if (closeDeveloperLogin && developerLogin) {

    closeDeveloperLogin.addEventListener("click", () => {

        developerLogin.style.display = "none";

    });

}
// ==========================================
// RNSA DEVELOPER LOGOUT
// ==========================================
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        const dashboard = document.getElementById("developer-dashboard");
        const login = document.getElementById("developer-login");

        if (dashboard) {
            dashboard.style.display = "none";
        }

        if (login) {
            login.style.display = "flex";
        }
    });
}
// ==========================================
// RNSA ADD PRODUCT FORM
// ==========================================
const addProductButton = document.getElementById("add-product-button");
const addProductForm = document.getElementById("add-product-form");
const cancelProductButton = document.getElementById("cancel-product-button");

if (addProductButton && addProductForm) {
    addProductButton.addEventListener("click", () => {
        addProductForm.style.display = "block";
        addProductButton.style.display = "none";
    });
}

if (cancelProductButton && addProductForm) {
    cancelProductButton.addEventListener("click", () => {
        addProductForm.style.display = "none";

        if (addProductButton) {
            addProductButton.style.display = "inline-block";
        }
    });
}
// ==========================================
// SAVE PRODUCT TO SUPABASE
// ==========================================

const saveProductButton = document.getElementById("save-product-button");

if (saveProductButton) {

    saveProductButton.addEventListener("click", async function () {

        const name = document.getElementById("product-name").value.trim();
        const description = document.getElementById("product-description").value.trim();
        const price = document.getElementById("product-price").value;
        const imageUrl = document.getElementById("product-image-url").value.trim();
        const message = document.getElementById("product-form-message");

        if (!name || !price) {
            message.textContent = "Please enter a product name and price.";
            return;
        }

        message.textContent = "Saving product...";

        const { error } = await supabaseClient
            .from("products")
            .insert({
                name: name,
                description: description,
                price: Number(price),
                image_url: imageUrl || null
            });

        if (error) {
            console.error("Product save error:", error);
            message.textContent = "Could not save product.";
            return;
        }

        message.textContent = "Product saved successfully!";

        document.getElementById("product-name").value = "";
        document.getElementById("product-description").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-image-url").value = "";

    });

}
// ==========================================
// SHOW DEVELOPER DASHBOARD AFTER LOGIN
// ==========================================
// ==========================================
// SHOW DEVELOPER DASHBOARD AFTER LOGIN
// ==========================================

const rnsaRole = localStorage.getItem("rnsa_role");

if (rnsaRole === "developer") {
    const dashboard = document.getElementById("developer-dashboard");

    if (dashboard) {
        dashboard.style.display = "block";
    }
}
