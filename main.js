import { player } from "./player.js";
import { mode_301, mode_501 } from "./game_modes.js";
const players = [new player("player_1"), new player("player_2")];
let s = 0;
const mes = document.getElementById("message");

function scoreupdate() {
    const a = document.getElementById("score");
    players[s].add(parseInt(a.value));
    const d = document.getElementById(players[s].name + "_score");
    d.innerHTML = players[s].scoreboard(301)[0];
    if (players[s].scoreboard(301)[0] == 0) {
        mes.innerHTML = players[s].name + " win!";
        players[s].legs++;
        for (i of players) {
            i.archived();
        }
    }
    s = s === 0 ? 1 : 0;


}
const dd = document.getElementById("add");
dd.addEventListener("click", scoreupdate);