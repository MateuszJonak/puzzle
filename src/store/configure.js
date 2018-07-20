import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';
import { REDUCER_NAME as GAME_REDUCER_NAME } from './game';
import { REDUCER_NAME as TILES_REDUCER_NAME } from './tiles';
import reducers from './reducers';
import sagas from './sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      persistState([GAME_REDUCER_NAME, TILES_REDUCER_NAME]),
    ),
  );
  sagaMiddleware.run(sagas);

  return store;
};
