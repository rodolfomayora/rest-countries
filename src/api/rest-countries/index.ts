import axios from 'axios';
import type { CountryBase, CountryDetails, BorderCountry } from '#/types/Country';

type ApiResponse = {
  borders: string[],
  capital: string[],
  cca3: string,
  currencies: Record<string, { name: string, symbol: string }>,
  flags: {
    alt: string,
    png: string,
    svg: string,
  },
  languages: Record<string, string>,
  name: {
    common: string,
    official: string,
  },
  population: number,
  region: string,
  subregion: string,
  tld: string[],
}

const api = axios.create({ baseURL: 'https://restcountries.com/v3.1' });

export class CountriesApi {
  static async getAll ({ signal }: { signal: AbortSignal }): Promise<CountryBase[]> {
    const URLQueryString = '?fields=cca3,name,flags,capital,population,region'
    const response = await api.get<ApiResponse[]>('/all' + URLQueryString, { signal });
    const mappedCountries = response.data.map((country) => {
      const { capital, cca3, flags, name, population, region } = country;
      return {
        capital: capital[0],
        commonName: name.common,
        flagDescription: flags.alt,
        flagImage: flags.svg,
        id: cca3,
        population,
        region,
      }
    })
    return mappedCountries;
  }

  static async getByName (countryName: string): Promise<CountryDetails> {
    const URLQueryString = '?fields=cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders';
    const response = await api.get<ApiResponse>(`/name/${countryName}` + URLQueryString);
    const { data } = response;
    const { borders, capital, cca3, currencies, flags,
      languages, name, population, region, subregion, tld,
    } = data;
    return {
      borderCountries: borders ?? [],
      capital: capital[0],
      commonName: name.common,
      currencies: Object.values(currencies).map(({ name }) => name),
      flagDescription: flags.alt,
      flagImage: flags.svg,
      id: cca3,
      languages: Object.values(languages),
      officialName: name.official,
      population,
      region,
      subregion,
      topLevelDomain: tld ?? [],
    }
  }

  static async getById (id: string): Promise<CountryDetails> {
    const URLQueryString = '?fields=cca3,name,flags,capital,population,region,subregion,tld,currencies,languages,borders';
    const response = await api.get<ApiResponse>(`/alpha/${id}` + URLQueryString);
    const { data } = response;
    const { borders, capital, cca3, currencies, flags,
      languages, name, population, region, subregion, tld,
    } = data;
    return {
      borderCountries: borders ?? [],
      capital: capital[0],
      commonName: name.common,
      currencies: Object.values(currencies).map(({ name }) => name),
      flagDescription: flags.alt,
      flagImage: flags.svg,
      id: cca3,
      languages: Object.values(languages),
      officialName: name.official,
      population,
      region,
      subregion,
      topLevelDomain: tld ?? [],
    }
  }

  static async getBorderCountries (ids: string[]): Promise<BorderCountry[]> {
    const formatedIds = ids.join(',');
    const URLQueryString = `?codes=${formatedIds}&fields=cca3,name`
    const response = await api.get<ApiResponse[]>('/alpha' + URLQueryString);
    const mappedApiResponse = response.data.map(({ cca3, name }) => ({
      id: cca3,
      commonName: name.common
    }))
    return mappedApiResponse;
  }

  static async getRegions (): Promise<string[]> {
    const URLQueryString = '?region'
    const { data } = await api.get<ApiResponse[]>('/all' + URLQueryString);
    const regions = new Set();
    for (const country of data) {
      const { region } = country;
      regions.add(region)
    }
    return Array.from(regions) as string[];
  }
}