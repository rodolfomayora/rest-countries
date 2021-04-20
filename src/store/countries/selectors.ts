
export const countriesListSelector = (state: any): Array<any> => {
  return state.countries.countriesList;
}

export const countriesWithIdSelector = (state: any): Array<any> => {
  return state.countries.countriesList.map((country: any) => {
    return {
      ...country,
      id: country.alpha3Code
    }
  });
}