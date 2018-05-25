import IRectangle from "../interfaces/IRectangle";

export default class StaticRectangleObject implements IRectangle {
    public type = 'rectangle';

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
    }

}