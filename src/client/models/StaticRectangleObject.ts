import StaticRectangleObjectModel from "../../shared/models/StaticRectangleObjectModel";
import IRenderable from "../interfaces/IRenderable";
import PlayerModel from "../../shared/models/PlayerModel";
import {Screen} from "../types/Screen";

const THREE = require('three');

export default class StaticRectangleObject extends StaticRectangleObjectModel implements IRenderable {
    private object;

    init(screen: Screen) {

        function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        const geometry = new THREE.BoxGeometry(this.width, this.height, 50);
        const material = new THREE.MeshBasicMaterial({color: this.color});
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotation.z = degToRad(this.deg);
        this.object.position.x = this.x + this.width / 2;
        this.object.position.y = this.y + this.height / 2;
        screen.scene.add(this.object);
    }

    render() {

    }

    //
    // renderUnRotated(activePlayer: PlayerModel) {
    // this.screen.ctx.fillStyle = this.color;
    // this.screen.ctx.fillRect(
    //     this.screen.canvas.width / 2 - (activePlayer.x - this.x),
    //     this.screen.canvas.height / 2 - (activePlayer.y - this.y),
    //     this.width,
    //     this.height
    // );
    // }

    // renderRotated(activePlayer: PlayerModel) {
    // this.getPathOfShape(activePlayer);
    // this.screen.ctx.save();
    // this.screen.ctx.fillStyle = this.color;
    // this.screen.ctx.fill();
    // this.screen.ctx.restore()
    // }

    // getPathOfShape(activePlayer) {
    //
    //     function rotatePoint(pivot, point, angle) {
    //         let x = Math.round((Math.cos(angle) * (point[0] - pivot[0])) -
    //             (Math.sin(angle) * (point[1] - pivot[1])) +
    //             pivot[0]),
    //             y = Math.round((Math.sin(angle) * (point[0] - pivot[0])) +
    //                 (Math.cos(angle) * (point[1] - pivot[1])) +
    //                 pivot[1]);
    //         return {x: x, y: y};
    //     }
    //
    //     function degToRad(deg) {
    //         return deg * Math.PI / 180;
    //     }
    //
    //     const angleOfDeg = this.deg,
    //         x = this.screen.canvas.width / 2 - (activePlayer.x - this.x),
    //         y = this.screen.canvas.height / 2 - (activePlayer.y - this.y),
    //         centerX = x + this.width / 2,
    //         centerY = y + this.height / 2,
    //         w = this.width,
    //         h = this.height,
    //         angleOfRad = degToRad(angleOfDeg);
    //
    //     const leftTop = [x, y],
    //         rightTop = [x + w, y],
    //         rightBottom = [x + w, y + h],
    //         leftBottom = [x, y + h];
    //
    //     const rotateLeftTop = rotatePoint([centerX, centerY], leftTop, angleOfRad),
    //         rotateRightTop = rotatePoint([centerX, centerY], rightTop, angleOfRad),
    //         rotateRightBottom = rotatePoint([centerX, centerY], rightBottom, angleOfRad),
    //         rotateLeftBottom = rotatePoint([centerX, centerY], leftBottom, angleOfRad);
    //
    //     this.screen.ctx.beginPath();
    //     this.screen.ctx.moveTo(rotateLeftTop.x, rotateLeftTop.y);
    //     this.screen.ctx.lineTo(rotateRightTop.x, rotateRightTop.y);
    //     this.screen.ctx.lineTo(rotateRightBottom.x, rotateRightBottom.y);
    //     this.screen.ctx.lineTo(rotateLeftBottom.x, rotateLeftBottom.y);
    //     this.screen.ctx.closePath();
    // }

}