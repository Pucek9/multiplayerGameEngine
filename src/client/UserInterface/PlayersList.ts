import IRenderable from '../interfaces/IRenderable';

declare var playersList: HTMLUListElement;

export default class PlayerListComponent implements IRenderable {
  constructor() {}

  render(players: any[]) {
    playersList.innerHTML = '';
    players.forEach(_player => {
      const li = document.createElement('li');
      li.style.color = _player.color;
      li.appendChild(document.createTextNode(`${_player.name}: ${_player.hp}hp Score:${_player.score}`));
      // @ts-ignore
      playersList.append(li);
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
