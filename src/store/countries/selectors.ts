import { createSelector } from 'reselect';

import {
  SelectCountreis,
  SelectById,
  SelectAllById,
  SelectAllCountriesId
} from './types';

export const selectCountryById: SelectById = countryId => state => {
  const { byId } = state.countries.allCountries
  return ({ ...byId[countryId] });
}

export const selectAllCountriesIds: SelectAllCountriesId = state => {
  return state.countries.allCountries.allIds;
}

export const selectAllCountriesById: SelectAllById = state => {
  const { allCountries } = state.countries;
  return ({ ...allCountries.byId });
}

export const selectAllCountries: SelectCountreis = state => {
  return state.countries.allCountries;
}

export const selectCountriesAsArray = createSelector(
  selectAllCountries,
  ({ allIds, byId }) => allIds.map((countyId: string): object => {
    return byId[countyId]
  })
)