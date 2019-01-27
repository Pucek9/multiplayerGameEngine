import StaticRectangleObject from '../models/StaticRectangleObject';

export default class Prototype2 {
    private static mapName = 'Prototype2';

    constructor() {

    }

    static getMapName() {
        return this.mapName;
    }

    static getStaticObjects() {
        return [
            new StaticRectangleObject(1200, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(800, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(400, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(0, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(-400, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(-800, 30, 0, 100, 800, 10, 'yellow'),
            new StaticRectangleObject(-1200, 30, 0, 100, 800, 10, 'yellow'),
        ];
    }

}
