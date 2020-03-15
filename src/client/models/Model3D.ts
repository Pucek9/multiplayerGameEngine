import { Group, Mesh, MeshPhongMaterial } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../interfaces/ScreenModel';
import { degToRad } from "../../shared/helpers";

const loader = new FBXLoader();
const models = {
  Shotgun: { scale: 0.07, color: 'black', rotation: { x: 90, z: 90, y: 0 } },
  AK47: { scale: 0.07, color: 'black', rotation: { x: 90, z: 90, y: 0 } },
  Resizer: { scale: 0.06, color: 'brown', rotation: { x: 90, z: 90, y: 0 } },
  Pistol: { scale: 0.03, color: 'black', rotation: { x: 90, z: 90, y: 0 } },
  AidKit: { scale: 0.22, rotation: { x: 90, z: 90, y: 0 } },
  Grenade: { scale: 1.5, rotation: { x: 90, z: 90, y: 0 } },
  LandMine: { scale: 80, rotation: { x: 90, z: 0, y: 0 } },
};

export default class Model3D extends StaticCircularObjectModel implements IUpdatable {
  public type: string;
  protected object: Group;

  init(screen: ScreenModel) {
    const model = models[this.type];
    loader.load(require(`../games/balls/assets/${this.type}.fbx`), object => {
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
