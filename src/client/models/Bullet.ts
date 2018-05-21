export default class Bullet {

    public x: number;
    public y: number;

    constructor(public fromX: number,
                public fromY: number,
                public targetX: number,
                public targetY: number,
                public owner: string,
                public size: number = 1) {
    }

    render() {

    }

}