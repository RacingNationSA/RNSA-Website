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
