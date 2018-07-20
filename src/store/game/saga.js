import { all, put, select, takeLatest } from 'redux-saga/effects';
import { getTilesBoxRect } from '../ui/selectors';
import { GAME_RESET } from './actions';
import tilesActions from '../tiles/actions';

export default function* gameSaga() {
  yield all([takeLatest(GAME_RESET, gameReset)]);
}

export function* gameReset() {
  const tilesBoxRect = yield select(getTilesBoxRect);
  if (tilesBoxRect) {
    yield put(tilesActions.positions.calculate(tilesBoxRect));
  }
}
