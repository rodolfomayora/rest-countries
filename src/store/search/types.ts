import { AnyAction } from 'redux';

export type SearchState = {
  countryName: string,
  regionFilter: any
}

export type SearchReducer = (state: SearchState, action: AnyAction) => SearchState;