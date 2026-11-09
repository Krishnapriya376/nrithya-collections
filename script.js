```javascript
/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", function () {

    mainNav.classList.toggle("active");

    if (mainNav.classList.contains("active")) {
        menuButton.innerHTML = "✕";
        menuButton.setAttribute("aria-label", "Close Menu");
    } else {
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open Menu");
    }

});


/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll("#mainNav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mainNav.classList.remove("active");

        menuButton.innerHTML = "☰";

        menuButton.setAttribute("aria-label", "Open Menu");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll("#mainNav a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* ================= BUTTON CLICK EFFECT ================= */

const buttons = document.querySelectorAll(".button");

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.style.transform = "scale(0.97)";

        setTimeout(function () {

            button.style.transform = "";

        }, 150);

    });

});
```
