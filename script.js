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
                slides[slideIndex].style.display = "flex";
            }

            function startSlideShow() {
                slideInterval = setInterval(showSlides, 3000);
            }

            function changeSlide(step) {
                clearInterval(slideInterval);
            
                slides[slideIndex].classList.remove("active");
                slides[slideIndex].style.transform = `translateX(${step > 0 ? '-100%' : '100%'})`; // Slide out
                
                slideIndex = (slideIndex + step + slides.length) % slides.length;
            
                slides[slideIndex].classList.add("active");
                slides[slideIndex].style.transform = "translateX(0)"; // Slide in
            
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
