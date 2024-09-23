export type CountryBase = {
  capital: string,
  commonName: string,
  flagDescription: string,
  flagImage: string,
  id: string,
  population: number,
  region: string,
}

export type CountryDetails = CountryBase & {
  borderCountries: string[],
  currencies: string[],
  languages: string[],
  officialName: string
  subregion: string,
  topLevelDomain: string[],
}

export type BorderCountry = Pick<CountryBase, "id" | "commonName">
