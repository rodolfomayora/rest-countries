import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootReducers from './rootReducers';

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

const store: Store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
);

export default store;