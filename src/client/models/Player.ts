import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import { BufferGeometry, Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

const cumin = require('../games/balls/images/head.jpg');
const texture = new TextureLoader().load(cumin);

export default class Player extends PlayerModel implements IRenderable {
  public object;
  private initiated = false;
  private screen;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 1);
  }

  updateObjectGeometry() {
    this.setGeometry();
    this.object.geometry = new BufferGeometry().fromGeometry(this.geometry);
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
      this.object = new Mesh( this.geometry,  this.material);
      this.object.name = this.id;
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
  }

  setAsEnemy() {
    this.object.castShadow = true;
  }

  updateBody() {
    this.object.rotation.z = this.direction;
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }

  render() {
    if (this.isOnScene() && !this.isAlive()) {
      this.remove();
    } else if (!this.isOnScene() && this.isAlive()) {
      this.addToScene();
    } else {
      this.updateBody();
    }
  }

  remove() {
    this.screen.scene.remove(this.object);
  }
}
