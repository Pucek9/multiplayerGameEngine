export const actions = {
    ADD_GAME: 'ADD_GAME',
    SET_NICK: 'SET_NICK'
};

export const addGame = (name, type, count) => {
    return {
        type: actions.ADD_GAME,
        payload: (state) => {
            state.gamesList.push({name, type, count});
            return state;
        }
    };
};
