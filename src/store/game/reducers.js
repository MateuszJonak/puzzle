import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { GAME_START, GAME_FINISH, GAME_RESET, ELAPSED_UPDATE } from './actions';

export const REDUCER_NAME = 'game';

const initialState = {
  isRunning: false,
  isFinished: false,
  elapsed: undefined,
};

export default handleActions(
  {
    [GAME_START]: state => update(state, { isRunning: { $set: true } }),
    [GAME_FINISH]: state =>
      update(state, { isFinished: { $set: true }, isRunning: { $set: false } }),
    [GAME_RESET]: () => ({ ...initialState }),
    [ELAPSED_UPDATE]: (state, { payload: { elapsed } }) => {
      return update(state, { elapsed: { $set: elapsed } });
    },
  },
  initialState,
);
