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
    const weaponKeys = '1234567890';
    const weapons = weaponKeys.split('').map(index => player.keys.has(index));
    const weaponPressed = weapons.some(has => has);
    if (!shift && weaponPressed) {
      for (let index = 0; index < weapons.length; index++) {
        if (weapons[index]) {
          player.selectWeapon(index);
          break;
        }
      }
      game.emitWeaponInfo(player);
    }
  }

  performPowerChange(game, player) {
    const shift = player.keys.has('Shift');
    const powerKeys = '!@#$%^&*()';
    const powers = powerKeys.split('').map(index => player.keys.has(index));
    const powerPressed = powers.some(has => has);
    if (shift) {
      if (powerPressed) {
        player.releasePower(game);
        for (let index = 0; index < powers.length; index++) {
          if (powers[index]) {
            player.selectPower(index);
            break;
          }
        }
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
  }
}
