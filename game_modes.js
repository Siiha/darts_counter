import { Player } from "./player.js";

// ------------------------------------------------------------
// GAME STATE
// ------------------------------------------------------------
let gameType = 301;
let currentPlayer = 1;  // 1 = Player 1, 2 = Player 2

let player1 = new Player("Player 1", gameType);
let player2 = new Player("Player 2", gameType);

// ------------------------------------------------------------
// GAME MODE BUTTON LISTENERS (301 / 501)
// ------------------------------------------------------------
document.getElementById("301").addEventListener("click", () => startGame(301));
document.getElementById("501").addEventListener("click", () => startGame(501));

function startGame(type) {
    gameType = type;

    player1.reset(gameType);
    player2.reset(gameType);

    currentPlayer = 1;

    console.log("Game started in mode:", type);
    updateUI();
}

// ------------------------------------------------------------
// ADD SCORE
// ------------------------------------------------------------
document.getElementById("add").addEventListener("click", () => {
    const scoreInput = document.getElementById("score");
    const score = parseInt(scoreInput.value);

    if (isNaN(score) || score < 0 || score > 180) {
        alert("Invalid score.");
        return;
    }

    const p = currentPlayer === 1 ? player1 : player2;

    // Prevent bust (remaining cannot go negative)
    if (p.remaining() - score < 0) {
        alert("Bust! Score cannot go below zero.");
        return;
    }

    // Add valid throw
    p.addThrow

