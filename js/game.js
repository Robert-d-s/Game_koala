// Create global variables
let lives = 3;
let points;
let gameDuration;
// let timeoutid = 0;
const gsound = document.querySelector("#gsound");
const bsound = document.querySelector("#bsound");
const winsound = document.querySelector("#winsound");
const lose1sound = document.querySelector("#lose1sound");
const lose2sound = document.querySelector("#lose2sound");
const bgsound = document.querySelector("#bgsound");


// When the window has loaded the page, the eventlistener 
// "load" is triggered and calls the function "start"
window.addEventListener("load", start);

function start() {
    // Sets the initial values and calls the showTitle()
    console.log('start');
    lives = 3;
    points = 0;
    gameDuration = 61;
    document.querySelector("#current_score").textContent = points;
    // document.querySelector("#current_lives").textContent = lives;

    winsound.pause();
    winsound.curentTime = 0;
    lose1sound.pause();
    lose1sound.curentTime = 0;
    lose2sound.pause();
    lose2sound.curentTime = 0;

    showTitle();
}

function showTitle() {
    console.log('showTitle');
    // Show title screen
    hideAllScreens();
    document.querySelector("#title_screen").classList.remove("hidden");
    // TODO Stop music
    // TODO Sound control button
    // TODO Play sound
    // --> user clicks start button
    document.querySelector("#title_playgame").addEventListener("click", startGame);
    // --> user clicks instrunctions button
    document.querySelector("#title_instructions").addEventListener("click", showInstructions);
}

function showInstructions() {
    console.log('showInstructions');
    // Show instruction screen
    hideAllScreens();
    document.querySelector("#instructions_screen").classList.remove("hidden");
    // Show start button
    // Show title button
    // Play sound
    // --> user clicks start button
    document.querySelector("#instr_playgame").addEventListener("click", startGame);
    // --> user clicks title button
    document.querySelector("#instr_title").addEventListener("click", showTitle);
}


function startGame() {
    console.log(`startGame`);
    // Show game screen / UPDATE to more generic method
    // document.querySelector("#title_screen").classList.add("hidden");
    hideAllScreens();
    lives = 3;
    points= 0;

    bgsound.play();

    // good elements starts falling
    // Here are three elements
    document.querySelector("#leaf_container").classList.add("falling1", "pos1");
    document.querySelector("#branch_container").classList.add("falling3", "pos7");
    document.querySelector("#dirt_container").classList.add("falling3", "pos3");

    // bad elements starts falling
    document.querySelector("#plate_container").classList.add("falling2", "pos4");
    document.querySelector("#sandwich_container").classList.add("falling1", "pos4");
    // --> lives
    document.querySelector("#lives_sprite").classList.add("lives_3");
    //timer 
    document.querySelector("#timer_sprite").classList.add("shrink");
    document.querySelector("#timer_sprite").addEventListener("animationend", gameOver);

    // start timer
    showTimer();

    // --> User clicks apple
    document.querySelector("#leaf_container").addEventListener("click", appleHit);
    document.querySelector("#branch_container").addEventListener("click", appleHit);
    document.querySelector("#dirt_container").addEventListener("click", appleHit);
    // --> Apple completes iteration
    document.querySelector("#leaf_container").addEventListener("animationiteration", sqeezeApple);
    document.querySelector("#branch_container").addEventListener("animationiteration", sqeezeApple);
    document.querySelector("#dirt_container").addEventListener("animationiteration", sqeezeApple);

    // --> User clicks tablet
    document.querySelector("#plate_container").addEventListener("click", tabletHit);
    document.querySelector("#sandwich_container").addEventListener("click", tabletHit);
    // --> Tablet completes iteration
    document.querySelector("#plate_container").addEventListener("animationiteration", sqeezeTablet);
    document.querySelector("#sandwich_container").addEventListener("animationiteration", sqeezeTablet);
}

