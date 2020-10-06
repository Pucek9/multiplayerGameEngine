// import { INVISIBLE, RED, STADIUM, STADIUM_GRASS } from '../../../shared/constants';
//
// import Goal from '../../models/Goal';
// import CircularObject from '../../models/CircularObject';
// import RectangleObject from '../../models/RectangleObject';
// import Zone from '../../models/Zone';
// import GameMap from '../GameMap';
//
// export default class Stadium extends GameMap {
//   mapName = STADIUM;
//   floor = STADIUM_GRASS;
//   width = 1184;
//   height = 762;
//
//   constructor() {
//     super();
//     this.setStaticObjects();
//     this.setItemsGenerators();
//     this.setZones();
//   }
//
//   setStaticObjects() {
//     this.staticObjects = [
//       new Goal({
//         x: 512,
//         y: -57,
//         width: 20,
//         height: 112,
//         z: 0,
//         depth: 50,
//         color: RED,
//         team: '',
//       }),
//       new CircularObject({
//         x: 512,
//         y: 57,
//         size: 5,
//         color: RED,
//       }),
//       new CircularObject({
//         x: 512,
//         y: -57,
//         size: 5,
//         color: RED,
//       }),
//       new Goal({
//         x: -532,
//         y: -57,
//         width: 20,
//         height: 112,
//         z: 0,
//         depth: 50,
//         color: RED,
//         team: '',
//       }),
//       new CircularObject({
//         x: -512,
//         y: 57,
//         size: 5,
//         color: RED,
//       }),
//       new CircularObject({
//         x: -512,
//         y: -57,
//         size: 5,
//         color: RED,
//       }),
//       //right
//       new RectangleObject({
//         x: 600,
//         y: -400,
//         z: 0,
//         width: 100,
//         height: 900,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: 514,
//         y: -400,
//         z: 0,
//         width: 100,
//         height: 900,
//         depth: 10,
//         color: INVISIBLE,
//       }),
//       //left
//       new RectangleObject({
//         x: -700,
//         y: -400,
//         z: 0,
//         width: 100,
//         height: 900,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -614,
//         y: -400,
//         z: 0,
//         width: 100,
//         height: 900,
//         depth: 10,
//         color: INVISIBLE,
//       }),
//       //up
//       new RectangleObject({
//         x: -700,
//         y: 390,
//         z: 0,
//         width: 1400,
//         height: 100,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -700,
//         y: 345,
//         z: 0,
//         width: 1400,
//         height: 100,
//         depth: 10,
//         color: INVISIBLE,
//       }),
//       //down
//       new RectangleObject({
//         x: -700,
//         y: -490,
//         z: 0,
//         width: 1400,
//         height: 100,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -700,
//         y: -450,
//         z: 0,
//         width: 1400,
//         height: 100,
//         depth: 10,
//         color: INVISIBLE,
//       }),
//     ];
//   }
//
//   setItemsGenerators() {
//     this.itemGenerators = [];
//   }
//
//   setZones() {
//     this.zones = [
//       new Zone({
//         x: -600,
//         y: -500,
//         width: 600,
//         height: 800,
//       }),
//       new Zone({
//         x: 0,
//         y: -500,
//         width: 600,
//         height: 800,
//       }),
//     ];
//   }
// }
