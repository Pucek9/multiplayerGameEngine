export default class SteeringService {
  performKeysOperation(game, player) {
    this.performSteering(game, player);
    this.performWeaponChange(game, player);
    this.performPowerChange(game, player);
    this.performOtherKeys(game, player);
  }

  performSteering(game, player) {
    const w = player.keys.has('W') || player.keys.has('ArrowUp');
    const s = player.keys.has('S') || player.keys.has('ArrowDown');
    const a = player.keys.has('A') || player.keys.has('ArrowLeft');
    const d = player.keys.has('D') || player.keys.has('ArrowRight');

    if (w) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          x: 0,
          y: player.speed,
        })
      ) {
        player.goDown();
      }
    }
    if (s) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          x: 0,
          y: -player.speed,
        })
      ) {
        player.goUp();
      }
    }
    if (a) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          x: -player.speed,
          y: 0,
        })
      ) {
        player.goLeft();
      }
    }
    if (d) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          x: player.speed,
          y: 0,
        })
      ) {
        player.goRight();
      }
    }
  }

  performWeaponChange(game, player) {
    const shift = player.keys.has('Shift');
    const [
      weapon1,
      weapon2,
      weapon3,
      weapon4,
      weapon5,
      weapon6,
      weapon7,
      weapon8,
      weapon9,
      weapon10,
    ] = [
      player.keys.has('1'),
      player.keys.has('2'),
      player.keys.has('3'),
      player.keys.has('4'),
      player.keys.has('5'),
      player.keys.has('6'),
      player.keys.has('7'),
      player.keys.has('8'),
      player.keys.has('9'),
      player.keys.has('0'),
    ];
    const weaponPressed = [weapon1, weapon2, weapon3, weapon4, weapon5].some(has => has);
    if (weapon1 && !shift) {
      player.selectWeapon(0);
    }
    if (weapon2 && !shift) {
      player.selectWeapon(1);
    }
    if (weapon3 && !shift) {
      player.selectWeapon(2);
    }
    if (weapon4 && !shift) {
      player.selectWeapon(3);
    }
    if (weapon5 && !shift) {
      player.selectWeapon(4);
    }
    if (weaponPressed && !shift) {
      game.emitWeaponInfo(player);
    }
  }

  performPowerChange(game, player) {
    const shift = player.keys.has('Shift');

    if (shift && player.keys.has('!')) {
      player.selectPower(0);
    }
    if (shift && player.keys.has('@')) {
      player.selectPower(1);
    }
    if (shift && player.keys.has('#')) {
      player.selectPower(2);
    }
    if (shift && player.keys.has('$')) {
      player.selectPower(3);
    }
    if (shift) {
      player.usePower(game);
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
