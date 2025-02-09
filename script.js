"use strict"; // Enables strict mode to catch common JavaScript errors and enforce safer coding practices.

// Immediately Invoked Function Expression (IIFE) to prevent global variable pollution and execute the script immediately.
// (function () {
//     // Ensures this script runs only in a browser environment where 'window' and 'document' exist.
//     if (typeof window !== "undefined" && typeof document !== "undefined") {
        
//         // Waits until the entire HTML document is loaded before executing the script.
//         document.addEventListener("DOMContentLoaded", function () {
            
//             var slideIndex = 0; // Stores the index of the current slide
//             showSlides(); // Calls the function to start the image slider

//             function showSlides() {
//                 var slides = document.getElementsByClassName("slide"); // Gets all elements with class 'slide'
//                 for (var i = 0; i < slides.length; i++) {
//                     slides[i].style.display = "none"; // Hides all slides initially
//                 }
//                 slideIndex++; // Increments the slide index
//                 if (slideIndex > slides.length) {
//                     slideIndex = 1; // Resets index if it exceeds the number of slides
//                 }
//                 slides[slideIndex - 1].style.display = "block"; // Displays the current slide
//                 window.setTimeout(showSlides, 3000); // Changes slide every 3 seconds
//             }

//             var form = document.getElementById("contactForm"); // Gets the form element by ID
//             if (form) {
//                 form.addEventListener("submit", function (event) {
//                     event.preventDefault(); // Prevents the default form submission behavior

//                     var name = document.getElementById("name").value; // Gets the value of the name input field
//                     var email = document.getElementById("email").value; // Gets the value of the email input field
//                     var message = document.getElementById("message").value; // Gets the value of the message input field

//                     if (name === "" || email === "" || message === "") {
//                         alert("Please fill in all fields."); // Alerts the user if any field is empty
//                     } else {
//                         alert("Form submitted successfully!"); // Alerts the user if the form is valid
//                     }
//                 });
//             }

//             // Smooth scrolling effect for navigation links
//             var navLinks = document.querySelectorAll("nav ul li a"); // Selects all navigation links
//             navLinks.forEach(function(link) {
//                 link.addEventListener("click", function(event) {
//                     event.preventDefault(); // Prevents default anchor link behavior
//                     var targetId = this.getAttribute("href").substring(1); // Extracts the target section ID
//                     var targetSection = document.getElementById(targetId); // Gets the target section element
//                     if (targetSection) {
//                         window.scrollTo({
//                             top: targetSection.offsetTop - 50, // Scrolls smoothly to the target section
//                             behavior: "smooth"
//                         });
//                     }
//                 });
//             });

//             // Dark mode toggle functionality
//             var darkModeToggle = document.createElement("button"); // Creates a button element
//             darkModeToggle.innerText = "Toggle Dark Mode"; // Sets the button text
//             darkModeToggle.style.position = "fixed"; // Positions the button on the screen
//             darkModeToggle.style.top = "10px";
//             darkModeToggle.style.right = "10px";
//             darkModeToggle.style.padding = "10px";
//             darkModeToggle.style.background = "#333";
//             darkModeToggle.style.color = "#fff";
//             darkModeToggle.style.border = "none";
//             darkModeToggle.style.cursor = "pointer";
//             document.body.appendChild(darkModeToggle); // Adds the button to the page

//             darkModeToggle.addEventListener("click", function () {
//                 document.body.classList.toggle("dark-mode"); // Toggles the 'dark-mode' class on the body
//             });
//         });
//     }
// })();




let file_preview = document.getElementById("file-preview");
let textContent = ""; 
let extractedText = ""; 
let fileLoaded = false;

// Function to handle PDF file input
document.getElementById("pdfInput").addEventListener("change", function(event) {
    try{
    const file = event.target.files[0];
    file_preview.classList.remove("hidden");
        if (file) {
            document.getElementById("fileName").textContent = file.name.substring(0, 50);
            
            const reader = new FileReader();
            reader.onload = function() {
                const typedArray = new Uint8Array(reader.result);
                pdfjsLib.getDocument(typedArray).promise.then(pdf => {
                    textContent = "";
                    const pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
                    
                    return Promise.all(
                        pages.map(num => pdf.getPage(num).then(page => 
                            page.getTextContent().then(text => 
                                textContent += text.items.map(s => s.str).join(" ") + "\n\n"
                            )
                        ))
                    ).then(() => {
                        extractedText = textContent; 
                        console.log(extractedText);
                    });
                });
            };
            reader.readAsArrayBuffer(file); // Read file
        }
    }catch(fileError){
        console.log(fileError);
    }
});






const sendMessageButton = document.querySelector('.send-message');
const aiSendIcon = document.querySelector('.ai-btn');
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.querySelector('.messages');

sendMessageButton.addEventListener('click', () => {
    const user = chatInput.value;
    let userMessage = "";
    if (user.trim() === '') return; 

    if(fileLoaded){
        userMessage = "from the text in the pdf : " + extractedText + user;
        console.log(userMessage);
        fileLoaded = false;
    }else{
        userMessage = user;
    }
    // Loading effect
    aiSendIcon.classList.add('animate-spin', 'transition-all');


    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message', 'flex', 'items-end','justify-end','items-start', 'gap-2');
    userMessageDiv.innerHTML = `
    <div class="message user-message flex items-end justify-end gap-2">
        <div class="message-content cursor-default bg-gray-800 text-sm rounded-xl p-2 px-3">
            ${userMessage}
        </div>
    </div>
    `;
    messagesContainer.appendChild(userMessageDiv);
    chatInput.value = '';
    file_preview.classList.add('hidden');

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    let question = userMessage;
    console.log(question)

    let result;
  

    async function chat(question) {
        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDsoOEqTTpgfP2HwwmD5RCqhWzXxCOi5Ps",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] }),
                }
            );
    
            const result = await response.json();
            console.log(result);
    
            // // Ensure response has valid candidates
            // if (!result.candidates || result.candidates.length === 0) {
            //     throw new Error("No AI response found.");
            // } 

            let ai_response = result.candidates[0].content.parts[0].text;
    
            // AI message
            const aiMessage = document.createElement("div");
            aiMessage.classList.add("message", "ai-message", "flex", "items-start", "gap-2");
            aiMessage.innerHTML = `
                <div class="message ai-message flex items-start gap-2">
                    <div class="message-content bg-gray-900 text-sm text-gray-300 w-10/12 cursor-pointer hover:bg-gray-800 active:scale-95 transition-all rounded-lg p-2">
                        ${ai_response}
                    </div>
                </div>
            `;
    
            messagesContainer.appendChild(aiMessage);
    
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            aiSendIcon.classList.remove("animate-spin", "transition-all");
        } catch (error) {
            console.error("Error in chat function:", error.message);
        }
    }
    
    chat(userMessage);
    

});

























