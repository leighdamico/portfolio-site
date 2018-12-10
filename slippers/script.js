// Set event listeners
document.getElementById("color-change").addEventListener("click",changeColor);
//add event listener for end touch

function changeColor(){
  if (document.body.classList.contains("bright")){
    document.body.classList.remove("bright");
    document.getElementById("color-change").innerText="Bright Colors";
    cubeReset();
  }
  else{
    document.body.classList.add("bright");
    document.getElementById("color-change").innerText="Light Colors";
    cubeReset();
  }
}

function cubeChange(){
  let i = mySwiper.activeIndex;
  mySwiper.slides[i].style.backgroundColor = getComputedStyle(document.body).getPropertyValue("--cube"); 
}

function cubeReset(){
  let i = mySwiper.activeIndex;
  mySwiper.slides[i].style.backgroundColor = getComputedStyle(document.body).getPropertyValue("--background");
}

// Create swiper
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    effect: 'cube',

    cubeEffect: {
      shadow: false,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

});


// Change background color as cube rotates

mySwiper.on('slideChangeTransitionStart', cubeChange);

mySwiper.on('slideChangeTransitionEnd', cubeReset);

