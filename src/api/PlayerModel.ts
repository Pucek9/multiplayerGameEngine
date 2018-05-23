export default class PlayerModel {

    public width: number;
    public height: number;
    public active: boolean;
    public alive: boolean;

    constructor(public id: number,
                public name: string,
                public color: string,
                public x: number,
                public y: number,
                size: number,
                public speed: number = 5,
                public score: number = 0,
                public hp: number = 1000,
    ) {
        this.width = size;
        this.height = size;
        this.active = false;
        this.alive = true;
    }

}