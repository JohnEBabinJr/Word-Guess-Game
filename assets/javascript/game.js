var wordBank = ["mercury", "venus", "earth", "mars", "jupiter", "saturn",
    "uranus", "neptune", "pluto", "sun", "moon", "eclipse", "luna", "galaxy",
    "meteor", "satellite", "cosmos", "rover", "spaceship", "comets", "asteroid",
    "core", "crust", "mantle", "wormhole", "atmosphere", "universe", "rocketship", "planet"];

const maxTries = 8;

var guessedletters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = wordbank[Math.floor(Math.random() * wordBank.length)];

    guessedletters = [];
    guessingWord = [];

    for (var i = 0; i < currentWordIndex.length; i++) {
        guessingWord.push("_ ");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = " ";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText = guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
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
            makeGuess(event.key.toLowerCase());
        }
    };


    function makeGuess(letter) {
        if (remainingGuesses > 0) {
            if (!gameStarted) {
                gameStarted = true;
            }
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        }

        updateDisplay();
        checkWin();
    };

   

    function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
            if (wordBank[currentWordIndex][i] === letter) {
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
            document.getElementById("youwin-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            wins++;
            hasFinished = true;
        }
    };
}
