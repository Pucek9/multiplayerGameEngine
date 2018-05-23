export default interface IRenderable {

    screen: { canvas: any, ctx: any };

    render(any?) : void;

}