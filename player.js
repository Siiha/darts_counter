export class Player {
    constructor(name, startingScore) {
        this.name = name;
        this.startingScore = startingScore;
        this.throws = [];   // pelaajan kaikki heitot
    }

    // Lisää yksi pisteheitto
    addThrow(score) {
        this.throws.push(score);
    }

    // Peru viimeisin heitto (UNDO)
    undo() {
        return this.throws.pop();
    }

    // Yhteispistemäärä kaikista heitoista
    totalScored() {
        return this.throws.reduce((sum, val) => sum + val, 0);
    }

    // Jäljellä oleva pistemäärä (301/501 - heitetyt pisteet)
    remaining() {
        return this.startingScore - this.totalScored();
    }

    // Heittojen keskiarvo (reaaliaikainen aggregointi)
    average() {
        if (this.throws.length === 0) return 0;
        return Math.round((this.totalScored() / this.throws.length) * 10) / 10;
    }

    // Nollaa pelaajan tilan uutta legiä tai uutta pelimuotoa varten
    reset(startingScore) {
        this.startingScore = startingScore;
        this.throws = [];
    }
}


