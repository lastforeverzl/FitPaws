import { combineReducers } from 'redux';
import timer from './timer';
import location from './location';
import slidingPanel from './slidingPanel';
import record from './record';

const rootReducer = combineReducers({
  timer,
  location,
  slidingPanel,
  record,
});

export default rootReducer;
