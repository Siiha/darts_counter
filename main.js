import { player } from "./player.js";
import special_messages from "./special_messages.json"
with { type: "json" };


// Pelaajien taulukko
const players = [];
// Nykyinen pelaajan vuoro
let turn = 0;
// Pelimuoto (301 tai 501)
let m;
// Nykyinen leg-numero
let leg = 1;
// Nykyinen set-numero
let set = 1;
// Legs-konfiguraatio: tyyppi ('best' tai 'first') ja tavoite
let legsConfig = { type: 'best', target: 3 }; // Oletus: best of 3
// Sets-konfiguraatio: tyyppi ('best' tai 'first') ja tavoite
let setsConfig = { type: 'best', target: 3 }; // Oletus: best of 3

// Viesti-elementin haku
const mes = document.getElementById("message");
mes.innerHTML = "Set " + set + " - Leg " + leg;

// Pelimuoto-nappien ja start-napin haku
const b301 = document.getElementById("301");
const b501 = document.getElementById("501");
const start = document.getElementById('start');
b301.disabled = true;
b501.disabled = true;
start.disabled = true;
// Muiden elementtien haku
const new_player = document.getElementById("new_player");
const menu = document.getElementById("menu");
const infos = document.getElementById("infos");
const dd = document.getElementById("add");
dd.disabled = true;

const legsSelect = document.getElementById("legs");
const setsSelect = document.getElementById("sets");

// Legs-valikon käsittelijä
legsSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const type = value.charAt(0); // 'b' = best of, 'f' = first to
    const target = parseInt(value.substring(1));

    legsConfig = {
        type: type === 'b' ? 'best' : 'first',
        target: target
    };

    console.log(`Legs-konfiguraatio: ${legsConfig.type === 'best' ? 'Best of' : 'First to'} ${legsConfig.target}`);
});

// Sets-valikon käsittelijä
setsSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const type = value.charAt(0); // 'b' = best of, 'f' = first to
    const target = parseInt(value.substring(1));

    setsConfig = {
        type: type === 'b' ? 'best' : 'first',
        target: target
    };

    console.log(`Sets-konfiguraatio: ${setsConfig.type === 'best' ? 'Best of' : 'First to'} ${setsConfig.target}`);
});

// Uuden pelaajan lisääminen
const nt = () => {
    const p_name = document.createElement("input");
    p_name.id = "p_name";
    p_name.placeholder = "Pelaajan nimi";
    menu.appendChild(p_name);

    const p_add = document.createElement("button");
    p_add.innerText = "Lisää";

    const new_p = () => {
        // Tarkista että nimi ei ole tyhjä
        if (!p_name.value.trim()) {
            alert("Syötä pelaajan nimi");
            return;
        }

        // Luo uusi pelaaja-olio
        players.push(new player(p_name.value));

        // Luo pelaajan näyttö-elementit
        const sc = document.createElement('div');
        sc.id = p_name.value;
        infos.appendChild(sc);

        const sh = document.createElement('h2');
        sh.innerText = sc.id;
        sc.appendChild(sh);

        // Luo taulukko pelaajan tiedoille
        const sc_t = document.createElement('table');
        const sc_h = document.createElement('thead');
        sc_h.innerHTML = "<tr><th>Score</th><th>AVG</th><th>Legs</th><th>Sets</th></tr>"
        const sc_b = document.createElement('tbody');
        sc.appendChild(sc_t);
        sc_t.appendChild(sc_h);
        sc_t.appendChild(sc_b);

        // Luo taulukon rivit
        const sc_b_r = document.createElement('tr');
        const sc_b_d = document.createElement('td');
        const sc_b_a = document.createElement('td');
        const sc_b_l = document.createElement('td');
        const sc_b_s = document.createElement('td');
        sc_b_l.id = sc.id + "_legs";
        sc_b_s.id = sc.id + "_sets";
        sc_b_d.id = sc.id + "_score";
        sc_b_a.id = sc.id + "_avg";
        sc_b_r.appendChild(sc_b_d);
        sc_b_r.appendChild(sc_b_a);
        sc_b_r.appendChild(sc_b_l);
        sc_b_r.appendChild(sc_b_s);
        sc_b.appendChild(sc_b_r);

        sc.className = "player";

        // Poista input ja lisää-nappi
        p_name.remove()
        p_add.remove()

        // Aktivoi pelimuoto-napit
        b301.disabled = false;
        b501.disabled = false;
    }

    p_add.addEventListener("click", new_p);
    menu.appendChild(p_add);
}

new_player.addEventListener("click", nt);

// Pelimuodon valinta

const v = (x) => {
    b301.remove();
    b501.remove();
    // Aseta alkupisteet kaikille pelaajille
    for (let i of players) {
        const d = document.getElementById(i.name + "_score");
        d.innerHTML = x;
        // Alusta legs ja sets nollaan
        const l = document.getElementById(i.name + "_legs");
        const s = document.getElementById(i.name + "_sets");
        l.innerHTML = "0";
        s.innerHTML = "0";
    }
    start.disabled = false
}

start.addEventListener('click', () => {
    dd.disabled = false;
    new_player.remove();
    // Lukitse legs- ja sets-valinnat pelin alettua
    legsSelect.disabled = true;
    setsSelect.disabled = true;
    highlightActivePlayer();
})

