export default interface IRenderable {

    screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D };

    render(any?): void;

}