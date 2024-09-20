import { combineReducers, ReducersMapObject} from 'redux';
import theme from './theme/reducer';

const rootReducers = combineReducers<ReducersMapObject>({
  theme
});

export default rootReducers;