// 301-pelimuoto
b301.addEventListener("click", () => {
    m = 301;
    v(m);
    b301.classList.add("active");
    b501.classList.remove("active");
});

// 501-pelimuoto
b501.addEventListener("click", () => {
    m = 501;
    v(m);
    b501.classList.add("active");
    b301.classList.remove("active");
})

// Korosta aktiivinen pelaaja
function highlightActivePlayer() {
    // Poista aktiivinen luokka kaikilta pelaajilta
    document.querySelectorAll('.player').forEach(p => p.classList.remove('active-player'));

    // Lisää aktiivinen luokka nykyiselle pelaajalle
    const activePlayer = document.getElementById(players[turn].name);
    if (activePlayer) {
        activePlayer.classList.add('active-player');
    }
}

// Tarkista legin voittaja
function checkLegWinner() {
    for (let player of players) {
        let wonLeg = false;

        if (legsConfig.type === 'best') {
            // Best of X: pitää voittaa yli puolet
            const legsNeeded = Math.ceil(legsConfig.target / 2);
            if (player.legs >= legsNeeded) {
                wonLeg = true;
            }
        } else {
            // First to X: pitää voittaa tasan X legiä
            if (player.legs >= legsConfig.target) {
                wonLeg = true;
            }
        }

        if (wonLeg) {
            // Pelaaja voitti setin!
            messager(`${player.name} voittaa setin ${set}!`);
            player.sets++;

            // Päivitä sets-näyttö
            const s = document.getElementById(player.name + "_sets");
            s.innerHTML = player.sets;

            // Nollaa kaikki legit
            for (let p of players) {
                p.legs = 0;
                const l = document.getElementById(p.name + "_legs");
                l.innerHTML = "0";
            }

            // Tarkista voittiko pelin kokonaan
            if (checkMatchWinner()) {
                return true;
            }

            // Aloita uusi setti
            set++;
            leg = 1;
            mes.innerHTML = "Set " + set + " - Leg " + leg;

            // Nollaa pisteet uudelle setille
            for (let p of players) {
                p.archived();
                const d = document.getElementById(p.name + "_score");
                d.innerHTML = m;
            }

            return true;
        }
    }
    return false;
}

// Tarkista pelin voittaja (sets)
function checkMatchWinner() {
    for (let player of players) {
        let won = false;

        if (setsConfig.type === 'best') {
            // Best of X: pitää voittaa yli puolet
            const setsNeeded = Math.ceil(setsConfig.target / 2);
            if (player.sets >= setsNeeded) {
                won = true;
            }
        } else {
            // First to X: pitää voittaa tasan X settiä
            if (player.sets >= setsConfig.target) {
                won = true;
            }
        }

        if (won) {
            messager(`🏆 ${player.name} voittaa ottelun! 🏆`);
            dd.disabled = true;
            return true;
        }
    }
    return false;
}

// Näytä viesti
function messager(message) {
    mes.innerHTML = message;
    setTimeout(() => {
        mes.innerHTML = "Set " + set + " - Leg " + leg;
    }, 3000);
}

// Päivitä pisteet
function scoreupdate() {

    const a = document.getElementById("score");
    const va = parseInt(a.value);

    // Tarkista että pistemäärä on kelvollinen
    if (isNaN(va) || va < 0 || va > 180) {
        alert("Syötä kelvollinen pistemäärä (0-180)");
        return;
    }

    // Näytä erikoisviesti jos on
    if (va in special_messages) {
        messager(special_messages[va])
    }

    // Lisää pisteet pelaajalle
    players[turn].add(va);
    const d = document.getElementById(players[turn].name + "_score");
    const avg = document.getElementById(players[turn].name + "_avg");
    d.innerHTML = players[turn].scoreboard(m)[0];
    avg.innerHTML = players[turn].scoreboard(m)[1];

    // Tarkista voittiko pelaaja legin
    if (players[turn].scoreboard(m)[0] == 0) {
        messager(players[turn].name + " voittaa legin " + leg + "!");

        players[turn].legs++;
        const l = document.getElementById(players[turn].name + "_legs");
        l.innerHTML = players[turn].legs;

        // Tarkista voittiko setin
        if (checkLegWinner()) {
            // Jos peli ei ole ohi, jatka normaalisti
            if (!dd.disabled) {
                turn++;
                if (turn == players.length) {
                    turn = 0
                }
                highlightActivePlayer();
                a.value = "";
            }
            return;
        }

        // Aloita uusi leg
        leg++;
        mes.innerHTML = "Set " + set + " - Leg " + leg;

        // Nollaa pisteet uudelle legille
        for (let playe of players) {
            playe.archived();
            const d = document.getElementById(playe.name + "_score");
            d.innerHTML = m;
        }
    }

    // Vaihda vuoroa
    turn++;
    if (turn == players.length) {
        turn = 0
    }

    highlightActivePlayer();
    a.value = ""; // Tyhjennä syöttökenttä
}

dd.addEventListener("click", scoreupdate);

// Salli Enter-näppäin pisteiden lisäämiseen
document.getElementById("score").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !dd.disabled) {
        scoreupdate();
    }
});