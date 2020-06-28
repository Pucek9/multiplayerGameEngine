import { PerspectiveCamera, Vector3 } from 'three';

import { PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';
import Updatable from '../../../../interfaces/Updatable';

export default class BaseCamera implements Updatable, CameraModel {
  public object: PerspectiveCamera;
  protected observedObject: { x: number; y: number; z?: number };

  constructor() {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    this.object.up = new Vector3(0, 0, 1);
    this.object.position.z = 1000;
  }

  init({ observedObject }: { observedObject: PlayerModel }) {
    this.observedObject = observedObject;
  }

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      this.object.position.z += 10;
    } else {
      this.object.position.z -= 10;
    }
  }

  update() {}

  remove() {
    this.object.remove();
  }

  handleResize() {
    this.object.aspect = window.innerWidth / window.innerHeight;
    this.object.updateProjectionMatrix();
  }
}
