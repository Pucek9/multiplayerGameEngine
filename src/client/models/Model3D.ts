import { Group, Math, Mesh, MeshPhongMaterial } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../types/ScreenModel';

const loader = new FBXLoader();
const models = {
  Shotgun: { scale: 0.07, color: 'black' },
  AK47: { scale: 0.07, color: 'black' },
  Resizer: { scale: 0.06, color: 'brown' },
  Pistol: { scale: 0.03, color: 'black' },
  AidKit: { scale: 0.22 },
  Grenade: { scale: 1.5 },
};

export default class Model3D extends StaticCircularObjectModel implements IUpdatable {
  public type: string;
  protected object: Group;

  init(screen: ScreenModel) {
    const model = models[this.type];
    loader.load(require(`../games/balls/assets/${this.type}.fbx`), object => {
      this.object = object;
      this.object.rotation.x = Math.degToRad(90);
      this.object.rotation.z = Math.degToRad(90);
      this.object.scale.set(model.scale, model.scale, model.scale);
      this.object.position.y = this.y;
      this.object.position.x = this.x;
      this.object.position.z = 15;
      this.object.castShadow = true;
      this.object.receiveShadow = true;
      this.object.traverse(child => {
        if (model.color && (child as Mesh).isMesh) {
          (child as Mesh).material = new MeshPhongMaterial({
            color: model.color,
          });
        }
      });
      screen.scene.add(this.object);
    });
  }

  update() {}
}
