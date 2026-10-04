/* =====================================================
            MOVING RED LINE
===================================================== */

const navigation =
    document.getElementById("mainNavigation");


const navigationItems =
    navigation.querySelectorAll(".menu-item");


/* Create moving line */

const movingLine =
    document.createElement("span");

movingLine.classList.add("moving-red-line");


navigation.appendChild(movingLine);


/* Add CSS for moving line */

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


/* Move line when mouse enters menu */

navigationItems.forEach(function (item) {

    item.addEventListener("mouseenter", function () {

        /* Don't show line on mobile */

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


/* Hide line when mouse leaves navigation */

navigation.addEventListener("mouseleave", function () {

    if (window.innerWidth <= 950) {
        return;
    }


    movingLine.style.width = "0";

});



// =====================================================
//              HERO IMAGE SLIDER
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove("active", "previous");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        const previousSlide = currentSlide;

        if (slides[previousSlide]) {
            slides[previousSlide].classList.add("previous");
        }

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() {

        let next = currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);
    }

    function startSlider() {

        slideInterval = setInterval(function () {
            nextSlide();
        }, 4000);

    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {

            showSlide(index);

            clearInterval(slideInterval);
            startSlider();

        });

    });

    startSlider();

});

