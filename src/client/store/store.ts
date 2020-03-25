import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { CreateGamesService } from './createGame/fascade';
import { createGameReducer } from './createGame/reducers';
import { GamesListService } from './gamesList/fascade';
import { gamesListReducer } from './gamesList/reducers';
import { OptionsService } from './options/fascade';
import { optionsReducer } from './options/reducers';
import { UserService } from './user/fascade';
import { userReducer } from './user/reducers';

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
