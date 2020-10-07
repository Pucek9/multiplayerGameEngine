import Player from '../../models/Player';

export default abstract class Steering {
  performKeysOperation(game, player: Player) {
    this.performSteering(game, player);
    this.performWeaponChange(game, player);
    this.performPowerChange(game, player);
    this.performOtherKeys(game, player);
  }

  abstract performSteering(game, player);

  performWeaponChange(game, player) {
    const shift = player.keys.has('Shift');
    const weaponKeys = '1234567890'.split('');
    const weapons = weaponKeys.map(index => player.keys.has(index));
    const weaponPressed = weapons.some(has => has);
    if (!shift && weaponPressed) {
      player.selectWeapon(weapons.findIndex(Boolean));
      game.emitWeaponInfo(player);
    }
  }

  performPowerChange(game, player) {
    const shift = player.keys.has('Shift');
    const powerKeys = '1234567890'.split('');
    const powers = powerKeys.map(index => player.keys.has(index));
    const powerPressed = powers.some(has => has);
    if (shift) {
      if (powerPressed) {
        player.releasePower(game);
        player.selectPower(powers.findIndex(Boolean));
      } else {
        player.usePower(game);
      }
      game.emitPowerInfo(player);
    } else {
      player.releasePower(game);
    }
  }

  performOtherKeys(game, player) {
    if (player.keys.has('Escape')) {
      game.disconnectPlayer(player);
    }

    // if (player.keys.has('N')) {
    //   player.speed = 10;
    //   player.setSteering();
    //   player.setCursor();
    // }
    //
    // if (player.keys.has('M')) {
    //   player.speed = player.baseSpeed;
    //   player.removeSteering();
    //   player.removeCursor();
    // }
  }
}
