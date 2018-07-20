import { createActions } from 'redux-actions';

export const UPDATE_TILE = 'update/tile';
export const POSITIONS_CALCULATE = 'positions/calculate';

export default createActions({
  [UPDATE_TILE]: (id, payload) => ({ id, ...payload }),
  [POSITIONS_CALCULATE]: null,
});