function appleHit() {
    console.log(`appleHit`);
    // "this" holds the element that triggered the eventListener 
    console.log(this);
    // stop falling
    this.classList.add("stop");
    
    //play sound
    gsound.currentTime= 0;
    gsound.play();



    // rotate apple
    this.firstElementChild.classList.add("rotate");
    // 1 point
    points = points + 1;
    console.log(`Points: ${points}`);
    document.querySelector("#current_score").textContent = points;
    if (points > 24 ) {
        gameOver();
    }
    // if (points > 20) {
    //     if (points % 5 === 0) {
    //         document.querySelector("#wauw").classList.remove("hidden");
    //     } else {
    //         document.querySelector("#wauw").classList.add("hidden");
    //     }
    // }
    // --> restarts apple when rotation completes 
    this.firstElementChild.addEventListener("animationend", restartApple);
    // if (points >=3 ) {
    //     gameover();
    // }
}

function sqeezeApple() {
    console.log(`sqeezeApple`);
    // "this" holds the element that triggered the eventListener 
    console.log(this);
    // removes all classes from the container
    this.classList.value = "";
    // removes all classes from the sprite
    this.firstElementChild.classList.value = "";
    // removes the animationend eventlistener from the sprite
    this.firstElementChild.removeEventListener("animationend", restartApple);
    // jumps a javascript frame 
    this.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling1", "pos" + randomPosition);
}
function restartApple() {
    console.log(`restartApple`);
    // "this" holds the element that triggered the eventListener 
    console.log(this);
    // removes all classes from the container
    this.parentElement.classList.value = "";
    // removes all classes from the sprite
    this.classList.value = "";
    // removes the animationend eventlistener from the sprite
    this.removeEventListener("animationend", restartApple);
    // jumps a javascript frame 
    this.parentElement.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling1", "pos" + randomPosition);
}

function tabletHit() {
    console.log(`tabletHit`);
    // stop falling
    // this.classList.add("stop");

    //play sound
    bsound.currentTime= 0;
    bsound.play();

    // rotate tablet
    this.firstElementChild.classList.add("rotate");

    //lives
    // lives = lives - 1;
    // console.log(`Lives: ${lives}`);
    // document.querySelector("#current_lives").textContent = lives;
    // if (lives < 1) {
    //     gameOver();
    // }
    lives = lives - 1;
    console.log(`Lives: ${lives}`);
    this.firstElementChild.addEventListener("animationend", restartTablet);

    document.querySelector("#lives_sprite").classList.value = "";
    if (lives === 3){
        document.querySelector("#lives_sprite").classList.add("lives_3");
    } else {
        if (lives === 2){
            document.querySelector("#lives_sprite").classList.add("lives_2");
    } else {
        if (lives === 1){
            document.querySelector("#lives_sprite").classList.add("lives_1");
    } else {
        gameOver();
    }}}

    // --> restarts tablet when rotation completes 
    // this.firstElementChild.addEventListener("animationend", restartTablet);
}

