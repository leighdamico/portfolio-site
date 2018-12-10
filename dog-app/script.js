// Define variables

    const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById("breeds");
    const picture = document.getElementById("picture");
    const emoji = document.getElementById("loading");
    const caption = document.getElementById("caption");
    let currentBreed = "";


// Populate the select options with the list of breeds
    async function init(){
        const result = await fetch(BREEDS_URL);
        const resultJson = await result.json();
        const breeds = Object.keys(resultJson.message);  //Pull just the keys off the message and put them into an array
        
        for(i=0; i<breeds.length; i++){
            const item = document.createElement("option");
            item.innerHTML = breeds[i];
            breedList.appendChild(item);
        }

        getRandomPicture();
    }


// Set Event Listeners
    breedList.addEventListener('change',function()
    {
            currentBreed = breedList.value;
            console.log(currentBreed);
            if (currentBreed === "Please Choose a Breed"){
                getRandomPicture();
            } else {
                getPicture();
            }

    });

    picture.addEventListener("load", function(){
        emoji.classList.add("hidden");
        picture.classList.remove("hidden");
    })

// Toggle picture visibility

    function pictureToEmoji(){
        picture.classList.add("hidden");
        emoji.classList.remove("hidden");
        emoji.classList.add("spin");
    }

// Get random picture

    async function getRandomPicture(){
        pictureToEmoji();
        const result = await fetch(`https://dog.ceo/api/breeds/image/random` );
        const resultJson = await result.json();
        const imageSrc = resultJson.message;
        picture.src = imageSrc;
        picture.alt = `Dog picture`;
        caption.innerHTML = `Select a dog breed from the navigation bar above to see a picture of your favorite kind of dog.<br>Here's one of ours!`;
    }

// Get picture for the breed selected
    
    async function getPicture(){
        caption.innerHTML = " ";
        pictureToEmoji();
        const result = await fetch(`https://dog.ceo/api/breed/${currentBreed}/images/random` );
        const resultJson = await result.json();
        const imageSrc = resultJson.message;
        picture.src = imageSrc;
        picture.alt = `${currentBreed} image`;
}


init();

