import { Group, Mesh, MeshPhongMaterial } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { degToRad } from '../../../../shared/helpers';
import { CommonObjectModel } from '../../../../shared/models';

import { modelsConfig } from '../../../assets/3DModels/items/models.config';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

const loader = new FBXLoader();

export default class Model3D extends CommonObjectModel implements Updatable {
  public type: string;
  protected object: Group;

  init(screen: ScreenModel) {
    const model = modelsConfig[this.type];
    loader.load(require(`../../../assets/3DModels/items/${this.type}.fbx`).default, object => {
      this.object = object;
      this.object.rotation.x = degToRad(model.rotation.x);
      this.object.rotation.z = degToRad(model.rotation.z);
      this.object.rotation.y = degToRad(model.rotation.y);
      this.object.scale.set(model.scale, model.scale, model.scale);
      this.object.position.y = this.body.y;
      this.object.position.x = this.body.x;
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
