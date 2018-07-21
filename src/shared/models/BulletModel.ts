import ICircle from "../interfaces/ICircle";

export default class BulletModel implements ICircle {
    public type = 'circle';

    public x: number;
    public y: number;

    constructor(public id: number,
                public size: number = 4) {
        this.x = 0;
        this.y = 0;
    }

}