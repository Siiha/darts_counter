export class Player {
  constructor(name, startingScore) {
    this.name = name;
    this.startingScore = startingScore;
    this.points = []; 
  }

  addThrow(score) {
    this.points.push(score);
  }

  undo() {
    return this.points.pop();
  }

  // yhteenlasketut pisteet
  totalScored() {
    return this.points.reduce((a, b) => a + b, 0);
  }

  // jäljellä oleva pistemäärä (301/501 - heitetyt)
  remaining() {
    return this.startingScore - this.totalScored();
  }

  // heittojen keskiarvo (reaaliaikainen aggregointi)
  average() {
    if (this.points.length === 0) return 0;
    return Math.round((this.totalScored() / this.points.length) * 10) / 10;
  }

  reset() {
    this.points = [];
  }
}
