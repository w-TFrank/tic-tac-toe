function playRound(e, currentPlayer) {
    e.target.value = currentPlayer;

    const xSymbol = document.createElement("div");
    const oSymbol = document.createElement("div");
    xSymbol.className = "x-square";
    oSymbol.className = "o-square";
    xSymbol.textContent = "X";
    oSymbol.textContent = "O";

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

//makes sure that the tile values aren't null (blank) and that they're equal (3 X's or O's)
function areEqual() {
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] === null || arguments[i] !== arguments[i - 1]) {
            return false;
        }
    }
    return true;
}

function GameController() {
    const square = document.getElementsByClassName("square");
    let currentPlayer = "p1";

    function play(e) {
        if (e.target.value === null) {
            playRound(e, currentPlayer);

            if (checkForWin(square)) {
                console.log("winner");
                stopPlay();
            };
            currentPlayer = (currentPlayer === "p1") ? "p2" : "p1";
        }
    }

    function stopPlay() {
        for (let i = 0; i < square.length; i++) {
            square[i].value = null;
            square[i].removeEventListener("click", play);
        }
    }

    for (let i = 0; i < square.length; i++) {
        square[i].value = null;
        square[i].addEventListener("click", play);
    }
}

GameController();