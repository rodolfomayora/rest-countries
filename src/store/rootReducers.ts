import { combineReducers, ReducersMapObject} from 'redux';
import countries from './countries/reducer';

const rootReducers = combineReducers<ReducersMapObject>({
  countries,
});

export default rootReducers;