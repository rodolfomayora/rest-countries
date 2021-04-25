import { CountriesState } from './countries/types';
import { SearchState } from './search/types';

type RootState = Readonly<{
  countries: CountriesState,
  search: SearchState
}>

export default RootState;