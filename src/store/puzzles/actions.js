import { createActions } from 'redux-actions';

export const UPDATE_PUZZLE = 'update/puzzle';
export const UPDATE_POSITIONS = 'update/positions';

export default createActions({
  [UPDATE_PUZZLE]: (id, payload) => ({ id, ...payload }),
  [UPDATE_POSITIONS]: null,
});
