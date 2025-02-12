"use strict";

(function () {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", function () {

            let home = document.getElementById("home");
            let a_home = document.getElementById("a-home");
            let about = document.getElementById("about");
            let a_about = document.getElementById("a_about");
            let services = document.getElementById("services");
            let a_services = document.getElementById("a_services");
            let contact = document.getElementById("contact");
            let a_contact = document.getElementById("a_contact");

            let previousTab = "";
            let activeTab = "home";

            function remove_active(){
                a_about.style.color = "aliceblue";
                a_home.style.color = "aliceblue";
                a_services.style.color = "aliceblue";
                a_contact.style.color = "aliceblue";
            }

            function active_tab(tab){
                remove_active();
                switch (tab) {
                    case "home":
                        a_home.style.color = "#5980ff";
                        console.log("home")
                        break;
                    case "about":
                        a_about.style.color = "#5980ff";
                        break;
                    case "service":
                        a_services.style.color = "#5980ff";
                        break;
                    case "contact":
                        a_contact.style.color = "#5980ff";
                        break;
                }
            }


            home.addEventListener("click", ()=>{
                active_tab("home");
            })

            about.addEventListener("click", ()=>{
                active_tab("about");
                console.log("about")
            })

            services.addEventListener("click", ()=>{
                active_tab("service");
                console.log("services")
            })

            contact.addEventListener("click", ()=>{
                active_tab("contact");
                console.log("contact");
            })






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
