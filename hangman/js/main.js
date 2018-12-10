/* Work to do:
1.  Font size and style on messaging.
2.  Looking good on different screen sizes.  Make gifs more responsive.
Needs to look better on larger screens.
*/


/* Definitions */
var g = document.getElementById("gallows");
var ctx = g.getContext("2d");
var letters;
var n;
var word;
var response;

var wordlist = ["banana", "monkey", "homework", "school", "puppies", "vacation", "sisters", "purple", "monster", "boardgame", "bubblegum", "coffee", "goggles", "rainbow", "butterfly", "machine", "mirror", "carpet", "beautiful", "hilarious", "watermelon", "candle", "pillow", "jumping", "exercise", "mountain", "valley", "river", "dictionary", "playground", "waterpark", "popsicle", "biscuit", "dishwashwer", "popcorn", "pudding", "cookies", "dessert", "tortilla", "driveway", "caravan", "sunscreen", "riverboat", "computer", "elephant", "kangaroo", "alligator", "giraffe", "cheetah", "uniform", "sweatshirt", "bicycle", "electricity", "adventure", "roadtrip", "pitstop", "gasoline", "pretzels", "potato", "cucumber", "mango", "honeybee", "castle", "demolish", "construction", "bulldozer", "airplane", "limosine", "destination", "island", "ocean", "celebration", "holiday", "experience", "piano", "clarinet", "trombone", "symphony", "library", "dentist", "appointment", "candy", "broccoli", "spaghetti", "hamburger", "milkshake", "fountain", "oatmeal", "forever", "excited", "ridiculous", "thrilled", "buttercup", "fluffy", "exhausted", "bunkbed", "mattress", "toothpaste", "shampoo", "grandmother"
];

var bodyParts = [drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, drawLeftLeg, drawRightEye, drawLeftEye, drawNose, drawMouth];

/* Initial Setup */
function drawGallows(){
  if(ctx){  /**Check for browser support **/
    ctx.beginPath();
    ctx.moveTo(25, 270);
    ctx.lineTo(125, 270);
    ctx.moveTo(50, 270);
    ctx.lineTo(50, 25);
    ctx.lineTo(125,25);
    ctx.lineTo(125,50);
    ctx.moveTo(50,50);
    ctx.lineTo(75,25);
    ctx.stroke();
  }
else{
  g.innerHTML = "Update your browser to see Hangman!";
  }
}

function drawWord(){
  word = wordlist[Math.floor(Math.random()*wordlist.length)];
  letters = word.split("");
  for(var i=0; i<letters.length; i++){
    var ltr = document.createElement("li");
    var classAtt = document.createAttribute("class"); //Create a "class" attribute
    ltr.setAttribute("class", "hidden");
    var idAtt = document.createAttribute("id");
    ltr.setAttribute("id", "letter" + i);
    document.getElementById("h").appendChild(ltr);
  }
}

function clearGifs(){
  for (var i=0; i<document.getElementById("gifs").childElementCount; i++){
    document.getElementById("catgif"+i).setAttribute("class","noshow");
  }
}

function setUpGame(){
  ctx.clearRect(0,0,200, 300); /* clear gallows */
  document.getElementById("h").innerHTML = ""; /* clear current word */
  document.getElementById("m").innerHTML = ""; /* clear missed letters */
  document.getElementById("results").innerHTML = ""; /* clear response */
  document.getElementById("guessedWord").value = ""; /* clear guessed word */
  document.getElementById("j").focus(); /*place cursor in guess a letter input */
  n = 0;
  clearGifs();
  drawGallows();
  drawWord();
}

