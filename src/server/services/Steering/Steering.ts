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
    if (weapons[0] && !shift) {
      player.selectWeapon(0);
    }
    if (weapons[1] && !shift) {
      player.selectWeapon(1);
    }
    if (weapons[2] && !shift) {
      player.selectWeapon(2);
    }
    if (weapons[3] && !shift) {
      player.selectWeapon(3);
    }
    if (weapons[4] && !shift) {
      player.selectWeapon(4);
    }
    if (weapons[5] && !shift) {
      player.selectWeapon(5);
    }
    if (weapons[6] && !shift) {
      player.selectWeapon(6);
    }
    if (weapons[7] && !shift) {
      player.selectWeapon(7);
    }
    if (weapons[8] && !shift) {
      player.selectWeapon(8);
    }
    if (weapons[9] && !shift) {
      player.selectWeapon(9);
    }
    if (weaponPressed && !shift) {
      game.emitWeaponInfo(player);
    }
  }

  performPowerChange(game, player) {
    const shift = player.keys.has('Shift');
    const powerKeys = '!@#$%^&*()';
    const powers = powerKeys.split('').map(index => player.keys.has(index));
    const powerPressed = powers.some(has => has);
    if (shift && powerPressed) {
      player.releasePower(game);
    }
    if (shift && powers[0]) {
      player.selectPower(0);
    }
    if (shift && powers[1]) {
      player.selectPower(1);
    }
    if (shift && powers[2]) {
      player.selectPower(2);
    }
    if (shift && powers[3]) {
      player.selectPower(3);
    }
    if (shift && powers[4]) {
      player.selectPower(4);
    }
    if (shift && powers[5]) {
      player.selectPower(5);
    }
    if (shift && powers[6]) {
      player.selectPower(6);
    }
    if (shift && powers[7]) {
      player.selectPower(7);
    }
    if (shift && powers[8]) {
      player.selectPower(8);
    }
    if (shift && powers[9]) {
      player.selectPower(9);
    }
    if (shift && !powerPressed) {
      player.usePower(game);
    }
    if (shift) {
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
