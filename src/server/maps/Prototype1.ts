import StaticCircularObject from "../models/StaticCircularObject";
import StaticRectangleObject from "../models/StaticRectangleObject";

export default class Prototype1 {
    private static mapName = 'Prototype1';

    constructor() {

    }

    static getMapName() {
        return this.mapName;
    }

    static getStaticObjects() {
        return [
            new StaticCircularObject(100, 200, 100, 'red'),
            new StaticCircularObject(1000, 200, 90, 'blue'),
            new StaticCircularObject(500, 400, 30, 'purple'),
            new StaticRectangleObject(500, 300, 0, 500, 100, 200, 'green', 45),
            new StaticRectangleObject(230, 170, 0, 200, 80, 80, 'blue', -30),
            new StaticRectangleObject(-400, -500, 0, 300, 300, 10, 'pink', -70),
            new StaticRectangleObject(1300, 30, 0, 100, 300, 100, 'yellow'),
        ]
    }

}
