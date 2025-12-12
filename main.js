import { player } from "./player.js";
import { mode_301, mode_501 } from "./game_modes.js";
const players = [new player("player_1"), new player("player_2")];
let s = 0;
let m;
const mes = document.getElementById("message");
const b301 = document.getElementById("301");
const b501 = document.getElementById("501");
const v = (x) => {
    b301.remove();
    b501.remove();
    for (let i of players) {
        const d = document.getElementById(i.name + "_score");
        d.innerHTML = x;
    }
}
b301.addEventListener("click", () => {
    m = 301;
    v(m);
});

b501.addEventListener("click", () => {
    m = 501;
    v(m);
})

function scoreupdate() {
    const a = document.getElementById("score");
    players[s].add(parseInt(a.value));
    const d = document.getElementById(players[s].name + "_score");
    d.innerHTML = players[s].scoreboard(m)[0];
    if (players[s].scoreboard(m)[0] == 0) {
        mes.innerHTML = players[s].name + " win!";
        players[s].legs++;
        for (let playe of players) {
            playe.archived();
            const d = document.getElementById(playe.name + "_score");
            d.innerHTML = m;
        }
    }
    s = s === 0 ? 1 : 0;

}
const dd = document.getElementById("add");
dd.addEventListener("click", scoreupdate);