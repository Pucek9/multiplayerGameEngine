import Player from '../Player';

export default interface ClickPower {
  useClickPower({ owner, game }: { owner: Player; game });
}
