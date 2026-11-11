document.addEventListener("DOMContentLoaded", function () {

    console.log("Nrithya Collections website loaded.");

});


/* Explore button */

const exploreButton =
    document.querySelector(".explore-button");

if (exploreButton) {

    exploreButton.addEventListener("click", function (event) {

        event.preventDefault();

        const costumeSection =
            document.getElementById("costumes");

        if (costumeSection) {

            costumeSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* Scroll animation */

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
