import { AnyAction } from 'redux';
import { SET_COUNTRY_NAME } from './actionTypes';

export const setCountryName = (countryName: string): AnyAction => ({
  type: SET_COUNTRY_NAME,
  payload: countryName
});