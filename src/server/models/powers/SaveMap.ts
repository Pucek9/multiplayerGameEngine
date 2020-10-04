import { Power } from '../../../shared/models';

import Player from '../Player';
import ClickPower from './ClickPower';

export default class SaveMap extends Power implements ClickPower {
  type = 'Save map';

  useClickPower({ owner, game }: { owner: Player; game }) {
    console.log(game.emitter, game.emitter.emitMap, owner.id, game.map);
    game.emitter.emitMap(owner.id, game.map.getSerializedMap());
  }
}
