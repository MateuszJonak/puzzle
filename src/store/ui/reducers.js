import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { RECT_SET } from './actions';

export const REDUCER_NAME = 'ui';

const initialState = {
  rect: {},
};

export default handleActions(
  {
    [RECT_SET]: (state, { payload: { name, clientRect } }) =>
      update(state, { rect: { $merge: { [name]: clientRect } } }),
  },
  initialState,
);
