import { combineReducers } from 'redux';
import timer from './timer';
import location from './location';

const rootReducer = combineReducers({
  timer,
  location,
});

export default rootReducer;
