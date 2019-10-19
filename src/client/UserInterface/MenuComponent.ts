import { Unsubscribe } from 'redux';
import GameInstance from '../../shared/apiModels/GameInstance';
import { gamesService, optionsService, store, userService } from '../store/store';
import { times } from '../../shared/helpers';

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var gameLightInput: HTMLSelectElement;
declare var cameraInput: HTMLSelectElement;
declare var steeringInput: HTMLSelectElement;
declare var cursorInput: HTMLSelectElement;
declare var botsCountInput: HTMLInputElement;
declare var teamsCountInput: HTMLInputElement;
declare var teams: HTMLDivElement;
declare var teamsList: HTMLDivElement;
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
  listeners = [];

  constructor(main) {
    this.unsubscribeRender = store.subscribe(() => this.render());

    createButton.addEventListener('click', () => {
      main.onAddNewGame(gamesService.getState());
      gameNameInput.value = '';
    });

    joinGameButton.addEventListener('click', () => {
      menu.style.display = 'none';
      main.onJoinGame();
    });

    gameNameInput.addEventListener('keyup', () => {
      gamesService.setGameName(gameNameInput.value);
    });

    gameTypeInput.addEventListener('change', () => {
      gamesService.setGameType(gameTypeInput.value);
      if (gameTypeInput.value === 'Free4all') {
        this.hideTeamsSection();
        this.clearTeamsInputsList();
        gamesService.disableTeams();
      } else {
        gamesService.enableTeams();
        this.showTeamsSection();
        this.prepareTeamSection();
      }
    });

    gameLightInput.addEventListener('change', () => {
      gamesService.setLight(gameLightInput.value);
    });

    cameraInput.addEventListener('change', () => {
      gamesService.setCamera(cameraInput.value);
    });

    steeringInput.addEventListener('change', () => {
      gamesService.setSteering(steeringInput.value);
    });

    cursorInput.addEventListener('change', () => {
      gamesService.setCursor(cursorInput.value);
    });

    gameMapInput.addEventListener('change', () => {
      gamesService.setGameMap(gameMapInput.value);
    });

    botsCountInput.addEventListener('change', () => {
      if (botsCountInput.value == '') {
        botsCountInput.value = '0';
      }
      gamesService.setBotsCount(parseInt(botsCountInput.value));
    });

    teamsCountInput.addEventListener('change', () => {
      this.prepareTeamSection();
    });

    nickInput.addEventListener('keyup', () => {
      userService.setNick(nickInput.value);
    });

    blinkingCheckbox.addEventListener('change', () => {
      optionsService.setBlinking(blinkingCheckbox.checked);
    });
    bulletShadowCheckbox.addEventListener('change', () => {
      optionsService.setBulletShadow(bulletShadowCheckbox.checked);
    });
  }

  prepareTeamSection() {
    if (teamsCountInput.value == '') {
      teamsCountInput.value = '2';
    }
    const value = parseInt(teamsCountInput.value);
    // gamesService.clearTeamsList();
    gamesService.setTeamsCount(value);
    this.prepareTeamsInputsList(value);
  }

  clearTeamsInputsList() {
    teamsList.childNodes.forEach((input, index) =>
      input.removeEventListener('keyup', this.listeners[index]),
    );
    this.listeners = [];
    teamsList.innerHTML = '';
  }

  prepareTeamsInputsList(count: number) {
    this.clearTeamsInputsList();
    times(count, index => {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('data-event', 'text');
      const listeners = this.listeners;
      input.addEventListener('keyup', function inputListener() {
        gamesService.setTeamName(index, input.value);
        listeners.push(inputListener);
      });
      teamsList.appendChild(input);
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

  closePopup() {
    location.hash = '';
  }

  togglePopup(e: KeyboardEvent, key: string, popupId: string) {
    if (e.key === key) {
      location.hash = location.hash === popupId ? '' : popupId;
    }
  }

  requestFullscreen(e: KeyboardEvent, key: string) {
    if (e.key === key) {
      document.body.requestFullscreen();
    }
  }

  showTeamsSection() {
    teams.style.display = 'block';
  }

  hideTeamsSection() {
    teams.style.display = 'none';
  }

  show() {
    menu.style.display = 'block';
  }

  hide() {
    menu.style.display = 'none';
    this.unsubscribeRender();
  }
}
