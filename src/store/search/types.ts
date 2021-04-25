import { AnyAction } from 'redux';

export type SearchState = {
  countryName: string,
  regionFilter: 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';  
}

export type SearchReducer = (state: SearchState, action: AnyAction) => SearchState;