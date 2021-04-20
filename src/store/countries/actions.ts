import { Action } from 'redux';
import { FETCH_COUNTRIES_REQUEST } from './actionTypes';

export const fetchCountries = (): Action => ({
  type: FETCH_COUNTRIES_REQUEST
});