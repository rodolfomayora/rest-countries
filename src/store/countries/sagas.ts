import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FEILURE
} from './actionTypes';

// Effect Creators
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import { allCountries } from '../../utils/endPoints';
import { FetchSagaReturn } from './types';

// Saga Workers
function* fetchCountriesRequest(): FetchSagaReturn {
  try {
    const response: Response = yield call(window.fetch, allCountries, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) throw new Error('Error al cargar, recarge la pagina');

    const data: Array<any> = yield call([response, response.json]);

    yield put({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: data
    })

  } catch ({ message }) {
    console.clear();
    yield put({
      type: FETCH_COUNTRIES_FEILURE,
      payload: message
    })
  }
}


// Saga Watchers
export default function* watchFetchCountriesRequest() {
  yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountriesRequest);
}