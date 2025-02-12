"use strict";

(function () {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", function () {
            var slideIndex = 0;
            var slideInterval;
            var slides = document.getElementsByClassName("slide");

            function showSlides() {
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex = (slideIndex + 1) % slides.length;

                slides[slideIndex].classList.add("hidden");

                slides[slideIndex].style.display = "flex";
                slides[slideIndex].classList.add("visible");
            }

            function startSlideShow() {
                slideInterval = setInterval(showSlides, 3000);
            }

            function changeSlide(step) {
                clearInterval(slideInterval); 
            
                slideIndex = (slideIndex + step + slides.length) % slides.length; 
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
            
                // active slide
                slides[slideIndex].style.display = "flex";
                startSlideShow();
            }
            showSlides();
            startSlideShow();
            


            var nextButton = document.getElementById("nextSlide");
            var prevButton = document.getElementById("prevSlide");
            
            if (nextButton) {
                nextButton.addEventListener("click", function () {
                    changeSlide(1);
                    console.log("next")
                });
            }
            
            if (prevButton) {
                prevButton.addEventListener("click", function () {
                    console.log("prev")
                    changeSlide(-1);
                });
            }
        });
    }
})();
