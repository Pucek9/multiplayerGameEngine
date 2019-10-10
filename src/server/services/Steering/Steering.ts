export default interface Steering {
  performKeysOperation(game, player);

  performSteering(game, player);

  performWeaponChange(game, player);

  performPowerChange(game, player);

  performOtherKeys(game, player);
}
