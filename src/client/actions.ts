export const gamesListActions = {
    ADD_GAME: 'ADD_GAME',
};

export const joinGameActions = {
    SET_NICK: 'SET_NICK',
    CHOOSE_GAME: 'CHOOSE_GAME',
};

export const addGame = (name, type, count) => {
    return {
        type: gamesListActions.ADD_GAME,
        payload: (state) => {
            return [
                ...state,
                {name, type, count},
            ];
        }
    };
};

export const setNick = (nick) => {
    return {
        type: joinGameActions.SET_NICK,
        payload: (state) => {
            return {
                ...state,
                nick,
            }
        }
    };
};

export const chooseGame = (chosenGame) => {
    return {
        type: joinGameActions.CHOOSE_GAME,
        payload: (state) => {
            return {
                ...state,
                chosenGame,
            }
        }
    };
};
