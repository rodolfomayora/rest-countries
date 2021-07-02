import { AnyAction } from 'redux';

export type ThemeState = 'default' | 'light';
export type ThemeReducer = (state: ThemeState, action: AnyAction) => ThemeState;