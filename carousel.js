// SELECT CAROUSEL
const carousel = document.querySelector(".carousel");

// SELECT NEXT BUTTON
const nextButton = document.querySelector(".right-btn");

// SELECT LEFT BUTTON
const previousButton = document.querySelector(".left-btn");

// SELECT THE NAV
const nav = document.querySelector(".nav");

// SELECT ALL THE DOTS
const dots = [...nav.children];

// SELECT ALL THE SLIDES INSIDE THE CAROUSEL
const slides = [...carousel.children];

// CALCULATE THE SLIDE WIDTH
let slideWidth = slides[0].getBoundingClientRect().width;

// POSITION THE SLIDES HORIZONTALY
function positionSlides(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + "px";
    }
}

positionSlides(slides);

// ON RIGHT BUTTON CLICK, WE MOVE(TranslateX) THE CAROUSEL TO THE LEFT
nextButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
});

// ON LEFT BUTTON CLICK, WE MOVE(TranslateX) THE CAROUSEL TO THE RIGHT
previousButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;
    
    moveToSlide(carousel, currentSlide, previousSlide);
    hideButton(previousSlide, slides);
    moveToDot(previousSlide, slides, nav, dots);
});

// ON DOT CLICK
nav.addEventListener("click", function(e){

    // if we didn't click on a dot, we exit
    if(e.target === nav) return;

    // SELECT THE CLICKED DOT
    const targetDot = e.target;

    // SELECT THE CURRENT DOT
    const currentDot = nav.querySelector(".active");

    // SELECT THE CURRENT SLIDE
    const currentSlide = carousel.querySelector(".active");

    // find the index of the dot, so we can target the right slide
    let targetDotIndex = findIndex(targetDot, dots);
    
    // SELECT THE TARGET SLIDE
    const targetSlide = slides[targetDotIndex];

    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides);
})

// MOVE TO DOT
function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}
// MOVE TO SLIDE
function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide);
}

// Toggle ACTIVE CLASS
function toggleActive(current, target){
    current.classList.remove("active");
    target.classList.add("active");
}

// HIDE BUTTON
function hideButton(targetSlide, slides){
    // If the target slide is the first slide the previous button must be hidden
    // and the next button must be shown
    if(targetSlide === slides[0]){
        previousButton.classList.add("hide");
        nextButton.classList.remove("hide");
    }else if(targetSlide === slides[slides.length - 1]){
        // If the target slide is the last slide the next button must be hidden
        // and the previous button must be shown
        nextButton.classList.add("hide");
        previousButton.classList.remove("hide");
    }else{
        // if none of the above is true, we show both the next and prevoius button
        previousButton.classList.remove("hide");
        nextButton.classList.remove("hide");
    }
}

// FIND THE INDEX OF AN ITEM, INSIDE AN ARRAY OF ITEMS
function findIndex(item, items){
    for(let index = 0; index < items.length; index++){
        if(item === items[index]){
            return index;
        }
    }
}

