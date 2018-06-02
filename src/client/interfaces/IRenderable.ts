import {screen} from "../types/screen";

export default interface IRenderable {

    screen: screen;

    render(any?): void;

}