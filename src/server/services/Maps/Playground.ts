// import {
//   AID_KIT,
//   AK47,
//   BLACK,
//   BLUE,
//   BROWN,
//   GRASS,
//   GREEN,
//   GRENADE,
//   LAND_MINE,
//   PINK,
//   PISTOL,
//   PLAYGROUND,
//   PURPLE,
//   RED,
//   RESIZER,
//   SHOTGUN,
//   WHITE,
//   YELLOW,
// } from '../../../shared/constants';
// import { Item } from '../../../shared/models';
//
// import AidKit from '../../models/AidKit';
// import ItemGenerator from '../../models/ItemGenerator';
// import CircularObject from '../../models/CircularObject';
// import RectangleObject from '../../models/RectangleObject';
// import Ak47 from '../../models/weapons/Ak47';
// import ArcticWarfarePolice from '../../models/weapons/ArcticWarfarePolice';
// import Grenade from '../../models/weapons/Grenade';
// import LandMine from '../../models/weapons/LandMine';
// import Pistol from '../../models/weapons/Pistol';
// import Resizer from '../../models/weapons/Resizer';
// import Shotgun from '../../models/weapons/Shotgun';
// import GameMap from '../GameMap';
//
// export default class Playground extends GameMap {
//   mapName = PLAYGROUND;
//   floor = GRASS;
//   width = 2920;
//   height = 2004;
//   staticObjects: (RectangleObject | CircularObject)[];
//   itemGenerators: ItemGenerator<Item>[];
//
//   constructor() {
//     super();
//     this.setStaticObjects();
//     this.setItemsGenerators();
//   }
//
//   setStaticObjects() {
//     this.staticObjects = [
//       new CircularObject({ x: 100, y: 250, size: 100, color: RED }),
//       new CircularObject({ x: 1000, y: 250, size: 90, color: BLUE }),
//       new CircularObject({ x: 500, y: 450, size: 30, color: PURPLE }),
//       new CircularObject({ x: -1050, y: -180, size: 120, color: RED }),
//       new CircularObject({ x: -600, y: -600, size: 100, color: BLUE }),
//       new CircularObject({ x: -200, y: -700, size: 130, color: YELLOW }),
//       new CircularObject({ x: 500, y: -700, size: 80, color: RED }),
//       new CircularObject({ x: -1200, y: 850, size: 90, color: GREEN }),
//       new RectangleObject({
//         x: 500,
//         y: 350,
//         z: 0,
//         width: 500,
//         height: 100,
//         depth: 200,
//         color: GREEN,
//         deg: 45,
//       }),
//       new RectangleObject({
//         x: 230,
//         y: 220,
//         z: 0,
//         width: 200,
//         height: 80,
//         depth: 80,
//         color: BLUE,
//         deg: -30,
//       }),
//       new RectangleObject({
//         x: -230,
//         y: 420,
//         z: 0,
//         width: 80,
//         height: 300,
//         depth: 80,
//         color: YELLOW,
//         deg: 50,
//       }),
//       new RectangleObject({
//         x: -920,
//         y: 600,
//         z: 0,
//         width: 400,
//         height: 150,
//         depth: 80,
//         color: RED,
//         deg: -130,
//       }),
//       new RectangleObject({
//         x: -730,
//         y: 220,
//         z: 0,
//         width: 200,
//         height: 120,
//         depth: 120,
//         color: BLUE,
//         deg: 120,
//       }),
//       new RectangleObject({
//         x: 900,
//         y: -500,
//         z: 0,
//         width: 400,
//         height: 400,
//         depth: 10,
//         color: PINK,
//       }),
//       new RectangleObject({
//         x: -400,
//         y: -450,
//         z: 0,
//         width: 300,
//         height: 300,
//         depth: 10,
//         color: PINK,
//         deg: -70,
//       }),
//       new RectangleObject({
//         x: 1300,
//         y: 170,
//         z: 0,
//         width: 100,
//         height: 300,
//         depth: 100,
//         color: YELLOW,
//       }),
//       new RectangleObject({
//         x: -1200,
//         y: -390,
//         z: 0,
//         width: 600,
//         height: 80,
//         depth: 120,
//         color: GREEN,
//         deg: 40,
//       }),
//       new RectangleObject({
//         x: 1450,
//         y: -1000,
//         z: 0,
//         width: 100,
//         height: 2000,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -1550,
//         y: -1000,
//         z: 0,
//         width: 100,
//         height: 2000,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -1550,
//         y: 1000,
//         z: 0,
//         width: 3100,
//         height: 100,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -1550,
//         y: -1050,
//         z: 0,
//         width: 3100,
//         height: 100,
//         depth: 100,
//         color: RED,
//       }),
//       new RectangleObject({
//         x: -1550,
//         y: 0,
//         z: 0,
//         width: 400,
//         height: 100,
//         depth: 100,
//         color: BLUE,
//       }),
//       new RectangleObject({
//         x: -1000,
//         y: 0,
//         z: 0,
//         width: 2000,
//         height: 100,
//         depth: 100,
//         color: BLUE,
//       }),
//       new RectangleObject({
//         x: 1150,
//         y: 0,
//         z: 0,
//         width: 400,
//         height: 100,
//         depth: 100,
//         color: BLUE,
//       }),
//     ];
//   }
//
//   setItemsGenerators() {
//     this.itemGenerators = [
//       new ItemGenerator({
//         ItemClass: Pistol,
//         x: 1350,
//         y: 150,
//         size: 4,
//         color: BROWN,
//         time: 10000,
//       }),
//       new ItemGenerator({
//         ItemClass: Shotgun,
//         x: 200,
//         y: 500,
//         size: 4,
//         color: RED,
//         time: 20000,
//       }),
//       new ItemGenerator({
//         ItemClass: Resizer,
//         x: -500,
//         y: 200,
//         size: 4,
//         color: YELLOW,
//         time: 30000,
//       }),
//       new ItemGenerator({
//         x: -800,
//         y: -600,
//         size: 4,
//         color: BROWN,
//         time: 10000,
//         ItemClass: ArcticWarfarePolice,
//       }),
//       new ItemGenerator({
//         ItemClass: Shotgun,
//         x: 1350,
//         y: -500,
//         size: 4,
//         color: RED,
//         time: 20000,
//       }),
//       new ItemGenerator({
//         ItemClass: Grenade,
//         x: -1200,
//         y: -900,
//         size: 8,
//         color: BLACK,
//         time: 10000,
//       }),
//       new ItemGenerator({
//         ItemClass: LandMine,
//         x: 1350,
//         y: 900,
//         size: 8,
//         color: BLACK,
//         time: 10000,
//       }),
//       new ItemGenerator({
//         ItemClass: Ak47,
//         x: -1000,
//         y: 800,
//         size: 4,
//         color: WHITE,
//         time: 25000,
//       }),
//       new ItemGenerator({
//         ItemClass: AidKit,
//         itemProps: { hp: 50, energy: 100, speed: true, size: true },
//         x: 1350,
//         y: -900,
//         size: 4,
//         color: WHITE,
//         time: 5000,
//       }),
//       new ItemGenerator({
//         ItemClass: AidKit,
//         itemProps: { hp: 50, energy: 100, speed: true, size: true },
//         x: -1350,
//         y: 900,
//         size: 4,
//         color: WHITE,
//         time: 5000,
//       }),
//     ];
//   }
//
//   setZones() {}
// }
