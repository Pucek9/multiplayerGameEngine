import { MapModel, PlayerModel } from '../../../../shared/models';

import CameraModel from '../../../interfaces/CameraModel';
import Cursor from '../../../interfaces/CursorModel';

class Rectangle {
  right: number;
  bottom: number;

  constructor(public left = 0, public top = 0, public width = 0, public height = 0) {
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  set(left, top, width?, height?) {
    this.left = left;
    this.top = top;
    this.width = width ?? this.width;
    this.height = height ?? this.height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  within(r) {
    return (
      r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom
    );
  }

  overlaps(r) {
    return this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom;
  }
}

// add "class" Rectangle to our Game object

// possibles axis to move the camera
const AXIS = {
  NONE: 1,
  HORIZONTAL: 2,
  VERTICAL: 3,
  BOTH: 4,
};

// Camera constructor
export class Camera2D implements CameraModel {
  // position of camera (left-top coordinate)
  public x = 0;
  public y = 0;
  public wView;
  public hView;
  // distance from followed object to border before camera starts move
  xDeadZone = 0; // min distance to horizontal borders
  yDeadZone = 0; // min distance to vertical borders

  // viewport dimensions

  // allow camera to move in vertical and horizontal axis
  axis = AXIS.BOTH;

  // object that should be followed
  followed = null;
  viewportRect: Rectangle;
  worldRect: Rectangle;
  // gameObject needs to have "x" and "y" properties (as world(or room) position)
  map;
  activePlayer;
  // init({ xView, yView, wView, hView, worldWidth, worldHeight }) {
  init({ activePlayer, map }: { activePlayer: PlayerModel; map: MapModel }) {
    this.activePlayer = activePlayer;
    this.map = map;
    this.x = activePlayer.x;
    this.y = activePlayer.y;
    // this.wView = activePlayer.size;
    // this.hView = activePlayer.size;
    // this.viewportRect = new Rectangle(this.x, this.y, this.wView, this.hView);
    //
    // // rectangle that represents the world's boundary (room's boundary)
    // this.worldRect = new Rectangle(0, 0, map.width, map.height);
    // this.follow(activePlayer, map.width, map.height);
  }
  //
  // follow(gameObject, xDeadZone, yDeadZone) {
  //   this.followed = gameObject;
  //   this.xDeadZone = xDeadZone;
  //   this.yDeadZone = yDeadZone;
  // }

  update() {
    this.x = this.activePlayer.x;
    this.y = this.activePlayer.y;
    // keep following the player (or other desired object)
    // if (this.followed != null) {
    //   if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
    //     // moves camera on horizontal axis based on followed object position
    //     if (this.followed.x - this.x + this.xDeadZone > this.wView)
    //       this.x = this.followed.x - (this.wView - this.xDeadZone);
    //     else if (this.followed.x - this.xDeadZone < this.x)
    //       this.x = this.followed.x - this.xDeadZone;
    //   }
    //   if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
    //     // moves camera on vertical axis based on followed object position
    //     if (this.followed.y - this.y + this.yDeadZone > this.hView)
    //       this.y = this.followed.y - (this.hView - this.yDeadZone);
    //     else if (this.followed.y - this.yDeadZone < this.y)
    //       this.y = this.followed.y - this.yDeadZone;
    //   }
    // }
    //
    // // update viewportRect
    // this.viewportRect.set(this.x, this.y);
    //
    // // don't let camera leaves the world's boundary
    // if (!this.viewportRect.within(this.worldRect)) {
    //   if (this.viewportRect.left < this.worldRect.left) this.x = this.worldRect.left;
    //   if (this.viewportRect.top < this.worldRect.top) this.y = this.worldRect.top;
    //   if (this.viewportRect.right > this.worldRect.right)
    //     this.x = this.worldRect.right - this.wView;
    //   if (this.viewportRect.bottom > this.worldRect.bottom)
    //     this.y = this.worldRect.bottom - this.hView;
    // }
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
