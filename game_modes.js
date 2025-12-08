import { Player } from "./player.js";

let gameType = 301;       // default
let currentPlayer = 1;    // 1 = Player 1, 2 = Player 2

let player1 = new Player("Player 1", gameType);
let player2 = new Player("Player 2", gameType);

// PELIMUODON VALINTA
document.getElementById("301").addEventListener("click", () => startGame(301));
document.getElementById("501").addEventListener("click", () => startGame(501));

function startGame(type) {
  gameType = type;

  player1 = new Player("Player 1", gameType);
  player2 = new Player("Player 2", gameType);

  currentPlayer = 1;
  
  console.log("Game started mode:", type);
  updateUI();
}

// HEITON LISÄYS
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const scoreInput = document.getElementById("score");
  const score = parseInt(scoreInput.value);

  if (score < 0 || score > 180) return alert("Invalid score");

  const p = currentPlayer === 1 ? player1 : player2;

  // tarkista bust
  if (p.remaining() - score < 0) {
    alert("Bust! Cannot go below zero.");
    return;
  }

  p.addThrow(score);
  scoreInput.value = "";

  // voitto?
  if (p.remaining() === 0) {
    alert(`${p.name} wins the leg!`);
    player1.reset();
    player2.reset();
  }

  // vuoron vaihto
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  updateUI();
});
