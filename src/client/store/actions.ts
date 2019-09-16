export const gamesListActions = {
  ADD_GAME: 'ADD_GAME',
  SET_GAME_NAME: 'SET_GAME_NAME',
  SET_GAME_TYPE: 'SET_GAME_TYPE',
  SET_GAME_MAP: 'SET_GAME_MAP',
  CLEAR_GAMES_LIST: 'CLEAR_GAMES_LIST',
};

export const joinGameActions = {
  SET_NICK: 'SET_NICK',
  CHOOSE_GAME: 'CHOOSE_GAME',
};

export const optionsActions = {
  SET_BLINKING: 'SET_BLINKING',
  SET_BULLET_SHADOW: 'SET_BULLET_SHADOW',
};

export const addGame = (roomName, type, map, count) => {
  return {
    type: gamesListActions.ADD_GAME,
    payload: state => {
      return {
        ...state,
        list: [...state.list, { roomName, type, map, count }],
        roomName: '',
      };
    },
  };
};

export const setNick = nick => {
  return {
    type: joinGameActions.SET_NICK,
    payload: state => {
      return {
        ...state,
        nick,
      };
    },
  };
};

export const setId = id => {
  return {
    type: joinGameActions.SET_NICK,
    payload: state => {
      return {
        ...state,
        id,
      };
    },
  };
};

export const setGameName = roomName => {
  return {
    type: gamesListActions.SET_GAME_NAME,
    payload: state => {
      return {
        ...state,
        roomName,
      };
    },
  };
};

export const setGameType = type => {
  return {
    type: gamesListActions.SET_GAME_TYPE,
    payload: state => {
      return {
        ...state,
        type,
      };
    },
  };
};

export const setGameMap = map => {
  return {
    type: gamesListActions.SET_GAME_MAP,
    payload: state => {
      return {
        ...state,
        map,
      };
    },
  };
};

export const chooseGame = chosenGame => {
  return {
    type: joinGameActions.CHOOSE_GAME,
    payload: state => {
      return {
        ...state,
        chosenGame,
      };
    },
  };
};

export const clearGamesList = () => {
  return {
    type: gamesListActions.CLEAR_GAMES_LIST,
    payload: state => {
      return {
        ...state,
        list: [],
      };
    },
  };
};

export const setBlinking = value => {
  return {
    type: optionsActions.SET_BLINKING,
    payload: state => {
      return {
        ...state,
        blinking: value,
      };
    },
  };
};

export const setBulletShadow = value => {
  return {
    type: optionsActions.SET_BULLET_SHADOW,
    payload: state => {
      return {
        ...state,
        bulletShadow: value,
      };
    },
  };
};
