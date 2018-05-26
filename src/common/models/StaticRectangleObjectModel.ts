import IRectangle from "../interfaces/IRectangle";

export default class StaticRectangleObjectModel implements IRectangle {
    public type = 'rectangle';

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
    }

}