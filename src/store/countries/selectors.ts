
export const selectAllCountries = (state: any): Array<any> => {
  const { countries } = state;
  const { allCountries } = countries;
  const { allIds, byId } = allCountries;
  return allIds.map((countyId: string) => byId[countyId]);
}

// export const selectCountriesWithId = (state: any): Array<any> => {
//   return state.countries.countriesList.map((country: any) => {
//     return {
//       ...country,
//       id: country.alpha3Code
//     }
//   });
// }