
import { START_TIMER, STOP_TIMER, RESET_TIMER, TICK } from '../constants';

const initialState = {
  isOn: false,
  time: 0,
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        isOn: true,
        time: state.time,
        offset: action.offset,
        interval: action.interval,
      };
    case STOP_TIMER:
      return {
        ...state,
        isOn: false,
        time: state.time,
      };
    case RESET_TIMER:
      return initialState;
    case TICK:
      return {
        ...state,
        time: state.time + (action.time - state.offset),
        offset: action.time,
      };
    default:
      return state;
  }
}
