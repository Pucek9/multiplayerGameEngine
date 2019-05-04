import BulletModel from '../../shared/models/BulletModel';
import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import { Mesh, MeshBasicMaterial, SphereGeometry, BufferGeometry } from 'three';

export default class Bullet extends BulletModel implements IRenderable {
  public screen: ScreenModel;
  private object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshBasicMaterial;

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 3);
  }

  setMaterial() {
    this.material = new MeshBasicMaterial({ color: this.color });
  }

  updateObjectGeometry() {
    this.setGeometry();
    this.object.geometry = new BufferGeometry().fromGeometry(this.geometry);
  }

  init(screen: ScreenModel) {
    this.setGeometry();
    this.setMaterial();
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.z = 10;
    screen.scene.add(this.object);
  }

  remove(screen: ScreenModel) {
    screen.scene.remove(this.object);
  }

  render() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }
}
