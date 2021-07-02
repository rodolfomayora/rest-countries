import { combineReducers, ReducersMapObject} from 'redux';
import countries from './countries/reducer';
import search from './search/reducer';
import theme from './theme/reducer';

const rootReducers = combineReducers<ReducersMapObject>({
  countries,
  search,
  theme
});

export default rootReducers;