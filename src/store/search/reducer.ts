import { SET_COUNTRY_NAME } from './actionTypes';
import { SearchState, SearchReducer } from './types';

const defaultSearch: SearchState = {
  countryName: '',
  regionFilter: undefined
}

const search: SearchReducer = (state = defaultSearch, { type, payload }) => {
  switch(type) {
    case SET_COUNTRY_NAME: return ({
      ...state,
      countryName: payload
    })

    default: return state;
  }
}

export default search;