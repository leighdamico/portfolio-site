// Define variables //

const gameboard = document.querySelectorAll(".mole-img");
const worm = document.querySelector(".worm-box");
const wormScreen = document.querySelector(".worm-meter");
const gameboardScreen = document.querySelector(".gameboard-screen");
const winScreen = document.querySelector(".win-screen");
let moles = [];
let score = 0;


// Define intervals

const minInterval = 2000;  
const maxInterval = 20000; 
const hungryInterval = 2000; 
const sadInterval = 750;  
const leavingInterval = 500;  
const fedInterval = 750;  

// Define next events

function nextEventforHungry(){
    return Date.now() + hungryInterval;
} 
function nextEventforSad(){
    return Date.now() + sadInterval;
}
function nextEventforLeaving(){
    return Date.now() + leavingInterval;
}
function nextEventforFed (){
    return Date.now() + fedInterval;
}
function nextEventforGone(){
    return Date.now() + (minInterval + Math.floor(Math.random()*(maxInterval-minInterval)))
}

// A mole object for each hole on the gameboard

for (i=0; i<gameboard.length; i++){
    moles[i] = {
        status: "gone",
        king: false,
        next: nextEventforGone(),
        fed: false
    }
}

// Event listeners to check for fed moles

for (i=0; i<gameboard.length; i++){
    gameboard[i].setAttribute("id", i);
    gameboard[i].addEventListener("click", feedMole);
}

function feedMole(evt){
    if (evt.path[0].src.includes("hungry")){
        moles[evt.target.id].fed = true;
        if(evt.path[0].src.includes("king")){
            score +=2;
        }
        else{
            score += 1;
        }
    }
}

// Change screen displays

winScreen.style.display = "none"; 

function showWin(){
    if(score >= 10){
        // wormScreen.style.display = "none";
        gameboardScreen.style.display = "none";
        // newGameScreen.style.display = "block";
        winScreen.style.display = "block";
    }
}

// Advance the frame

function nextFrame(){
    showWin();
    for (i=0; i<moles.length; i++){
        if (Date.now()>moles[i].next){
            switch(moles[i].status){
                case "hungry":
                if(moles[i].fed){
                    moles[i].fed = false;
                    moles[i].status = "fed";
                    moles[i].next = nextEventforFed();
                    worm.style.width = `${score*10}%`;
                    if(moles[i].king){
                        gameboard[i].src = "./img/king-mole-fed.png";
                        gameboard[i].alt = "Fed king mole image";
                    }
                    else{
                        gameboard[i].src = "./img/mole-fed.png";
                        gameboard[i].alt = "Fed mole image";
                        }
                    }
                    else{
                        moles[i].status = "sad";
                        moles[i].next = nextEventforSad();
                        if(moles[i].king){
                            gameboard[i].src = "./img/king-mole-sad.png";
                            gameboard[i].alt = "Sad king mole image";
                        }
                        else{
                            gameboard[i].src = "./img/mole-sad.png";
                            gameboard[i].alt = "Sad mole image";
                        }
                    }
                break;
                case "fed":
                case "sad":
                moles[i].status = "leaving";
                moles[i].next = nextEventforLeaving();
                if(moles[i].king){
                    gameboard[i].src = "./img/king-mole-leaving.png";
                    gameboard[i].alt = "Leaving king mole image";
                }
                else{
                    gameboard[i].src = "./img/mole-leaving.png";
                    gameboard[i].alt = "Leaving mole image";
                }
                break;
                case "leaving":
                moles[i].status = "gone";
                moles[i].next = nextEventforGone();
                moles[i].king = Math.random()>0.9;
                gameboard[i].src = "";
                gameboard[i].alt = "";
                break;
                case "gone":
                moles[i].status = "hungry";
                moles[i].next = nextEventforHungry();
                if(moles[i].king){
                    gameboard[i].src = "./img/king-mole-hungry.png";
                    gameboard[i].alt = "Hungry king mole image";
                }
                else{
                    gameboard[i].src = "./img/mole-hungry.png";
                        gameboard[i].alt = "Hungry mole image";
                    }
                    break;
                }
            }
        }
    requestAnimationFrame(nextFrame);
}

requestAnimationFrame(nextFrame);
