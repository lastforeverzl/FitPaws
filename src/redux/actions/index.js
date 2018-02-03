import pick from 'lodash/pick';
import haversine from 'haversine';
import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TICK,
  UPDATE_LOCATION,
  PAUSE_UPDATE_LOCATION,
  RESET_LOCATION,
  SHOW_SLIDING_PANEL,
  HIDE_SLIDING_PANEL,
  CHOOSE_FEEL_SCALE,
  CHOOSE_POOP_SHAPE,
  CHOOSE_POOP_COLOR,
  CHOOSE_PEE,
  CHOOSE_POOP,
} from '../constants';

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

export function updateLocation(position, prevLatLng) {
  const newLatLngs = { latitude: position.coords.latitude, longitude: position.coords.longitude };
  const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
  const calcDistance = (haversine(prevLatLng, newLatLngs, { unit: 'mile' }) || 0);
  return {
    type: UPDATE_LOCATION,
    positionLatLngs,
    calcDistance,
    newLatLngs,
  };
}

export function pauseUpdateLocation() {
  return {
    type: PAUSE_UPDATE_LOCATION,
  };
}

export function resetLocation() {
  return {
    type: RESET_LOCATION,
  };
}

export function showSlidingPanel() {
  return {
    type: SHOW_SLIDING_PANEL,
    panelVisible: true,
  };
}

export function hideSlidingPanel() {
  return {
    type: HIDE_SLIDING_PANEL,
    panelVisible: false,
  };
}

export function updateFeelScale(scale) {
  return {
    type: CHOOSE_FEEL_SCALE,
    feelScale: scale,
  };
}

export function checkIfPoop(poop) {
  return {
    type: CHOOSE_POOP,
    poop,
  };
}
