function playRound(e, player) {
    console.log(e.target.value);
    e.target.value = "yes";
}

function GameController() {
    const square = document.getElementsByClassName("square");

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    let currentPlayer = playerOneName;

    for (let i = 0; i < square.length; i++) {
        square[i].value = "";
        square[i].addEventListener("click", (e) => {
            if (e.target.value === "") {
                playRound(e, currentPlayer);
                console.log(currentPlayer);
                currentPlayer = (currentPlayer === "Player One") ? "Player Two" : "Player One";
            }
        })
    }
}

GameController();