function matchSearch(){
 /* Set initial conditions */
  var j = document.getElementById("j").value.toLowerCase();
  response = 1;

 /* Validate entry length */
  if(j.length>1){
    response = 0;
  }

 /* Check to see if the letter has already been guessed */
 var m = document.getElementById("m");
 for(var i=0; i<m.childNodes.length; i++){
   if(j == m.childNodes[i].innerHTML){
     response = 2;
  }
 }

 /* Check each value in letters array for a match with guessed letter */
  for(var i=0; i<letters.length; i++){
    if(j === letters[i]){
      var k = document.getElementById("letter"+i);
      k.innerHTML = j;
      k.setAttribute("class","show");
      response = 4;
    }
  }

  /* Check to see if all letters have been guessed. */
  var r = 0;
  for(var i=0; i<letters.length; i++){
    if(document.getElementById("letter"+i).getAttribute("class")==="show"){
      r += 1;
    }
    else {
      break;
    }
  }
    if(r==letters.length){
      response = 5;
    }


  /*Respond to results of match search */
  if (response == 1){
    bodyParts[n]();
    n = n+1;
    if (n == bodyParts.length){
      response = 3;
      document.getElementById("results").innerHTML = "The word was " + word + ".";
    }
    var miss = document.createElement("li"); /* Add missed letter to the list */
    miss.innerHTML = j;
    document.getElementById("m").appendChild(miss);
  }
  /*document.getElementById("results").innerHTML = response;*/
  clearGifs();
  document.getElementById("catgif"+response).setAttribute("class","show");
  document.getElementById("j").value = "";

}
/* end matchSearch function */


function guessWord(){
  var guessedWord = document.getElementById("guessedWord").value.toLowerCase();
  var guessedLetters = guessedWord.split("");

  if(guessedLetters.length !== letters.length){
    response = 1;
  }
  else{
    for (var i=0; i<letters.length; i++){
      if(letters[i] !== guessedLetters[i]){
        response = 1;
        break;
      }
      else{
        response = 5;
        for(var i=0; i<letters.length; i++){
            var k = document.getElementById("letter"+i);
            k.innerHTML = letters[i];
            k.setAttribute("class","show");
          }
        }
      }
    }
    document.getElementById("guessedWord").value = "";
    clearGifs();
    document.getElementById("catgif"+response).setAttribute("class","show");
  }

/* end guessWord function */

/* let Enter key be the same as clicking on button */
function inputLetterKeyUp(e) {
    if (e.key === 'Enter') {
      matchSearch();
    }
}

function inputWordKeyUp(e) {
    if (e.key === 'Enter') {
      guessWord();
    }
}
/* end Enter key functions */


/* Body Drawing Functions */

function drawHead(){
  ctx.beginPath();
  ctx.arc(125,75,25,0,(Math.PI/180)*360);
  ctx.stroke();
}

function drawBody(){
  ctx.beginPath();
  ctx.moveTo(125,100);
  ctx.lineTo(125,175);
  ctx.stroke();
}

function drawRightArm(){
  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.lineTo(165,100);
  ctx.stroke();
}

function drawLeftArm(){
  ctx.beginPath();
  ctx.moveTo(125,125);
  ctx.lineTo(85,100);
  ctx.stroke();
}

function drawRightLeg(){
  ctx.beginPath();
  ctx.moveTo(125,175);
  ctx.lineTo(160,225);
  ctx.stroke();
}

function drawLeftLeg(){
  ctx.beginPath();
  ctx.moveTo(125,175);
  ctx.lineTo(95,225);
  ctx.stroke();
}

function drawRightEye(){
  ctx.beginPath();
  ctx.moveTo(130,65);
  ctx.lineTo(135,70);
  ctx.stroke();
  ctx.moveTo(135,65);
  ctx.lineTo(130,70);
  ctx.stroke();
}

function drawLeftEye(){
  ctx.beginPath();
  ctx.moveTo(115,70);
  ctx.lineTo(120,65);
  ctx.stroke();
  ctx.moveTo(120,70);
  ctx.lineTo(115,65);
  ctx.stroke();
}

function drawNose(){
  ctx.beginPath();
  ctx.arc(125,80,2,0,(Math.PI/180)*360);
  ctx.fill();
}

function drawMouth(){
  ctx.beginPath();
  ctx.moveTo(115, 90);
  ctx.lineTo(135,90);
  ctx.stroke();
}
