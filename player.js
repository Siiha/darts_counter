export class player {
    constructor(name) {
        this.points = [];
        this.name = name;
        this.archive = [];
        this.legs = 0;  // Voitetut legit
        this.sets = 0;  // Voitetut setit
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
        let a = Math.abs(this.score() - x)
        if (a < 2 && a != 0) {
            this.undo()
        }
        return [x - this.score(), this.avg()];
    }
    
    changeName(name) {
        this.name = name;
    }
    
    archived() {
        this.archive.push(this.points);
        this.points.length = 0;
    }
}