import countries from './data.json' with { type: 'json' };
import { CountryBase, CountryDetails, BorderCountry } from '#/types/Country';

export class CountriesApi {
  static async getAll (): Promise<CountryBase[]> {
    const mappedCountries = countries.map((country) => {
      const { capital, cca3, flags, name, population, region } = country;
      return {
        capital: capital[0],
        commonName: name.common,
        flagDescription: flags.alt,
        flagImage: flags.svg,
        id: cca3,countries,
        population,
        region,
      }
    });
    
    return mappedCountries;
  }

  static async getByName (countryName: string): Promise<CountryDetails> {
    const country = countries.find((country) => country.name.common === countryName);
    if (!country) throw new Error('Not found');
    const { borders, capital, cca3, currencies, flags,
      languages, name, population, region, subregion, tld,
    } = country;
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
    const country = countries.find((country) => country.cca3 === id);
    if (!country) throw new Error('Not found');
    const { borders, capital, cca3, currencies, flags,
      languages, name, population, region, subregion, tld,
    } = country;
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
    const {} = ids;  
    return [];
  }
}