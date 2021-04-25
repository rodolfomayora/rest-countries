import RootState from '../rootState';

export const selectCountryName = (state: RootState): string => state.search.countryName;

export const selectRegionFilter = (state: RootState): string => state.search.regionFilter;