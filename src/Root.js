import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure';
import App from './frames/App';

const Root = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

export default Root;
