export default class Player {

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
                public hp: number = 100,
    ) {
        this.width = size;
        this.height = size;
        this.active = false;
        this.alive = true;
    }

    render() {

    }

}