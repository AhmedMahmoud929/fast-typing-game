// call elements
let upComing = document.querySelector(".container #left .upComing");
let timeLeft = document.querySelector("#right #timeLeft");
let lvlBtn = document.getElementById("lvlBtn");
let inp = document.getElementById("inp");
let startBtn = document.getElementById("startBtn");
let scoreNum = document.getElementById("scoreNum");
let startPage = document.querySelector("#left .pop");
let lvlsTitle = document.querySelector("#right .levels .title");
let lvls = document.querySelector("#right .levels .lvls");
let rndWord = document.querySelector("#left .word");
let gameOver = document.querySelector("#left .gameOver");
let winerPage = document.querySelector("#left .winer");
let loseSfx = new Audio('./lose2.wav');
let winSfx = new Audio('./win.wav');
let rightWordSfx = new Audio('./right.wav');
let easyBtn = document.getElementById("easy");
let normalBtn = document.getElementById("normal");
let hardBtn = document.getElementById("hard");
let co = 0;


// aray of words
let words = ['world', 'html', 'juice', 'funny', 'leetcode', 'hello', 'football', 'barcelona', 'javascript', 'ball', 'tv', 'games', 'mobile', 'basket', 'hole', 'moon', 'coding', 'screen', 'sun', 'cola', 'waves', 'codeforcec', 'skate', 'css', 'movies', 'egypt', 'icpc', 'programming', 'ice', 'cube']




// show&hide levels
let counter = 1;
lvlsTitle.onclick = function() {
    if (counter == 0) {
        lvlBtn.style.transform = "rotate(0deg)";
        lvls.style.opacity = "1";
        lvls.style.pointerEvents = "auto";
        counter++;
    } else if (counter == 1) {
        lvlBtn.style.transform = "rotate(90deg)";
        lvls.style.opacity = "0";
        lvls.style.pointerEvents = "none";
        counter--;
    }

}





// setting levels 
const levels = {
    "easy": 6,
    "normal": 4,
    "hard": 2
}

let defaultLevelName = "normal";
let defaultLevelSeconds = levels[defaultLevelName];
timeLeft.innerHTML = defaultLevelSeconds;



// change levels

easyBtn.onclick = function() {

}



// change levels background
if (defaultLevelName == 'easy') {
    document.getElementById("easy").classList.add("active");
    document.getElementById("normal").classList.remove("active");
    document.getElementById("hard").classList.remove("active");
} else if (defaultLevelName == 'normal') {
    document.getElementById("easy").classList.remove("active");
    document.getElementById("normal").classList.add("active");
    document.getElementById("hard").classList.remove("active");
} else if (defaultLevelName == 'hard') {
    document.getElementById("easy").classList.remove("active");
    document.getElementById("normal").classList.remove("active");
    document.getElementById("hard").classList.add("active");
}




// desable paste event

inp.onpaste = function() {
    return false;
}




// start btn
startBtn.onclick = function() {
    // hide start page
    startPage.style.opacity = '0';
    startPage.style.pointerEvents = 'none';
    inp.focus();
    // generate the word
    genWord();
}


// The most important function [game function] 
function genWord() {
    // get random word
    let randomWord = words[Math.floor(Math.random() * words.length)];
    rndWord.innerHTML = randomWord;
    // get index of word
    let indexWord = words.indexOf(randomWord);
    // remove word from array  => array.splice(index , deleteCount)
    words.splice(indexWord, 1);
    // fill upComing word
    upComing.innerHTML = '';
    for (let i = 0; i < words.length; i++) {
        upComing.innerHTML += `
            <div>${words[i]}</div>
        
            `
    }
    // call leftTime function
    leftTime()
}




function leftTime() {
    let start = setInterval(function() {
        // dicreese the timer
        // condiction : when win stop decreesing after zero
        if (co == 2) {
            clearInterval(start);
        } else {

            timeLeft.innerHTML--;
        }



        if (timeLeft.innerHTML == 0) {
            // stop timer at zero
            clearInterval(start);
            // compare words
            if (rndWord.innerHTML.toLowerCase() == inp.value) {
                // increese score
                scoreNum.innerHTML++;
                // check winner 
                if (scoreNum.innerHTML == '30') {
                    // stop timer
                    co++;
                    // play the winner audio
                    winSfx.play();
                    //empty word
                    rndWord = '';
                    // show winer page
                    winerPage.style.opacity = "1";
                    winerPage.style.pointerEvents = "auto";

                }

                // play right audio
                rightWordSfx.play();
                // generate new word
                genWord();
                // empty the input
                inp.value = '';
                // return timer
                // condiction : when win dont return timer
                if (co == 1) {
                    timeLeft.innerHTML = 0;
                    co++;
                } else { timeLeft.innerHTML = defaultLevelSeconds; }


            } else {
                gameOver.style.opacity = '1';
                loseSfx.play();
            }
        }
    }, 1000)
}