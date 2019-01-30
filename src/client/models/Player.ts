import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';
import { ScreenModel } from '../types/ScreenModel';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

const cumin = require('../games/balls/images/head.jpg');
const texture = new TextureLoader().load(cumin);

export default class Player extends PlayerModel implements IRenderable {
  public object: Mesh;
  private initiated: boolean = false;

  init(screen: ScreenModel) {
    if (!this.isInitiated()) {
      const geometry = new SphereGeometry(20, 10, 10, 1);
      const material = new MeshPhongMaterial({
        map: texture,
        color: this.color,
      });
      this.object = new Mesh(geometry, material);
      this.object.receiveShadow = true;
      screen.scene.add(this.object);
      this.initiated = true;
    }
  }

  isInitiated(): boolean {
    return this.initiated;
  }

  setAsActive() {
    this.object.castShadow = false;
  }

  setAsEnemy() {
    this.object.castShadow = true;
  }

  renderBody() {
    this.object.rotation.z = this.direction;
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }

  render() {
    this.renderBody();
  }

  remove(screen: ScreenModel) {
    screen.scene.remove(this.object);
  }
}
