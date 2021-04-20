import { Action } from 'redux';
import { FETCH_COUNTRIES_REQUEST } from './action-types';

export const fetchCountries = (): Action => ({
  type: FETCH_COUNTRIES_REQUEST
});