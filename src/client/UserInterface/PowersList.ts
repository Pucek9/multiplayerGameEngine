import PlayerModel from '../../shared/models/PlayerModel';

declare var powersList: HTMLUListElement;
declare var rightDownPanel: HTMLDivElement;
declare var powersHeader: HTMLSpanElement;

export default class PowersListComponent {
  constructor() {}

  show() {
    rightDownPanel.style.display = 'block';
  }

  hide() {
    rightDownPanel.style.display = 'none';
  }

  render(player: PlayerModel) {
    if (player) {
      powersList.innerHTML = '';
      powersHeader.innerHTML = `Power (${Math.round(player.energy)})`;
      player.powers.forEach((_power, index) => {
        const li = document.createElement('li');
        if (_power.id === player.selectedPower.id) {
          li.style.fontWeight = 'bold';
          li.appendChild(document.createTextNode(`${index + 1} ${_power.type}`));
        } else {
          li.style.fontWeight = 'normal';
          li.appendChild(document.createTextNode(`${index + 1} ${_power.type}`));
        }
        // @ts-ignore
        powersList.append(li);
      });
    }
  }
}
