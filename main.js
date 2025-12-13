import { player } from "./player.js";
import { mode_301, mode_501 } from "./game_modes.js";
const players = [];
let turn = 0;
let m;
let leg = 1;
const mes = document.getElementById("message");
mes.innerHTML = "Leg " + leg;
const b301 = document.getElementById("301");
const b501 = document.getElementById("501");
b301.disabled = true;
b501.disabled = true;
const new_player = document.getElementById("new_player");
const menu = document.getElementById("menu");
const infos = document.getElementById("infos");
const dd = document.getElementById("add");
dd.disabled = true;
const nt = () => {
    const p_name = document.createElement("input");
    p_name.id = "p_name";
    menu.appendChild(p_name);
    const p_add = document.createElement("button");
    p_add.innerText = "add";

    const new_p = () => {
        players.push(new player(p_name.value));
        const sc = document.createElement('div');
        sc.id = p_name.value;
        infos.appendChild(sc);
        const sh = document.createElement('h2');
        sh.innerText = sc.id;
        sc.appendChild(sh);
        const sc_t = document.createElement('table');
        const sc_h = document.createElement('thead');
        sc_h.innerHTML = "<tr><th> Score</th><th> AVG</th><th>win legs</th></tr>"
        const sc_b = document.createElement('tbody');
        sc.appendChild(sc_t);
        sc_t.appendChild(sc_h);
        sc_t.appendChild(sc_b);
        const sc_b_r = document.createElement('tr');
        const sc_b_d = document.createElement('td');
        const sc_b_a = document.createElement('td');
        sc_b_d.id = sc.id + "_score";
        sc_b_a.id = sc.id + "_avg";
        sc_b_r.appendChild(sc_b_d);
        sc_b_r.appendChild(sc_b_a);
        sc_b.appendChild(sc_b_r);
        sc.className = "player";
        p_name.remove()
        p_add.remove()
        b301.disabled = false;
        b501.disabled = false;

    }
    p_add.addEventListener("click", new_p);
    menu.appendChild(p_add);
}

new_player.addEventListener("click", nt);


const v = (x) => {
    b301.remove();
    b501.remove();
    for (let i of players) {
        const d = document.getElementById(i.name + "_score");
        d.innerHTML = x;
    }
    dd.disabled = false;
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
    players[turn].add(parseInt(a.value));
    const d = document.getElementById(players[turn].name + "_score");
    const avg = document.getElementById(players[turn].name + "_avg");
    d.innerHTML = players[turn].scoreboard(m)[0];
    avg.innerHTML = players[turn].scoreboard(m)[1];

    if (players[turn].scoreboard(m)[0] == 0) {
        mes.innerHTML = players[turn].name + " win leg " + leg + "!";
        setTimeout(() => { mes.innerHTML = "Leg " + leg; }, 3000);

        leg++
        players[turn].legs++;

        for (let playe of players) {
            playe.archived();
            const d = document.getElementById(playe.name + "_score");
            d.innerHTML = m;
        }
    }
    turn++;
    if (turn == players.length) { turn = 0 }

}
dd.addEventListener("click", scoreupdate);