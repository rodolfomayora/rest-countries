import { AnyAction } from 'redux';
import { StrictEffect } from 'redux-saga/effects';

export type Country = {
  id: string,
  name: string,
  population: number,
  region: string,
  subregion: string
  capital: string,
  flagImage: string,
  topLevelDomain: string,
  currencies: Array<object>,
  languages: Array<object>,
  borderCountries: Array<string>
}

export type AllCountries = {
  byId: {
    [countryId: string]: Country
  },
  allIds: Array<string>,
}

export type CountriesState = {
  loading: boolean;
  allCountries: AllCountries,
  error: string
};

export type CountriesReducer = (state: CountriesState, action: AnyAction) => CountriesState;

export type FetchSagaReturn = Generator<StrictEffect, void, any>;