import {
  BoxGeometry,
  BufferGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

import { PlayerModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { Lighting } from './Light/Light';

const head = require('../../../games/balls/images/head.jpg');
const texture = new TextureLoader().load(head);

export default class Player extends PlayerModel implements Updatable {
  public object: Mesh;
  public objectLegs: Mesh;
  private light: Lighting;
  private screen: ScreenModel;
  private geometry: SphereGeometry;
  private geometryLegs: BoxGeometry;
  private material: MeshPhongMaterial;
  private initiated = false;

  setLight(light: Lighting) {
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
    this.material = new MeshPhongMaterial({
      map: texture,
      color: this.color,
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

  update() {
    if (this.isOnScene() && !this.isAlive()) {
      this.remove();
      this.light?.setColor(0xff0000);
    } else if (!this.isOnScene() && this.isAlive()) {
      this.addToScene();
      this.light?.setColor(0xffffff);
    } else {
      this.updateBody();
    }
  }

  remove() {
    this.screen.scene.remove(this.object);
    // this.screen.scene.remove(this.objectLegs);
  }
}
