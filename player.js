export class player {
    constructor(name) {
        this.points = [];
        this.name = name;

    }

    remove(id) {
        this.points.remove(id);
    }
    add(point) {
        this.points.push(point);
    }
    score() {
        let sum = 0;
        for (let p in this.points) {
            sum += p;
        }
        return sum;
    }
    avg() {
        return this.score / this.points.length;
    }
    scoreboard(x) {
        return [x - this.score(), this.avg];
    }
}