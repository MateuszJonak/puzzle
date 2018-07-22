import { all, fork } from 'redux-saga/effects';
import gameSaga from './game/saga';
import uiSaga from './ui/saga';

export default function* rootSaga() {
  yield all([fork(gameSaga), fork(uiSaga)]);
}
