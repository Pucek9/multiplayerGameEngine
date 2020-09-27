import {
  BoxGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

import { PlayerModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import { LightModel } from '../../../interfaces/LightModel';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class Player extends PlayerModel implements Updatable {
  public object: Mesh;
  public objectLegs: Mesh;
  private light: LightModel;
  private screen: ScreenModel;
  private geometry: SphereGeometry;
  private geometryLegs: BoxGeometry;
  private material: MeshPhysicalMaterial;
  private legsMaterial: MeshPhysicalMaterial;
  private current: boolean;
  private initiated = false;

  setLight(light: LightModel) {
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

  setMaterial(headTexture, legsTexture) {
    this.material = new MeshPhysicalMaterial({
      map: new TextureLoader().load(headTexture),
      color: this.color,
      // @ts-ignore
      transparency: 1,
    });
    // my tu byli i pili 18.07.2020
    this.legsMaterial = new MeshPhysicalMaterial({
      map: new TextureLoader().load(legsTexture),
      color: this.color,
      // @ts-ignore
      transparency: 1,
    });
  }

  async init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      const headTexture = await this.screen.texture.getTexture(TEXTURE.HEAD);
      const legsTexture = await this.screen.texture.getTexture(TEXTURE.LEGS);
      this.setGeometry();
      this.setMaterial(headTexture, legsTexture);
      this.object = new Mesh(this.geometry, this.material);
      this.objectLegs = new Mesh(this.geometryLegs, this.legsMaterial);
      this.object.name = this.id;
      this.object.position.z = this.size;
      this.object.receiveShadow = true;
      this.objectLegs.receiveShadow = true;
      this.setAsDied();
      this.addToScene();
      this.initiated = true;
    }
  }

  isInitiated() {
    return this.initiated;
  }

  setAsCurrent() {
    this.current = true;
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
    this.current = false;
  }

  updateBody() {
    this.object.rotation.z = this.bodyDirection;
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.objectLegs.position.x = this.x;
    this.objectLegs.position.y = this.y;
    this.objectLegs.rotation.z = Math.atan2(this.direction.dy, this.direction.dx);
  }

  // update() {
  //   if (this.isOnScene() && !this.isAlive()) {
  //     this.remove();
  //     this.light?.setColor(0xff0000); //red
  //   } else if (!this.isOnScene() && this.isAlive()) {
  //     this.addToScene();
  //     this.light?.setColor(0xffffff); //white
  //   } else {
  //     this.updateBody();
  //   }
  // }

  update() {
    if (this.isInitiated()) {
      if (!(this.object.material as Material).transparent && !this.isAlive()) {
        this.setAsDied();
      } else if ((this.object.material as Material).transparent && this.isAlive()) {
        this.setAsAlive();
      }
      this.updateBody();
    }
  }

  remove() {
    this.screen.scene.remove(this.object);
  }

  setAsDied() {
    this.object.castShadow = false;
    this.objectLegs.castShadow = false;
    this.light?.setColor(0xff0000); //red
    (this.object.material as Material).transparent = true;
    (this.objectLegs.material as Material).transparent = true;
    // @ts-ignore
    (this.object.material as Material).transparency = 0.8;
    // @ts-ignore
    (this.objectLegs.material as Material).transparency = 0.8;
    // this.screen.scene.remove(this.object);
    // this.screen.scene.remove(this.objectLegs);
  }

  setAsAlive() {
    if (!this.current) {
      this.object.castShadow = true;
    }
    this.light?.setColor(0xffffff); //white
    (this.object.material as Material).transparent = false;
    (this.objectLegs.material as Material).transparent = false;
    // this.object.material.transparency = 1;
    // this.objectLegs.material.transparency = 1;
  }
}
