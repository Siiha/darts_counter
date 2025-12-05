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
}