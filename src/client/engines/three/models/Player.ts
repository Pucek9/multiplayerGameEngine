import {
  BoxGeometry,
  BufferGeometry,
  Mesh,
  MeshPhysicalMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

import { PlayerModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { BaseLight } from './Light/BaseLight';

const head = require('../../../games/balls/images/head.jpg');
const texture = new TextureLoader().load(head);

export default class Player extends PlayerModel implements Updatable {
  public object: Mesh;
  public objectLegs: Mesh;
  private light: BaseLight;
  private screen: ScreenModel;
  private geometry: SphereGeometry;
  private geometryLegs: BoxGeometry;
  private material: MeshPhysicalMaterial;
  private initiated = false;

  setLight(light: BaseLight) {
    this.light = light;
  }

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 1);
    this.geometryLegs = new BoxGeometry(this.size, this.size * 2, this.size);
  }

  updateObjectGeometry() {
    this.setGeometry();
    this.object.geometry = new BufferGeometry().fromGeometry(this.geometry);
    this.objectLegs.geometry = new BufferGeometry().fromGeometry(this.geometryLegs);
  }

  setMaterial() {
    this.material = new MeshPhysicalMaterial({
      map: texture,
      color: this.color,
      transparency: 1,
    });
  }

  init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      this.setGeometry();
      this.setMaterial();
      this.object = new Mesh(this.geometry, this.material);
      this.objectLegs = new Mesh(this.geometryLegs, this.material);
      this.object.name = this.id;
      this.object.position.z = this.size;
      this.object.receiveShadow = true;
      this.setAsDied();
      this.addToScene();
      this.initiated = true;
    }
  }

  isInitiated() {
    return this.initiated;
  }

  setAsCurrent() {
    this.object.castShadow = false;
  }

  isOnScene() {
    return this.screen.scene.children.includes(this.object);
  }

  isAlive() {
    return this.alive;
  }

  addToScene() {
    this.screen.scene.add(this.object);
    this.screen.scene.add(this.objectLegs);
  }

  setAsEnemy() {
    this.object.castShadow = true;
  }

  updateBody() {
    this.object.rotation.z = this.bodyDirection;
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.objectLegs.position.x = this.x;
    this.objectLegs.position.y = this.y;
    this.objectLegs.rotation.z = Math.atan2(this.direction.dy, this.direction.dx);
  }

  // update() {
  //   if (this.isOnScene() && !this.isAlive()) {
  //     this.remove();
  //     this.light?.setColor(0xff0000); //red
  //   } else if (!this.isOnScene() && this.isAlive()) {
  //     this.addToScene();
  //     this.light?.setColor(0xffffff); //white
  //   } else {
  //     this.updateBody();
  //   }
  // }

  update() {
    if (this.isInitiated()) {
      if (!this.object.material.transparent && !this.isAlive()) {
        this.setAsDied();
      } else if (this.object.material.transparent && this.isAlive()) {
        this.setAsAlive();
      }
      this.updateBody();
    }
  }

  remove() {
    this.screen.scene.remove(this.object);
  }

  setAsDied() {
    this.light?.setColor(0xff0000); //red
    this.object.material.transparent = true;
    this.objectLegs.material.transparent = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.object.material.transparency = 0.8;
    this.objectLegs.material.transparency = 0.8;
    // this.screen.scene.remove(this.object);
    // this.screen.scene.remove(this.objectLegs);
  }

  setAsAlive() {
    this.light?.setColor(0xffffff); //white
    this.object.material.transparent = false;
    this.objectLegs.material.transparent = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // this.object.material.transparency = 1;
    // this.objectLegs.material.transparency = 1;
  }
}
