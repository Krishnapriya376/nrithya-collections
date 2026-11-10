```javascript
/* ================= PAGE LOADED ================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Nrithya Collections website loaded.");

});


/* ================= EXPLORE BUTTON ================= */

const exploreButton =
    document.querySelector(".explore-button");

if (exploreButton) {

    exploreButton.addEventListener("click", function () {

        const costumeSection =
            document.getElementById("costumes");

        if (costumeSection) {

            costumeSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* ================= SCROLL ANIMATION ================= */

const animatedElements =
    document.querySelectorAll(
        ".costume-card, .accessory-card, .service-card, .offer-items div"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(function (element) {

    observer.observe(element);

});


/* ================= FOOTER YEAR ================= */

const copyright =
    document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
        "© " + year +
        " Nrithya Collections. All Rights Reserved.";

}
```
