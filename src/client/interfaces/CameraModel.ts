import { PlayerModel } from '../../shared/models';

export default interface CameraModel {
  object?;

  init(params: { activePlayer: PlayerModel; map?; renderer? }): void;

  wheel(e: WheelEvent): void;

  update(): void;

  remove(): void;

  handleResize(): void;
}
