import { Group, Mesh, MeshPhongMaterial } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import {
  AID_KIT,
  AK47,
  AWP,
  BLACK,
  BROWN,
  GRENADE,
  LAND_MINE,
  PISTOL,
  RESIZER,
  SHOTGUN,
} from '../../../../shared/constants';
import { degToRad } from '../../../../shared/helpers';
import { StaticCircularObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

const loader = new FBXLoader();
const models = {
  [SHOTGUN]: { scale: 0.07, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AK47]: { scale: 0.07, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AWP]: { scale: 0.7, color: BLACK, rotation: { x: 90, z: 90, y: 90 } },
  [RESIZER]: { scale: 0.06, color: BROWN, rotation: { x: 90, z: 90, y: 0 } },
  [PISTOL]: { scale: 0.03, color: BLACK, rotation: { x: 90, z: 90, y: 0 } },
  [AID_KIT]: { scale: 0.22, rotation: { x: 90, z: 90, y: 0 } },
  [GRENADE]: { scale: 1.5, rotation: { x: 90, z: 90, y: 0 } },
  [LAND_MINE]: { scale: 80, rotation: { x: 90, z: 0, y: 0 } },
};

export default class Model3D extends StaticCircularObjectModel implements Updatable {
  public type: string;
  protected object: Group;

  init(screen: ScreenModel) {
    const model = models[this.type];
    loader.load(require(`../../../assets/3DModels/items/${this.type}.fbx`), object => {
      this.object = object;
      this.object.rotation.x = degToRad(model.rotation.x);
      this.object.rotation.z = degToRad(model.rotation.z);
      this.object.rotation.y = degToRad(model.rotation.y);
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
