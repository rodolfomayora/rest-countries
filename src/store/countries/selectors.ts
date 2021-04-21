import RootState from '../rootState';

export const selectAllCountries = (state: RootState): Array<any> => {
  const { allCountries } = state.countries;
  const { allIds, byId } = allCountries;
  return allIds.map((countyId: string): object => byId[countyId]);
}