import { 
  SET_COUNTRY_NAME,
  SET_REGION_FILTER
} from './actionTypes';
import { SearchState, SearchReducer } from './types';

const defaultSearch: SearchState = {
  countryName: '',
  regionFilter: 'All'
}

const search: SearchReducer = (state = defaultSearch, { type, payload }) => {
  switch(type) {
    case SET_COUNTRY_NAME: return ({
      ...state,
      countryName: payload
    });

    case SET_REGION_FILTER: return ({
      ...state,
      regionFilter: payload
    });

    default: return state;
  }
}

export default search;