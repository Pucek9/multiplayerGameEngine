import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createGameReducer } from './createGame/reducers';
import { gamesListReducer } from './gamesList/reducers';
import { userReducer } from './user/reducers';
import { optionsReducer } from './options/reducers';
import { CreateGamesService } from './createGame/fascade';
import { GamesListService } from './gamesList/fascade';
import { UserService } from './user/fascade';
import { OptionsService } from './options/fascade';

const rootReducer = combineReducers({
  createGame: createGameReducer,
  gamesList: gamesListReducer,
  user: userReducer,
  options: optionsReducer,
});

export const store: Store = createStore(rootReducer, composeWithDevTools());

// export type AppState = ReturnType<typeof rootReducer>;

export const createGamesService = new CreateGamesService(store);
export const gamesListService = new GamesListService(store);
export const userService = new UserService(store);
export const optionsService = new OptionsService(store);
