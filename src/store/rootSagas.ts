import { all } from 'redux-saga/effects';
import watchFetchCountriesRequest from './countries/sagas';

export default function* rootSagas() {
  yield all([
    watchFetchCountriesRequest(),
  ]);
}