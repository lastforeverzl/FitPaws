import { combineReducers } from 'redux';
import timer from './timer';
import location from './location';
import slidingPanel from './slidingPanel';
import record from './record';
import history from './history';
import profile from './profile';

const rootReducer = combineReducers({
  timer,
  location,
  slidingPanel,
  record,
  history,
  profile,
});

export default rootReducer;
