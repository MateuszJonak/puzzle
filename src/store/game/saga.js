import { all, put, select, takeLatest } from 'redux-saga/effects';
import { getPuzzleBoxRect } from '../ui/selectors';
import { GAME_RESET } from './actions';
import actionsPuzzles from '../puzzles/actions';

export default function* gameSaga() {
  yield all([takeLatest(GAME_RESET, gameReset)]);
}

export function* gameReset() {
  const puzzleBoxRect = yield select(getPuzzleBoxRect);
  if (puzzleBoxRect) {
    yield put(actionsPuzzles.positions.calculate(puzzleBoxRect));
  }
}
