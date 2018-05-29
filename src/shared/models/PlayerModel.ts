import ICircle from '../interfaces/ICircle'

export default class PlayerModel implements ICircle {
    public type = 'circle';

    public active: boolean;
    public alive: boolean;

    constructor(public id: number,
                public name: string,
                public color: string,
                public x: number,
                public y: number,
                public size: number = 32,
                public speed: number = 5,
                public score: number = 0,
                public hp: number = 500,
    ) {
        this.active = false;
        this.alive = true;
    }

}