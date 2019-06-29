var wordBank = ["mercury", "venus", "earth", "mars", "jupiter", "saturn",
    "uranus", "neptune", "pluto", "sun", "moon", "eclipse", "luna", "galaxy",
    "meteor", "satellite", "cosmos", "rover", "spaceship", "comets", "asteroid",
    "core", "crust", "mantle", "wormhole", "atmosphere", "universe", "rocketship", "planet"];

const maxTries = 8;

var guessedletters = [];
var currentWord;
var guessingWord = [];
var remainingGuesses;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log("Reseting Game");
    console.log(currentWord);


    guessedletters = [];
    guessingWord = [];

    for (var i = 0; i < currentWord.length; i++) {
        console.log(currentWord.length);
        guessingWord.push("_");
    }
    updateDisplay();
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText =" ";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").append(guessingWord[i]);
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedletters;
    if (remainingGuesses <= 0) {
        alert("Game Over");
        alert("Press Any Key To Try Again");
        hasFinished = true;
    }
};


document.onkeyup = function (event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key);
        }
    };


    function makeGuess(letter) {
        if (remainingGuesses > 0) {
            if (!gameStarted) {
                gameStarted = true;
            }
            if (guessedletters.indexOf(letter) === -1) {
                guessedletters.push(letter);
                evaluateGuess(letter);
            }
        }

        updateDisplay();
        checkWin();
    };

   

    function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                positions.push(i);
            }
        }
        
        if (positions.length <= 0) {
            remainingGuesses--;
        } else {
            
            for (var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };

    function checkWin() {
        if (guessingWord.indexOf("_") === -1) {
            alert("You Win");
            alert("Press Any Key To Try Again");
            wins++;
            hasFinished = true;
        }
    };
}


resetGame();
updateDisplay();