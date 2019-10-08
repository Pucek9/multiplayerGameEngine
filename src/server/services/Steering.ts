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
          dx: 0,
          dy: player.speed,
        })
      ) {
        player.goDown();
      }
    }
    if (s) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          dx: 0,
          dy: -player.speed,
        })
      ) {
        player.goUp();
      }
    }
    if (a) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          dx: -player.speed,
          dy: 0,
        })
      ) {
        player.goLeft();
      }
    }
    if (d) {
      if (
        !player.isAlive() ||
        !game.detectPlayerCollision(player, {
          dx: player.speed,
          dy: 0,
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
    if (weapon6 && !shift) {
      player.selectWeapon(5);
    }
    if (weapon7 && !shift) {
      player.selectWeapon(6);
    }
    if (weapon8 && !shift) {
      player.selectWeapon(7);
    }
    if (weapon9 && !shift) {
      player.selectWeapon(8);
    }
    if (weapon10 && !shift) {
      player.selectWeapon(9);
    }
    if (weaponPressed && !shift) {
      game.emitWeaponInfo(player);
    }
  }

  performPowerChange(game, player) {
    const shift = player.keys.has('Shift');
    const [power1, power2, power3, power4, power5, power6, power7, power8, power9, power10] = [
      player.keys.has('!'),
      player.keys.has('@'),
      player.keys.has('#'),
      player.keys.has('$'),
      player.keys.has('%'),
      player.keys.has('^'),
      player.keys.has('&'),
      player.keys.has('*'),
      player.keys.has('('),
      player.keys.has(')'),
    ];
    const powerPressed = [power1, power2, power3, power4, power5].some(has => has);
    if (shift && powerPressed) {
      player.releasePower(game);
    }
    if (shift && power1) {
      player.selectPower(0);
    }
    if (shift && power2) {
      player.selectPower(1);
    }
    if (shift && power3) {
      player.selectPower(2);
    }
    if (shift && power4) {
      player.selectPower(3);
    }
    if (shift && power5) {
      player.selectPower(5);
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
    if (player.keys.has('L')) {
      console.log('log', game.players);
    }
    if (player.keys.has('Escape')) {
      game.disconnectPlayer(player);
    }
  }
}
