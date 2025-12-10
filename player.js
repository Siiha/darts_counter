export class Player {
    constructor(name, startingScore) {
        this.name = name;
        this.startingScore = startingScore;
        this.throws = [];   // kaikki pelaajan heitot tallennetaan tänne
    }

    // Lisää yksi pisteheitto
    addThrow(score) {
        this.throws.push(score);
    }

    // Peru viimeisin heitto (UNDO)
    undo() {
        return this.throws.pop();
    }

    // Kuinka paljon pisteitä on yhteensä heitetty
    totalScored() {
        return this.throws.reduce((sum, val) => sum + val, 0);
    }

    // Kuinka paljon pisteitä on jäljellä (301/501 - heitetyt pisteet)
    remaining() {
        return this.startingScore - this.totalScored();
    }

    // Laskee keskiarvon pelaajan heitoista
    average() {
        if (this.throws.length === 0) return 0;
        return Math.round((this.totalScored() / this.t

    this.points = [];
  }
}

