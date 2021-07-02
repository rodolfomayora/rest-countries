import { TOGGLE_THEME, SET_THEME } from './actionTypes';
import { ThemeState, ThemeReducer } from './types';

const defaultTheme: ThemeState = 'default'

const theme: ThemeReducer = (state = defaultTheme, { type, payload }) => {
  switch(type) {
    case TOGGLE_THEME:
      return state !== 'default' ? 'default' : 'light';

    case SET_THEME:
      return state = payload;

    default:
      return state;
  }
}

export default theme;