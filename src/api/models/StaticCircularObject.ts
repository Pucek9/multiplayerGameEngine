import ICircle from "../interfaces/ICircle";

export default class StaticCircularObject implements ICircle {
    public type = 'circle';

    constructor(
        public x: number,
        public y: number,
        public size: number
    ) {
    }

}