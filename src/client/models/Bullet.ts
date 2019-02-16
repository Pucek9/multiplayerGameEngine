import BulletModel from '../../shared/models/BulletModel';
import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';
import { ScreenModel } from '../types/ScreenModel';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

export default class Bullet extends BulletModel implements IRenderable {
  public screen: ScreenModel;
  private object: Mesh;

  init(screen: ScreenModel) {
    const geometry = new SphereGeometry(this.size, 10, 10, 3);
    const material = new MeshBasicMaterial({ color: 'black' });
    this.object = new Mesh(geometry, material);

    this.object.position.z = 10;
    screen.scene.add(this.object);
  }

  remove(screen: ScreenModel) {
    screen.scene.remove(this.object);
  }

  render(activePlayer: PlayerModel) {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }
}
