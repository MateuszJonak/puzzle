import { get } from 'lodash/fp';
import { REDUCER_NAME } from './reducers';

export const getIsRunning = get(`${REDUCER_NAME}.isRunning`);
export const getIsFinished = get(`${REDUCER_NAME}.isFinished`);
export const getElapsed = get(`${REDUCER_NAME}.elapsed`);
