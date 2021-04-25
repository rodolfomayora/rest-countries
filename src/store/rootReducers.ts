import { combineReducers, ReducersMapObject} from 'redux';
import countries from './countries/reducer';
import search from './search/reducer';

const rootReducers = combineReducers<ReducersMapObject>({
  countries,
  search
});

export default rootReducers;