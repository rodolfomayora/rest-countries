import { Action, AnyAction } from 'redux';

import { TOGGLE_THEME, SET_THEME } from './actionTypes';

export const toggleTheme = (): Action => ({
  type: TOGGLE_THEME
});

export const setTheme = (theme: string): AnyAction => ({
  type: SET_THEME,
  payload: theme
})