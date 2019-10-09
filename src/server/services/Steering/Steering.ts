export default interface Steering {
  performKeysOperation(game, player);

  goLeft(player);

  goRight(player);

  goUp(player);

  goDown(player);

  performSteering(game, player);

  performWeaponChange(game, player);

  performPowerChange(game, player);

  performOtherKeys(game, player);
}
