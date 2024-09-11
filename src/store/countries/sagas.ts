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

    const allCountriesById: any = data.reduce((acc: object, crr: any) => {
      const nativeNameObject: any = crr.name?.nativeName
        ? Object.values(crr.name.nativeName)[0]
        : { official: 'Has no native name' };
      const nativeNameOfficial: string = nativeNameObject.official;

      return ({
        ...acc,
        [crr.cca3]: {
          id: crr.cca3,
          name: crr.name.common,
          nativeName: nativeNameOfficial,
          capital: !!crr.capital?.[0] ? crr.capital[0] : '',
          population: parseDigitsNumber(crr.population),
          region: crr.region,
          subregion: crr.subregion,
          flagImage: crr.flags.svg,
          topLevelDomain: !!crr?.tld ? crr.tld : [],
          currencies: !!crr?.currencies ? Object.values(crr.currencies).map(getName) : [],
          languages: !!crr?.languages ? Object.values(crr.languages) : [],
          borderCountries: [...(crr?.borders || [])]
        }
      })
    }, {});

    const arrangedByName: Array<any> = Object
      .values(allCountriesById)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    const allCountryIds: Array<string> = arrangedByName
      .map((country) => country.id);

    const normalizedData: AllCountries = {
      byId: allCountriesById,
      allIds: allCountryIds
    }

    yield put({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: normalizedData
    })

  } catch (error: unknown) {
    console.clear();
    if (error instanceof Error) {
      yield put({
        type: FETCH_COUNTRIES_FEILURE,
        payload: error.message
      })
    }
  }
}


// Saga Watchers
export default function* watchFetchCountriesRequest() {
  yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountriesRequest);
}