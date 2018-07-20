import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';
import reducers from './reducers';
import sagas from './sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      persistState(['game', 'puzzles']),
    ),
  );
  sagaMiddleware.run(sagas);

  return store;
};
