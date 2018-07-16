import { createActions } from 'redux-actions';

export const UPDATE_PUZZLES = 'puzzles/update';

export default createActions({
  [UPDATE_PUZZLES]: puzzles => ({ puzzles }),
});
