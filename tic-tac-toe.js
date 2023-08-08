function getPlayers() {
    //adds event listeners to the x & o button so p1 can choose what they want
    //calls game controller with whichever symbol they choose
    const choose = document.getElementById("choose-symbols");
    const xButton = document.getElementById("x-button");
    const oButton = document.getElementById("o-button");
    //so the choice reappears after play again is hit
    choose.style.display = "block";
    xButton.addEventListener("click", handler);
    oButton.addEventListener("click", handler);
    function handler() {
        xButton.removeEventListener("click", handler);
        oButton.removeEventListener("click", handler);
        choose.style.display = "none";
        if (this.id === "x-button") {
            GameController("X");
        } else {
            GameController("O");
        }
    }
}
function GameController(symbolChoice) {
    //gets an array of squares for the game board
    const square = document.getElementsByClassName("square");

    //player 1 goes first
    let currentPlayer = "p1";

    function play(e) {
        //checks to see if square already has value,
        //then checks for win,
        //then checks for tie,
        //if either are true then event listeners are turned off
        //if not then current player  & symbol is switched and play continues
        if (e.target.value === null) {
            playRound(e, currentPlayer, symbolChoice);
            if (checkForWin(square)) {
                stopPlay(currentPlayer, "win");
            } else if (checkForTie(square)) {
                stopPlay(currentPlayer, "tie");
            }
            currentPlayer = (currentPlayer === "p1") ? "p2" : "p1";
            symbolChoice = (symbolChoice === "X") ? "O" : "X";
        }
    }
    function stopPlay(currentPlayer, winCondition) {
        //removes all the event listeners so squares can't continue to be clicked
        //after a win or tie has been reached.
        //also prints a win message for either player, or a tie message
        currentPlayer = (currentPlayer === "p1") ? "Player 1" : "Player 2";
        if (winCondition === "win") {
            const chooseSymbols = document.getElementById("win-con");
            const win = document.createElement("h3");
            win.style.display = "flex";
            win.id = "win";
            win.textContent = currentPlayer + " wins!";
            chooseSymbols.appendChild(win);
        } else {
            const chooseSymbols = document.getElementById("win-con");
            const win = document.createElement("h3");
            win.style.display = "flex";
            win.id = "win";
            win.textContent = "It's a tie!";
            chooseSymbols.appendChild(win);
        }
        for (let i = 0; i < square.length; i++) {
            square[i].value = null;
            square[i].removeEventListener("click", play);
        }
        playAgain();
    }
    function playAgain() {
        //makes the play again button become visible and adds a listener to the button
        //get the win element so it can be removed later
        const playAgain = document.getElementById("play-again");
        const win = document.getElementById("win");
        playAgain.style.display = "flex";
        playAgain.addEventListener("click", handler);

        function handler() {
            //if the button is clicked, the button is hidden again, the listener
            //is turned off, and the values of all the squares are reset so the game
            //can be played again. play restarts
            //removes the win message
            playAgain.style.display = "none";
            win.remove();
            for (let i = 0; i < square.length; i++) {
                if (square[i].children[0]) {
                    square[i].removeChild(square[i].children[0]);
                }
            }
            playAgain.removeEventListener("click", handler);
            getPlayers();
        }
    }
    //adds event listeners to each of the squares
    for (let i = 0; i < square.length; i++) {
        square[i].value = null;
        square[i].addEventListener("click", play);
    }
}
function playRound(e, currentPlayer, symbolChoice) {
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
    if (symbolChoice === "X") {
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
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === null) {
            return false
        }
    }
    return true;
}
getPlayers();