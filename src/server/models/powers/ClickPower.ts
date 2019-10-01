import Player from '../Player';
import Power from '../../../shared/models/Power';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export default abstract class ClickPower extends Power {
  abstract use({ owner, game, mouseClick }: { owner: Player; game; mouseClick: MouseCoordinates });
}
