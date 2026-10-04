/* =====================================================
            MOVING RED LINE
===================================================== */

const navigation = document.getElementById("mainNavigation");

if (navigation) {

    const navigationItems =
        navigation.querySelectorAll(".menu-item");


    /* Create moving line */

    const movingLine =
        document.createElement("span");

    movingLine.classList.add("moving-red-line");

    navigation.appendChild(movingLine);


    /* Style moving line */

    movingLine.style.position = "absolute";
    movingLine.style.top = "0";
    movingLine.style.left = "0";
    movingLine.style.height = "3px";
    movingLine.style.width = "0";
    movingLine.style.background = "#e52f4d";
    movingLine.style.pointerEvents = "none";
    movingLine.style.zIndex = "20";

    movingLine.style.transition =
        "left 0.30s ease, width 0.30s ease";


    /* Move line on desktop */

    navigationItems.forEach(function (item) {

        item.addEventListener("mouseenter", function () {

            if (window.innerWidth <= 950) {
                return;
            }

            const itemRect =
                item.getBoundingClientRect();

            const navigationRect =
                navigation.getBoundingClientRect();

            const leftPosition =
                itemRect.left - navigationRect.left;

            movingLine.style.left =
                leftPosition + "px";

            movingLine.style.width =
                itemRect.width + "px";

        });

    });


    /* Hide line */

    navigation.addEventListener("mouseleave", function () {

        if (window.innerWidth <= 950) {
            return;
        }

        movingLine.style.width = "0";

    });

}


/* =====================================================
                MOBILE MENU
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mainNavigation =
        document.getElementById("mainNavigation");


    if (mobileMenuBtn && mainNavigation) {

        mobileMenuBtn.addEventListener("click", function () {

            mainNavigation.classList.toggle("show");


            /* Change hamburger icon */

            const icon =
                mobileMenuBtn.querySelector("i");

            if (mainNavigation.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =================================================
                    MOBILE DROPDOWN
    ================================================= */

    const dropdownButtons =
        document.querySelectorAll(
            ".menu-dropdown > .dropdown-btn"
        );


    dropdownButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            /* Only mobile */

            if (window.innerWidth <= 950) {

                event.preventDefault();


                const parent =
                    button.parentElement;


                /* Close other dropdowns */

                document
                    .querySelectorAll(".menu-dropdown.open")
                    .forEach(function (dropdown) {

                        if (dropdown !== parent) {
                            dropdown.classList.remove("open");
                        }

                    });


                /* Open / close current */

                parent.classList.toggle("open");

            }

        });

    });


    /* =================================================
                    HERO IMAGE SLIDER
    ================================================= */

    const slides =
        document.querySelectorAll(".hero-slide");

    const dots =
        document.querySelectorAll(".hero-dot");


    if (slides.length > 0) {

        let currentSlide = 0;

        let slideInterval;


        /* Show slide */

        function showSlide(index) {

            slides.forEach(function (slide) {

                slide.classList.remove(
                    "active",
                    "previous"
                );

            });


            dots.forEach(function (dot) {

                dot.classList.remove("active");

            });


            const previousSlide =
                currentSlide;


            if (slides[previousSlide]) {

                slides[previousSlide]
                    .classList.add("previous");

            }


            currentSlide = index;


            slides[currentSlide]
                .classList.add("active");


            if (dots[currentSlide]) {

                dots[currentSlide]
                    .classList.add("active");

            }

        }


        /* Next slide */

        function nextSlide() {

            let next =
                currentSlide + 1;


            if (next >= slides.length) {

                next = 0;

            }


            showSlide(next);

        }


        /* Start slider */

        function startSlider() {

            slideInterval =
                setInterval(function () {

                    nextSlide();

                }, 4000);

        }


        /* Dot click */

        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                showSlide(index);


                clearInterval(slideInterval);

                startSlider();

            });

        });


        /* Start automatic slider */

        startSlider();

    }

});