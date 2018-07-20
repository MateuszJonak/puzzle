import { createActions } from 'redux-actions';

export const UPDATE_PUZZLE = 'update/puzzle';
export const POSITIONS_CALCULATE = 'positions/calculate';

export default createActions({
  [UPDATE_PUZZLE]: (id, payload) => ({ id, ...payload }),
  [POSITIONS_CALCULATE]: null,
});
