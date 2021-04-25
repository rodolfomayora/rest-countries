import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FEILURE
} from './actionTypes';
import { CountriesState, CountriesReducer } from './types';

const defaultCountries: CountriesState = {
  loading: false,
  allCountries: {
    byId: {},
    allIds: [],
  },
  error: ''
}

const countries: CountriesReducer = (state = defaultCountries, { type, payload }) => {
  switch(type) {
    case FETCH_COUNTRIES_REQUEST: return ({
      ...state,
      loading: true,
      arror: ''
    });

    case FETCH_COUNTRIES_SUCCESS: return ({
      ...state,
      loading: false,
      allCountries: payload
    })

    case FETCH_COUNTRIES_FEILURE: return ({
      ...state,
      loading: false,
      error: payload
    })

    default: return state;
  }
}

export default countries;