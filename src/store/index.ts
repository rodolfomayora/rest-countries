import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootReducers from './rootReducers';
import rootSagas from './rootSagas';

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

const store: Store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSagas);

export default store;