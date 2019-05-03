import IRenderable from '../interfaces/IRenderable';

declare var weaponsList: HTMLUListElement;

export default class WeaponListComponent implements IRenderable {
  constructor() {}

  render({ selectedWeapon, weapons }) {
    weaponsList.innerHTML = '';
    weapons.forEach((_weapon, index) => {
      const li = document.createElement('li');
      if (_weapon.id === selectedWeapon.id) {
        li.style.fontWeight = 'bold';
        li.appendChild(
          document.createTextNode(
            `${index + 1} ${_weapon.type}: ${selectedWeapon.bulletsInMagazine}/${
              selectedWeapon.maxBulletsInMagazine
            } | ${selectedWeapon.magazines}`,
          ),
        );
      } else {
        li.style.fontWeight = 'normal';
        li.appendChild(document.createTextNode(`${index + 1} ${_weapon.type}`));
      }
      // @ts-ignore
      weaponsList.append(li);
    });

    // this.screen.ctx.font = '10pt Arial';
    // this.screen.ctx.lineWidth = 1;
    // this.screen.ctx.fillStyle = 'black';
    // this.screen.ctx.textAlign = 'left';
    // this.screen.ctx.fillText(
    //     'Active players:',
    //     10,
    //     15
    // );
    // players.forEach((_player, i) => {
    //     this.screen.ctx.fillStyle = _player.color;
    //     this.screen.ctx.fillText(
    //         `${_player.name}: ${_player.score}`,
    //         10,
    //         30 + i * 15
    //     );
    // });
  }
}
