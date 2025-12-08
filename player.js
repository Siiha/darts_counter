export class player {
    constructor(name) {
        this.points = [];
        this.name = name;

    }

    remove(id) {
        this.points.remove(id, 1);
    }
    add(point) {
        this.points.push(point);
    }
    undo() {
  return this.points.pop();
}

    score() {
        let sum = 0;
        for (let p of this.points) {
            sum += p;
        }
        return sum;
    }
    remaining(startingScore) {
  return startingScore - this.score();
}

    avg() {
        return this.score() / this.points.length;
    }
    scoreboard(x) {
        return [x - this.score(), this.avg()];
    }
}
