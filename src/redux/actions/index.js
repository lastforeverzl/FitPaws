import { START_TIMER, STOP_TIMER, RESET_TIMER, TICK } from '../constants';

export function startTimer() {
  return (dispatch) => {
    const interval = setInterval(() => {
      dispatch({
        type: TICK,
        time: Date.now(),
      });
    }, 1000);

    dispatch({
      type: START_TIMER,
      offset: Date.now(),
      interval,
    });
  };
}

export function stopTimer(interval) {
  clearInterval(interval);
  return {
    type: STOP_TIMER,
  };
}

export function resetTimer(interval) {
  clearInterval(interval);
  return {
    type: RESET_TIMER,
  };
}
