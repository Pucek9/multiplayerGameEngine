declare var leftPanel: HTMLDivElement;
declare var playersList: HTMLUListElement;

export default class PlayerListComponent {
  constructor() {}

  show() {
    leftPanel.style.display = 'block';
  }

  hide() {
    leftPanel.style.display = 'none';
  }

  update(players: any[]) {
    playersList.innerHTML = '';
    players.forEach(_player => {
      const li = document.createElement('li');
      li.style.color = _player.color;
      li.appendChild(
        document.createTextNode(
          `${_player.name}: ${_player.hp}hp Kills:${_player.kills} Deaths:${_player.deaths}`,
        ),
      );
      // @ts-ignore
      playersList.append(li);
    });
  }
}
