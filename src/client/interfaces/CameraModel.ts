import { PlayerModel } from '../../shared/models';

import Cursor from './CursorModel';
export default interface CameraModel {
  object?;

  init(params: { activePlayer: PlayerModel; cursor?: Cursor; map? }): void;

  wheel(e: WheelEvent): void;

  update(): void;

  remove(): void;

  handleResize(): void;
}
