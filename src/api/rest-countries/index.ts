import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export class CountriesApi {
  static async getAll () {
    const response = await api.get('/all');
    return response.data;
  }
}

/* What especific data do I need? */
// type Country = {
//   id: crr.cca3,
//   name: crr.name.common,
//   nativeName: nativeNameOfficial,
//   capital: !!crr.capital?.[0] ? crr.capital[0] : '',
//   population: parseDigitsNumber(crr.population),
//   region: crr.region,
//   subregion: crr.subregion,
//   flagImage: crr.flags.svg,
//   topLevelDomain: !!crr?.tld ? crr.tld : [],
//   currencies: !!crr?.currencies ? Object.values(crr.currencies).map(getName) : [],
//   languages: !!crr?.languages ? Object.values(crr.languages) : [],
//   borderCountries: [...(crr?.borders || [])]
// }
