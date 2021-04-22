import { SelectAll, SelectById } from './types';

export const selectAllCountries: SelectAll = (state) => {
  const { allCountries } = state.countries;
  const { allIds, byId } = allCountries;
  return allIds.map((countyId: string): object => byId[countyId]);
}

export const selectCountryById: SelectById = (countryId) => (state) => {
  const { byId } = state.countries.allCountries
  return { ...byId[countryId] };
}