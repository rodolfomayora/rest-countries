export const selectAllCountries = (state: any): Array<any> => {
  const { countries } = state;
  const { allCountries } = countries;
  const { allIds, byId } = allCountries;
  return allIds.map((countyId: string) => byId[countyId]);
}