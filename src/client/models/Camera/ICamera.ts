import { Camera } from 'three';
import PlayerModel from '../../../shared/models/PlayerModel';
import Cursor from '../Cursor';

export default interface ICamera {
  object: Camera ;

  init(params: { activePlayer: PlayerModel; cursor?: Cursor }): void;

  wheel(e: WheelEvent): void;

  update(any?): void;

  remove(): void;
}
