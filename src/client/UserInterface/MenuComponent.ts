import { Unsubscribe } from 'redux';

import { GameInstance } from '../../shared/apiModels';
import { FREE4ALL } from '../../shared/constants';
import { times } from '../../shared/helpers';

import { GamesListState } from '../store/gamesList/state';
import {
  createGamesService,
  gamesListService,
  optionsService,
  store,
  userService,
} from '../store/store';
import { UserState } from '../store/user/state';

declare const gameNameInput: HTMLInputElement;
declare const gameTypeInput: HTMLSelectElement;
declare const gameMapInput: HTMLSelectElement;
declare const gameLightInput: HTMLSelectElement;
declare const renderEngineInput: HTMLSelectElement;
declare const texturesInput: HTMLSelectElement;
declare const cameraInput: HTMLSelectElement;
declare const steeringInput: HTMLSelectElement;
declare const cursorInput: HTMLSelectElement;
declare const teamsSelect: HTMLSelectElement;
declare const botsCountInput: HTMLInputElement;
declare const teamsCountInput: HTMLInputElement;
declare const teamsRow: HTMLDivElement;
declare const teamsList: HTMLDivElement;
declare const selectTeamSection: HTMLDivElement;
declare const createButton: HTMLButtonElement;
declare const gamesListTable: HTMLTableDataCellElement;
declare const nickInput: HTMLInputElement;
declare const blinkingCheckbox: HTMLInputElement;
declare const bulletShadowCheckbox: HTMLInputElement;
declare const joinGameButton: HTMLButtonElement;
declare const menu: HTMLDivElement;
declare const validateGameName: HTMLLabelElement;
declare const validateGameNameDuplicate: HTMLLabelElement;
declare const validateNick: HTMLLabelElement;
declare const validateSelectedGame: HTMLLabelElement;

export default class MenuComponent {
  main;
  unsubscribeRender: Unsubscribe;
  listeners: [] = [];

