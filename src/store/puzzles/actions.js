import { createActions } from 'redux-actions';

export const UPDATE_PUZZLE = 'update/puzzle';

export default createActions({
  [UPDATE_PUZZLE]: (id, payload) => ({ id, ...payload }),
});
