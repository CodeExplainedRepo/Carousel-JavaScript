/* SELECT ELEMENTS */
// CAROUSEL
const carousel = document.querySelector(".carousel");
// NAVIGATION
const nav = document.querySelector(".nav");
// BUTTONS
const nextButton = document.querySelector(".right-btn");
const prevBtn = document.querySelector(".left-btn");

/* SELECT THE SLIDES ( Carousel Child elements) */
const slides = Array.from(carousel.children);

/* SELECT THE SLIDES ( Carousel Child elements) */
const dots = Array.from(nav.children);

/* GET THE WIDTH OF THE SLIDE */
const slideWidth = slides[0].getBoundingClientRect().width;

/* POSITION THE SLIDES HORIZONTALY */
function positionSlides(slides){
    for(let i = 0; i < slides.length; i++){
        slides[i].style.left = slideWidth * i + "px";
    }
}
positionSlides(slides);

/* ON RIGHT BUTTON CLICK WE MOVE(TRANSLATE) THE CAROUSEL TO THE LEFT */
nextButton.addEventListener("click", e => {
    const currentSlide = carousel.querySelector(".active");

    const nextSlide = currentSlide.nextElementSibling;

    hideBtn(nextSlide, slides);

    moveToSlide(carousel, currentSlide, nextSlide);

    moveToDot(nextSlide, slides);
});

/* ON LEFT BUTTON CLICK WE MOVE(TRANSLATE) THE CAROUSEL TO THE RIGHT */
prevBtn.addEventListener("click", e => {
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;

    hideBtn(previousSlide, slides);

    moveToSlide(carousel, currentSlide, previousSlide);

    moveToDot(previousSlide, slides);
});

/*  MOVE to DOT */
function moveToDot(slide, slides){
    let slideIndex = findIndex(slide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}

/* MOVE TO SLIDE */
function moveToSlide(carousel, currentSlide, toSlide){
    const position = toSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, toSlide);
}

/* HIDE THE LEFT/RIGHT BTN WHEN THERE IS NO PREV/NEXT SLIDE */
function hideBtn(slide, slides){
    if(slide === slides[slides.length-1]){
        nextButton.classList.add("hide");
        prevBtn.classList.remove("hide");
    }else if(slide === slides[0]){
        prevBtn.classList.add("hide");
        nextButton.classList.remove("hide");
    }else{
        nextButton.classList.remove("hide");
        prevBtn.classList.remove("hide");
    }
}

/* WHEN WE CLICK ON A DOT FROM THE NAV, WE MOVE TO THE RIGHT SLIDE */
nav.addEventListener("click", function(e){
    const currentSlide = carousel.querySelector(".active");
    const currentDot = nav.querySelector(".active");

    // if the user didn't click a button, then exit the function
    if(e.target.tagName !== "BUTTON") return;

    const targetDot = e.target;

    let targetDotIndex = findIndex(targetDot, dots);

    const targetSlide = slides[targetDotIndex];

    toggleActive(currentDot, targetDot);

    moveToSlide(carousel, currentSlide, targetSlide);
    hideBtn(targetSlide, slides);
});

function toggleActive(from, to){
    from.classList.remove("active");
    to.classList.add("active");
}

function findIndex(item, items){
    for(let i = 0; i < dots.length; i++){
        if(item === items[i]){
            return i;
        }
    }
}