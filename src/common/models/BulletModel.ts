import ICircle from "../interfaces/ICircle";

export default class BulletModel implements ICircle {
    public type = 'circle';

    public x: number;
    public y: number;

    constructor(public fromX: number,
                public fromY: number,
                public targetX: number,
                public targetY: number,
                public owner: any,
                public size: number = 1,
                public power: number = 10) {
    }

}