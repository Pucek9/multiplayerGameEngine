import { PerspectiveCamera } from 'three';

import { PlayerModel } from '../../../shared/models';

import Cursor from '../Cursor';
export default interface ICamera {
  object: PerspectiveCamera;

  init(params: { activePlayer: PlayerModel; cursor?: Cursor }): void;

  wheel(e: WheelEvent): void;

  update(any?): void;

  remove(): void;
}
