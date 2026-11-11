/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Nrithya Collections Home page loaded.");

});


/* ================= NAVIGATION LINKS ================= */

const navLinks =
    document.querySelectorAll(".nav-container a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


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

                    observer.unobserve(entry.target);

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
