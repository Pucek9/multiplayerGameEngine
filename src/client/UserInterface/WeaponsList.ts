import { WeaponsApiModel } from '../../shared/apiModels';

declare var weaponsList: HTMLUListElement;
declare var leftDownPanel: HTMLDivElement;

export default class WeaponsListComponent {
  constructor() {}

  show() {
    leftDownPanel.style.display = 'block';
  }

  hide() {
    leftDownPanel.style.display = 'none';
  }

  render({ selectedWeapon, weapons }: WeaponsApiModel) {
    weaponsList.innerHTML = '';
    weapons?.forEach((weapon, index) => {
      const li = document.createElement('li');
      if (weapon.id === selectedWeapon.id) {
        li.style.fontWeight = 'bold';
        li.appendChild(
          document.createTextNode(
            `${index + 1} ${selectedWeapon.type}${
              selectedWeapon.magazines !== null
                ? `: ${selectedWeapon.bulletsInMagazine}/${selectedWeapon.maxBulletsInMagazine} | ${selectedWeapon.magazines}`
                : ``
            }`,
          ),
        );
      } else {
        li.style.fontWeight = 'normal';
        li.appendChild(document.createTextNode(`${index + 1} ${weapon.type}`));
      }
      weaponsList.append(li);
    });
  }
}
