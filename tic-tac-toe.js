function GameController() {
    //gets an array of squares for the game board
    const square = document.getElementsByClassName("square");
    //sets the starting player as player 1
    let currentPlayer = "p1";

    function play(e) {
        //checks to see if square already has value,
        //then checks for win then checks for tie,
        //if either are true then event listeners are turned off
        //if not then current player is switched and play continues 
        if (e.target.value === null) {
            playRound(e, currentPlayer);
            if (checkForWin(square)) {
                stopPlay();
            } else if (checkForTie(square)) {
                stopPlay();
            }
            currentPlayer = (currentPlayer === "p1") ? "p2" : "p1";
        }
    }

    function stopPlay() {
        //removes all the event listeners so squares can't continue to be clicked
        //after a win or tie has been reached
        for (let i = 0; i < square.length; i++) {
            square[i].value = null;
            square[i].removeEventListener("click", play);
        }
        playAgain();
    }

    function playAgain() {
        //makes the play again button become visible and adds a listener to the button
        const playAgain = document.getElementById("play-again");
        playAgain.style.display = "flex";
        playAgain.addEventListener("click", handler);

        function handler() {
            //if the button is clicked, the button is hidden again, the listener
            //is turned off, and the values of all the squares are reset so the game
            //can be played again. play restarts
            playAgain.style.display = "none";
            for (let i = 0; i < square.length; i++) {
                if (square[i].children[0]) {
                    square[i].removeChild(square[i].children[0]);
                }
            }
            playAgain.removeEventListener("click", handler);
            GameController();
        }
    }

    //adds event listeners to each of the squares
    for (let i = 0; i < square.length; i++) {
        square[i].value = null;
        square[i].addEventListener("click", play);
    }
}

function playRound(e, currentPlayer) {
    //sets the value of the selected square to whoever the current player is
    e.target.value = currentPlayer;

    //creates the symbols that'll be in the square
    const xSymbol = document.createElement("div");
    const oSymbol = document.createElement("div");
    xSymbol.className = "x-square";
    oSymbol.className = "o-square";
    xSymbol.textContent = "X";
    oSymbol.textContent = "O";

    //sets the correct symbol into the square
    let symbol = (currentPlayer === "p1") ? "X" : "O";
    if (symbol === "X") {
        e.target.appendChild(xSymbol);
    } else {
        e.target.appendChild(oSymbol);
    }
}

function checkForWin(square) {
    //all the win conditions
    if (areEqual(square[0].value, square[1].value, square[2].value) ||
        areEqual(square[3].value, square[4].value, square[5].value) ||
        areEqual(square[6].value, square[7].value, square[8].value) ||
        areEqual(square[0].value, square[3].value, square[6].value) ||
        areEqual(square[1].value, square[4].value, square[7].value) ||
        areEqual(square[2].value, square[5].value, square[8].value) ||
        areEqual(square[0].value, square[4].value, square[8].value) ||
        areEqual(square[2].value, square[4].value, square[6].value)) {
        return true;
    }
    return false;
}

function checkForTie(square) {
    //if all 9 squares !== null, and no win has been detected already, it must be a tie
    if (areFull(square[0].value, square[1].value, square[2].value,
        square[3].value, square[4].value, square[5].value,
        square[6].value, square[7].value, square[8].value)) {
        return true;
    }
    return false;
}

function areEqual() {
    //makes sure that the tile values aren't null (blank) and that they're equal (3 X's or O's)
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] === null || arguments[i] !== arguments[i - 1]) {
            return false;
        }
    }
    return true;
}

function areFull() {
    //checks if values are null

    //i think this could be gotten rid of and it could just be done in checkForTie if statement
    //but this works
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === null) {
            return false
        }
    }
    return true;
}

GameController();