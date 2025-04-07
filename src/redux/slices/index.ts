import {AnyAction, combineReducers} from 'redux';
import homeSlice from './home/homeSlice';

const appReducer = combineReducers({
  home: homeSlice,
});

const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
