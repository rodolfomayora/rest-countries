import { AnyAction } from 'redux';
import { StrictEffect } from 'redux-saga/effects';

export type CountriesState = {
  loading: boolean;
  countriesList: Array<any>,
  error: string
};

export type CountriesReducer = (state: CountriesState, action: AnyAction) => CountriesState;

export type FetchSagaReturn = Generator<StrictEffect, void, any>;