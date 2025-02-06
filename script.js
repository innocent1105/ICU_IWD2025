"use strict"; // Enables strict mode to catch common JavaScript errors and enforce safer coding practices.

// Immediately Invoked Function Expression (IIFE) to prevent global variable pollution and execute the script immediately.
(function () {
    // Ensures this script runs only in a browser environment where 'window' and 'document' exist.
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        
        // Waits until the entire HTML document is loaded before executing the script.
        document.addEventListener("DOMContentLoaded", function () {
            
            var slideIndex = 0; // Stores the index of the current slide
            showSlides(); // Calls the function to start the image slider

            function showSlides() {
                var slides = document.getElementsByClassName("slide"); // Gets all elements with class 'slide'
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none"; // Hides all slides initially
                }
                slideIndex++; // Increments the slide index
                if (slideIndex > slides.length) {
                    slideIndex = 1; // Resets index if it exceeds the number of slides
                }
                slides[slideIndex - 1].style.display = "block"; // Displays the current slide
                window.setTimeout(showSlides, 3000); // Changes slide every 3 seconds
            }

            var form = document.getElementById("contactForm"); // Gets the form element by ID
            if (form) {
                form.addEventListener("submit", function (event) {
                    event.preventDefault(); // Prevents the default form submission behavior

                    var name = document.getElementById("name").value; // Gets the value of the name input field
                    var email = document.getElementById("email").value; // Gets the value of the email input field
                    var message = document.getElementById("message").value; // Gets the value of the message input field

                    if (name === "" || email === "" || message === "") {
                        alert("Please fill in all fields."); // Alerts the user if any field is empty
                    } else {
                        alert("Form submitted successfully!"); // Alerts the user if the form is valid
                    }
                });
            }

            // Smooth scrolling effect for navigation links
            var navLinks = document.querySelectorAll("nav ul li a"); // Selects all navigation links
            navLinks.forEach(function(link) {
                link.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevents default anchor link behavior
                    var targetId = this.getAttribute("href").substring(1); // Extracts the target section ID
                    var targetSection = document.getElementById(targetId); // Gets the target section element
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 50, // Scrolls smoothly to the target section
                            behavior: "smooth"
                        });
                    }
                });
            });

            // Dark mode toggle functionality
            var darkModeToggle = document.createElement("button"); // Creates a button element
            darkModeToggle.innerText = "Toggle Dark Mode"; // Sets the button text
            darkModeToggle.style.position = "fixed"; // Positions the button on the screen
            darkModeToggle.style.top = "10px";
            darkModeToggle.style.right = "10px";
            darkModeToggle.style.padding = "10px";
            darkModeToggle.style.background = "#333";
            darkModeToggle.style.color = "#fff";
            darkModeToggle.style.border = "none";
            darkModeToggle.style.cursor = "pointer";
            document.body.appendChild(darkModeToggle); // Adds the button to the page

            darkModeToggle.addEventListener("click", function () {
                document.body.classList.toggle("dark-mode"); // Toggles the 'dark-mode' class on the body
            });
        });
    }
})();