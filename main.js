//------------------------------------------------------------
// Player class
//------------------------------------------------------------
class Player {
    constructor(name, startingScore) {
        this.name = name;
        this.startingScore = startingScore;
        this.throws = [];
    }

    addThrow(score) {
        this.throws.push(score);
    }

    totalScored() {
        return this.throws.reduce((a, b) => a + b, 0);
    }

    remaining() {
        return this.startingScore - this.totalScored();
    }

    average() {
        if (this.throws.length === 0) return 0;
        return Math.round((this.totalScored() / this.throws.length) * 10) / 10;
    }

    reset(startingScore) {
        this.startingScore = startingScore;
        this.throws = [];
    }
}

//------------------------------------------------------------
// GAME STATE
//------------------------------------------------------------
let gameType = 301;  
let currentPlayer = 1;

let player1 = new Player("Player 1", gameType);
let player2 = new Player("Player 2", gameType);

//------------------------------------------------------------
// GAME MODE BUTTONS
//------------------------------------------------------------
document.getElementById("301").addEventListener("click", () => startGame(301));
document.getElementById("501").addEventListener("click", () => startGame(501));

function startGame(type) {
    gameType = type;

    player1.reset(gameType);
    player2.reset(gameType);

    currentPlayer = 1;
    updateUI();
}

//------------------------------------------------------------
// ADD SCORE
//------------------------------------------------------------
document.getElementById("add").addEventListener("click", () => {
    const scoreInput = document.getElementById("score");
    const score = parseInt(scoreInput.value);

    if (isNaN(score) || score < 0 || score > 180) {
        alert("Invalid score");
        return;
    }

    const p = currentPlayer === 1 ? player1 : player2;

    // prevent going below zero
    if (p.remaining() - score < 0) {
        alert("Bust! Cannot go below zero.");
        return;
    }

    p.addThrow(score);
    scoreInput.value = "";

    // check win
    if (p.remaining() === 0) {
        alert(`${p.name} wins the leg!`);
        player1.reset(gameType);
        player2.reset(gameType);
        currentPlayer = 1;
        updateUI();
        return;
    }

    // switch player
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    updateUI();
});

//------------------------------------------------------------
// UPDATE UI
//------------------------------------------------------------
function updateUI() {

    // Player 1 table update
    document.getElementById("player_1_score").innerText = player1.remaining();
    document.getElementById("player_1_scores").querySelector("tbody").innerHTML = `
        <tr>
            <td>${player1.remaining()}</td>
            <td>${player1.average()}</td>
        </tr>
    `;

    // Player 2 table update
    document.getElementById("player_2_score").innerText = player2.remaining();
    document.getElementById("player_2_scores").querySelector("tbody").innerHTML = `
        <tr>
            <td>${player2.remaining()}</td>
            <td>${player2.average()}</td>
        </tr>
    `;

    // highlight current player
    document.getElementById("player_1").style.background =
        currentPlayer === 1 ? "#d4ffd4" : "white";

    document.getElementById("player_2").style.background =
        currentPlayer === 2 ? "#d4ffd4" : "white";
}

updateUI();
