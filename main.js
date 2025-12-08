import { player } from "./player.js";
import { mode_301, mode_501 } from "./game_modes.js";
const players = [new player("player_1"), new player("player_2")];
let s = 0;

function scoreupdate() {
    const a = document.getElementById("score");
    players[s].add(parseInt(a.value));
    const d = document.getElementById(players[s].name + "_score");
    d.innerHTML = players[s].scoreboard(301)[0];
    s = s === 0 ? 1 : 0;


}
const dd = document.getElementById("add");
form.addEventListener("click", scoreupdate);