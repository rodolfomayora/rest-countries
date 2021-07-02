import { CountriesState } from './countries/types';
import { SearchState } from './search/types';
import { ThemeState } from './theme/types';

type RootState = Readonly<{
  countries: CountriesState,
  search: SearchState
  theme: ThemeState
}>

export default RootState;