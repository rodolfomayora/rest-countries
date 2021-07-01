import RootState from '../rootState';
import { ThemeState } from './types';

export const selectTheme = (state: RootState): ThemeState => state.theme;