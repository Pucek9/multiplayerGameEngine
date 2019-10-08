import Player from './Player';

export default class Bot extends Player {
  die() {
    super.die();
    this.keys.clear();
  }
}
