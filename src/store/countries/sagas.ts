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
import parseDigitsNumber from '../../utils/parseDigitsNumber';
import { FetchSagaReturn, AllCountries } from './types';

// Saga Workers
function* fetchCountriesRequest(): FetchSagaReturn {
  try {
    const response: Response = yield call(window.fetch, allCountries, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) throw new Error('Error al cargar, recarge la pagina');

    const data: Array<any> = yield call([response, response.json]);

    const getName = (item: any) => item.name;

    const allCountriesById: any = data.reduce((acc: object, crr: any) => ({
      ...acc,
      [crr.alpha3Code]: {
        id: crr.alpha3Code,
        name: crr.name,
        nativeName: crr.nativeName,
        capital: crr.capital,
        population: parseDigitsNumber(crr.population),
        region: crr.region,
        subregion: crr.subregion,
        flagImage: crr.flag,
        topLevelDomain: crr.topLevelDomain,
        currencies: crr.currencies.map(getName),
        languages: crr.languages.map(getName),
        borderCountries: [...crr.borders]
      }
    }), {});

    const allCountryIds: Array<string> = Object.keys(allCountriesById);

    const normalizedData: AllCountries = {
      byId: allCountriesById,
      allIds: allCountryIds
    }

    yield put({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: normalizedData
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