import { ThemeState } from './theme/types';

type RootState = Readonly<{
  theme: ThemeState
}>

export default RootState;