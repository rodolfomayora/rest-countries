import { AnyAction } from 'redux';
import {
  SET_COUNTRY_NAME,
  SET_REGION_FILTER
} from './actionTypes';

export const setCountryName = (countryName: string): AnyAction => ({
  type: SET_COUNTRY_NAME,
  payload: countryName
});

export const setRegionFilter = (region: string): AnyAction => ({
  type: SET_REGION_FILTER,
  payload: region
});