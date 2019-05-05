import IRenderable from '../interfaces/IRenderable';

declare var leftPanel: HTMLDivElement;
declare var playersList: HTMLUListElement;

export default class PlayerListComponent implements IRenderable {
  constructor() {}

  show() {
    leftPanel.style.display = 'block';
  }

  hide() {
    leftPanel.style.display = 'none';
  }

  render(players: any[]) {
    playersList.innerHTML = '';
    players.forEach(_player => {
      const li = document.createElement('li');
      li.style.color = _player.color;
      li.appendChild(
        document.createTextNode(`${_player.name}: ${_player.hp}hp Score:${_player.score}`),
      );
      // @ts-ignore
      playersList.append(li);
    });
  }
}
