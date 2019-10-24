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

  render({ selectedWeapon, weapons }) {
    weaponsList.innerHTML = '';
    weapons?.forEach((_weapon, index) => {
        const li = document.createElement('li');
        if (_weapon.id === selectedWeapon.id) {
          li.style.fontWeight = 'bold';
          li.appendChild(
            document.createTextNode(
              `${index + 1} ${_weapon.type}${
                selectedWeapon.magazines !== null
                  ? `: ${selectedWeapon.bulletsInMagazine}/${selectedWeapon.maxBulletsInMagazine} | ${selectedWeapon.magazines}`
                  : ``
              }`,
            ),
          );
        } else {
          li.style.fontWeight = 'normal';
          li.appendChild(document.createTextNode(`${index + 1} ${_weapon.type}`));
        }
        // @ts-ignore
        weaponsList.append(li);
      });
  }
}
