document.addEventListener("DOMContentLoaded", init);

// this function prepares the page for user interaction
function init() {
    //create vars and add controls to the page
    const controls = document.querySelector(".controls");
    const back_btn = document.createElement("a");
    const next_btn = document.createElement("a");
    const autoplay_btn = document.createElement("a");
    const frame = document.querySelector(".frame");
    const slides = frame.querySelectorAll("img");

    const caption = document.querySelector(".caption");

    // set the caption to the first image alt text
    caption.textContent = slides[0].alt;

    // set up controls id and text content
    back_btn.classList.add("back-btn");
    back_btn.setAttribute("href", "");
    back_btn.textContent = "Back";
    next_btn.classList.add("next-btn");
    next_btn.setAttribute("href", "");
    next_btn.textContent = "Next";
    autoplay_btn.classList.add("autoplay-btn");
    autoplay_btn.setAttribute("href", "");
    autoplay_btn.textContent = "Autoplay";

    // add controls to the page
    controls.appendChild(back_btn);
    controls.appendChild(next_btn);
    controls.appendChild(autoplay_btn);

    // with JS active, hide all images and set the first slide as current
    slides.forEach((slide, index) => {
        slide.classList.add("hide");
        if (index === 0) {
            slide.classList.add("current");
        }
    });

    // now, show the first slide
    slides[0].classList.remove("hide");

    // Initialize variables for autoplay
    let autoplayInterval;
    let autoplayDelay = 2000; // 2 seconds
    let isAutoplaying = false;

    // Function to start autoplay
    function startAutoplay() {
        isAutoplaying = true;
        autoplay_btn.textContent = "Stop";

        autoplayInterval = setInterval(() => {
            changeSlide({ target: next_btn }, false);
            }, autoplayDelay);
    }

    // Function to stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
        isAutoplaying = false;
        autoplay_btn.textContent = "Autoplay";
    }

    // Add event listener for autoplay button
    autoplay_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (autoplay_btn.textContent === "Autoplay") {
            startAutoplay();
        } else {
            stopAutoplay();
        }
    });

    // Add event listeners for controls
    back_btn.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlide(e);
        stopAutoplay();
    });

    next_btn.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlide(e);
        stopAutoplay();
    });

    function changeSlide(e, isManual = false) {
        //shortcut variables
        const frame = document.querySelector(".frame");
        const slides = frame.querySelectorAll("img");
        let showing = document.querySelector(".current");
        let nextUp = "";
    
        // check which control was clicked and set nextUp appropriately
        if (e.target.className == "next-btn") {
            nextUp = showing.nextElementSibling;
        }
    
        if (e.target.className == "back-btn") {
            nextUp = showing.previousElementSibling;
        }
    
        // deactivate current image
        showing.classList.toggle("hide");
        showing.classList.toggle("current");
    
        //make sure next image is there
        if (!nextUp) {
            nextUp = (e.target.className === "next-btn") ? slides[0] : slides[slides.length - 1];
        }
    
        //make sure nexUp is an image tag and NOT the figcaption
        if (nextUp.nodeName !== "IMG") {
        nextUp = slides[0];
        }
    
        // activate next image
        nextUp.classList.remove("hide");
        nextUp.classList.add("current");
    
        // Update the figcaption text
        caption.textContent = nextUp.alt;
    
        // Stop autoplay if manual action is detected
        if (isManual && isAutoplaying) {
            stopAutoplay();
            autoplay_btn.textContent = "Autoplay"; // Reset autoplay button
        }
    }
}



// remaining steps:

//BONUS:
// 1. Add at least two more figure tags in the html with several images each.
// 2. add a set of controls to switch the visibility of different albums.
// 3. always show the first image in an album when swapping albums.
// 4. make sure the captions continue to show the right text for each image. DONE?
