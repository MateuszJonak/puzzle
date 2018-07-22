import { createActions } from 'redux-actions';

export const GAME_START = 'game/start';
export const GAME_FINISH = 'game/finish';
export const GAME_RESET = 'game/reset';
export const ELAPSED_UPDATE = 'elapsed/update';

export default createActions({
  [GAME_START]: null,
  [GAME_FINISH]: null,
  [GAME_RESET]: null,
  [ELAPSED_UPDATE]: null,
});
