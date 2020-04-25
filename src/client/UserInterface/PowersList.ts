import { PowersApiModel } from '../../shared/apiModels';

declare const powersList: HTMLUListElement;
declare const rightDownPanel: HTMLDivElement;
declare const powersHeader: HTMLSpanElement;

export default class PowersListComponent {
  constructor() {}

  show() {
    rightDownPanel.style.display = 'block';
  }

  hide() {
    rightDownPanel.style.display = 'none';
  }

  render({ selectedPower, powers, energy }: PowersApiModel) {
    powersList.innerHTML = '';
    powersHeader.innerHTML = `Power (${Math.floor(energy)})`;
    powers.forEach((_power, index) => {
      const li = document.createElement('li');
      if (_power.id === selectedPower.id) {
        li.style.fontWeight = 'bold';
        li.appendChild(document.createTextNode(`${index + 1} ${_power.type}`));
      } else {
        li.style.fontWeight = 'normal';
        li.appendChild(document.createTextNode(`${index + 1} ${_power.type}`));
      }
      powersList.append(li);
    });
  }
}
