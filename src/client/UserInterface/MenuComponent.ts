import { Unsubscribe } from 'redux';
import GameInstance from '../../shared/apiModels/GameInstance';
import { store, gamesService, userService, optionsService } from '../store/store';

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var botsCountInput: HTMLInputElement;
declare var createButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var blinkingCheckbox: HTMLInputElement;
declare var bulletShadowCheckbox: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;
declare var menu: HTMLDivElement;
declare var validateGameName: HTMLLabelElement;
declare var validateGameNameDuplicate: HTMLLabelElement;
declare var validateNick: HTMLLabelElement;
declare var validateSelectedGame: HTMLLabelElement;

export default class MenuComponent {
  unsubscribeRender: Unsubscribe;

  constructor(main) {
    this.unsubscribeRender = store.subscribe(() => this.render());

    createButton.addEventListener('click', function() {
      const { roomName, type, map, bots } = gamesService.getState();
      main.onAddNewGame({ roomName, type, map, bots });
      gameNameInput.value = '';
    });

    joinGameButton.addEventListener('click', function() {
      menu.style.display = 'none';
      main.onJoinGame();
    });

    gameNameInput.addEventListener('keyup', function() {
      gamesService.setGameName(gameNameInput.value);
    });

    gameTypeInput.addEventListener('change', function() {
      gamesService.setGameType(gameTypeInput.value);
    });

    gameMapInput.addEventListener('change', function() {
      gamesService.setGameMap(gameMapInput.value);
    });

    botsCountInput.addEventListener('change', function() {
      if (botsCountInput.value == '') {
        botsCountInput.value = '0';
      }
      gamesService.setBotsCount(parseInt(botsCountInput.value));
    });

    nickInput.addEventListener('keyup', function() {
      userService.setNick(nickInput.value);
    });

    blinkingCheckbox.addEventListener('change', function() {
      optionsService.setBlinking(blinkingCheckbox.checked);
    });
    bulletShadowCheckbox.addEventListener('change', function() {
      optionsService.setBulletShadow(bulletShadowCheckbox.checked);
    });
  }

  renderTable(user, games) {
    games.list.forEach((game: GameInstance) => {
      const roomName = document.createElement('td');
      roomName.appendChild(document.createTextNode(game.roomName));
      const type = document.createElement('td');
      type.appendChild(document.createTextNode(game.type));
      const map = document.createElement('td');
      map.appendChild(document.createTextNode(game.map));
      const count = document.createElement('td');
      count.appendChild(document.createTextNode(game.count.toString()));
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        userService.chooseGame(game.roomName);
      });
      if (user.chosenGame === game.roomName) {
        row.classList.add('active');
      }
      // @ts-ignore
      row.append(roomName, type, map, count);
      // @ts-ignore
      gamesListTable.append(row);
    });
  }

  render() {
    gamesListTable.innerHTML = '';
    const user = userService.getState();
    const games = gamesService.getState();
    this.renderTable(user, games);
    const nickEmpty = user.nick === '';
    const chosenGameEmpty = user.chosenGame === null;
    const idEmpty = user.id === null;
    const roomNameEmpty = games.roomName === '';
    const roomNameDuplicate = Boolean(games.list.find(game => game.roomName === games.roomName));
    const typeEmpty = games.type === null;
    const mapEmpty = games.map === null;

    joinGameButton.disabled = nickEmpty || chosenGameEmpty || idEmpty;
    createButton.disabled = roomNameEmpty || typeEmpty || mapEmpty || roomNameDuplicate;

    validateNick.style.display = nickEmpty ? 'block' : 'none';
    validateSelectedGame.style.display = chosenGameEmpty ? 'block' : 'none';
    validateGameName.style.display = roomNameEmpty ? 'block' : 'none';
    validateGameNameDuplicate.style.display = roomNameDuplicate ? 'block' : 'none';
  }

  show() {
    menu.style.display = 'block';
  }

  hide() {
    menu.style.display = 'none';
    this.unsubscribeRender();
  }
}