function sqeezeTablet() {
    console.log(`restartTablet`);
    console.log(this);
    this.classList.value = "";
    this.firstElementChild.classList.value = "";
    this.firstElementChild.removeEventListener("animationend", restartTablet)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling" + randomFalling, "pos" + randomPosition);
}
function restartTablet() {
    console.log(`restartTablet`);
    console.log(this);
    this.parentElement.classList.value = "";
    this.classList.value = "";
    this.removeEventListener("animationend", restartTablet)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function generateRandomNumber(num) {
    return Math.floor(Math.random() * num) + 1;
}

function showTimer() {
    console.log(`showTimer`);
    gameDuration = gameDuration - 1;
    // update the user interface
    document.querySelector("#time_left").textContent = gameDuration;
    // then call the countTime function
    countTime();
}

let timeoutid = 0;

function countTime() {
    console.log(`countTime`);
    if (gameDuration > 0) {
        // if there is still time left, wait a second and call the shorTimer function again
        timeoutid = setTimeout(showTimer, 1000);
    } else {
        gameOver();
    }
}

function stoptimer(){
    clearTimeout(timeoutid);
}

function gameOver() {
    console.log('gameOver');

    bgsound.pause();
    bgsound.curentTime = 0;

    // remove all animations
    document.querySelector("#timer_sprite").classList.value = "";
    document.querySelector("#leaf_container").classList.value="";
    document.querySelector("#branch_container").classList.value="";
    document.querySelector("#dirt_container").classList.value="";
    document.querySelector("#plate_container").classList.value="";
    document.querySelector("#sandwich_container").classList.value="";

    document.querySelector("#leaf_container").removeEventListener("click", appleHit);
    document.querySelector("#branch_container").removeEventListener("click", appleHit);
    document.querySelector("#dirt_container").removeEventListener("click", appleHit);
    document.querySelector("#plate_container").removeEventListener("click", tabletHit);
    document.querySelector("#sandwich_container").removeEventListener("click", tabletHit);

    document.querySelector("#leaf_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#branch_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#dirt_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#plate_container").removeEventListener("animationiteration", sqeezeTablet);
    document.querySelector("#sandwich_container").removeEventListener("animationiteration", sqeezeTablet);


    // win or lose
    if(points >= 25 && lives > 0) {
        winning();
    }
    else if (gameDuration <= 0) {
        losing2();
    }
    else {
        losing();
    }
}

function winning() {
    console.log(`winning`);
    document.querySelector("#win_screen").classList.remove("hidden");
    document.querySelector("#win_playgame").addEventListener("click", restart);
    document.querySelector("#homebtn").addEventListener("click", showTitle);
    stoptimer();
    winsound.play();
}

function losing() {
    console.log(`losing`);
    document.querySelector("#lose_screen").classList.remove("hidden");
    document.querySelector("#lose_playgame").addEventListener("click", restart);
    document.querySelector("#homebtn1").addEventListener("click", showTitle);
    stoptimer();
    lose1sound.play();
}

function losing2() {
    console.log(`losing2`);
    document.querySelector("#lose_screen2").classList.remove("hidden");
    document.querySelector("#lose_playgame2").addEventListener("click", restart);
    document.querySelector("#homebtn2").addEventListener("click", showTitle);
    stoptimer();
    lose2sound.play();
}

function hideAllScreens() {
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.add("hidden");
    document.querySelector("#win_screen").classList.add("hidden");
    document.querySelector("#lose_screen").classList.add("hidden");
    document.querySelector("#lose_screen2").classList.add("hidden");
}

function restart() {
    console.log(`restart`)
    document.querySelector("#leaf_container").classList.value="";
    document.querySelector("#leaf_sprite").classList.value="";
    document.querySelector("#branch_container").classList.value="";
    document.querySelector("#branch_sprite").classList.value="";
    document.querySelector("#dirt_container").classList.value="";
    document.querySelector("#dirt_sprite").classList.value="";
    document.querySelector("#plate_container").classList.value="";
    document.querySelector("#plate_sprite").classList.value="";
    document.querySelector("#sandwich_container").classList.value="";
    document.querySelector("#sandwich_sprite").classList.value="";

    document.querySelector("#leaf_container").removeEventListener("click", appleHit);
    document.querySelector("#branch_container").removeEventListener("click", appleHit);
    document.querySelector("#dirt_container").removeEventListener("click", appleHit);
    document.querySelector("#plate_container").removeEventListener("click", tabletHit);
    document.querySelector("#sandwich_container").removeEventListener("click", tabletHit);

    document.querySelector("#leaf_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#branch_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#dirt_container").removeEventListener("animationiteration", sqeezeApple);
    document.querySelector("#plate_container").removeEventListener("animationiteration", sqeezeTablet);
    document.querySelector("#sandwich_container").removeEventListener("animationiteration", sqeezeTablet);

    document.querySelector("html").offsetHeight;
    start();
    startGame();

}