  constructor(main) {
    this.main = main;
    const gameState = createGamesService.getState();
    this.unsubscribeRender = store.subscribe(() => this.render());

    createButton.addEventListener('click', () => {
      main.onAddNewGame(createGamesService.getNormalizedState());
      createGamesService.clearRoomName();
      gameNameInput.value = '';
    });

    joinGameButton.addEventListener('click', () => {
      menu.style.display = 'none';
      main.onJoinGame();
    });

    gameNameInput.value = gameState.roomName;
    gameNameInput.addEventListener('keyup', () => {
      createGamesService.setGameName(gameNameInput.value);
    });

    gameTypeInput.value = gameState.type;
    gameTypeInput.addEventListener('change', () => {
      createGamesService.setGameType(gameTypeInput.value);
      if (gameTypeInput.value === FREE4ALL) {
        this.hideTeamsSection();
        this.clearTeamsInputsList();
        createGamesService.disableTeams();
      } else {
        createGamesService.enableTeams();
        this.showTeamsSection();
        this.prepareTeamSection();
      }
    });

    gameLightInput.value = gameState.light;
    gameLightInput.addEventListener('change', () => {
      createGamesService.setLight(gameLightInput.value);
    });

    renderEngineInput.value = gameState.renderEngine;
    renderEngineInput.addEventListener('change', () => {
      createGamesService.setRenderEngine(renderEngineInput.value);
    });

    texturesInput.value = gameState.textures;
    texturesInput.addEventListener('change', () => {
      createGamesService.setTextures(texturesInput.value);
    });

    cameraInput.value = gameState.camera;
    cameraInput.addEventListener('change', () => {
      createGamesService.setCamera(cameraInput.value);
    });

    steeringInput.value = gameState.steering;
    steeringInput.addEventListener('change', () => {
      createGamesService.setSteering(steeringInput.value);
    });

    cursorInput.value = gameState.cursor;
    cursorInput.addEventListener('change', () => {
      createGamesService.setCursor(cursorInput.value);
    });

    gameMapInput.value = gameState.map;
    gameMapInput.addEventListener('change', () => {
      createGamesService.setGameMap(gameMapInput.value);
    });

    botsCountInput.value = gameState.botsCount.toString();
    botsCountInput.addEventListener('change', () => {
      if (botsCountInput.value === '') {
        botsCountInput.value = '0';
      }
      createGamesService.setBotsCount(parseInt(botsCountInput.value, 0));
    });

    teamsCountInput.value = gameState.teams?.count.toString();
    teamsCountInput.addEventListener('change', () => {
      this.prepareTeamSection();
    });

    teamsSelect.addEventListener('change', () => {
      userService.selectTeam(
        teamsSelect.value,
        gamesListService.getGame(userService.getState().chosenGame),
      );
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

  toggleSelectTeamSection() {
    const user = userService.getState();
    const chosenGame = user.chosenGame;
    const chosenTeam = user.team;
    const teams = gamesListService.getGame(chosenGame).teams;
    if (teams?.length > 0) {
      selectTeamSection.style.display = 'block';
      const options = teams.map(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.innerText = `${team.name} players: ${team.count}`;
        return option;
      });
      teamsSelect.innerHTML = '';
      teamsSelect.append(...options);
      teamsSelect.value = chosenTeam;
    } else {
      selectTeamSection.style.display = 'none';
    }
  }

  prepareTeamSection() {
    if (teamsCountInput.value === '') {
      teamsCountInput.value = '2';
    }
    const value = parseInt(teamsCountInput.value, 0);
    createGamesService.setTeamsCount(value);
    this.prepareTeamsInputsList(value);
  }

  clearTeamsInputsList() {
    const div = teamsList.childNodes[0];
    div?.childNodes.forEach((input, index) =>
      input.removeEventListener('keyup', this.listeners[index]),
    );
    this.listeners = [];
    teamsList.innerHTML = '';
  }

  prepareTeamsInputsList(count: number) {
    this.clearTeamsInputsList();
    times(count, index => {
      const label = document.createElement('label');
      const div = document.createElement('div');
      const input = document.createElement('input');
      const listeners = this.listeners;
      label.innerText = `team${index + 1}`;
      input.setAttribute('type', 'text');
      input.setAttribute('data-event', 'text');
      input.classList.add('input', 'create-white');
      input.addEventListener('keyup', function inputListener() {
        createGamesService.setTeamName(index, input.value);
        listeners.push(inputListener as never);
      });
      teamsList.appendChild(label);
      div.appendChild(input);
      teamsList.appendChild(div);
    });
  }

  renderTable(user: UserState, games: GamesListState) {
    games.list.forEach((game: GameInstance) => {
      const roomName = document.createElement('td');
      roomName.appendChild(document.createTextNode(game.roomName));
      if (user.ip === game.ip) {
        const removeButton = document.createElement('button');
        removeButton.innerHTML = 'X';
        const main = this.main;
        removeButton.addEventListener('click', function inputListener() {
          main.onDeleteGame(game.roomName);
          removeButton.removeEventListener('click', inputListener);
        });
        roomName.appendChild(removeButton);
      }
      const type = document.createElement('td');
      type.appendChild(document.createTextNode(game.type));
      const map = document.createElement('td');
      map.appendChild(document.createTextNode(game.map.mapName));
      const count = document.createElement('td');
      count.appendChild(document.createTextNode(game.count.toString()));
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        userService.selectGame(game);
        this.toggleSelectTeamSection();
      });
      row.title = JSON.stringify(game, undefined, 2);
      if (user.chosenGame === game.roomName) {
        row.classList.add('active');
      }
      row.append(roomName, type, map, count);
      gamesListTable.append(row);
    });
  }

  render() {
    gamesListTable.innerHTML = '';
    const user = userService.getState();
    const games = gamesListService.getState();
    const createGame = createGamesService.getState();
    this.renderTable(user, games);
    const nickEmpty = user.nick === '';
    const chosenGameEmpty = user.chosenGame === null;
    const idEmpty = user.id === null;
    const roomNameEmpty = createGame.roomName === '';
    const roomNameDuplicate = Boolean(
      games.list.find(game => game.roomName === createGame.roomName),
    );
    const typeEmpty = createGame.type === null;
    const mapEmpty = createGame.map === null;

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
    teamsRow.style.display = 'flex';
  }

  hideTeamsSection() {
    teamsRow.style.display = 'none';
  }

  show() {
    menu.style.display = 'block';
  }

  hide() {
    menu.style.display = 'none';
    this.unsubscribeRender();
  }
}
