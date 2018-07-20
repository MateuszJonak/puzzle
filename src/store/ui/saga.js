import { all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash/fp';
import { RECT_SET } from './actions';
import { TILES_BOX_RECT_NAME } from './selectors';
import tilesActions from '../tiles/actions';

export default function* uiSaga() {
  yield all([takeLatest(RECT_SET, rectSet)]);
}

const getName = get('name');
const getClientRect = get('clientRect');

export function* rectSet({ payload }) {
  const name = getName(payload);
  if (name === TILES_BOX_RECT_NAME) {
    const clientRect = getClientRect(payload);
    yield put(tilesActions.positions.calculate(clientRect));
  }
}
