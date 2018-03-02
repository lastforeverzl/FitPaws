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
  RESET_RECORD,
  UPDATE_HISTORY_DATA,
  INSERT_RECORD_REQUEST,
  INSERT_RECORD_SUCCESS,
  INSERT_RECORD_FAILURE,
  QUERY_RECORDS_REQUEST,
  QUERY_RECORDS_SUCCESS,
  QUERY_RECORDS_FAILURE,
  DELETE_RECORD_REQUEST,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILURE,
  UPDATE_DOG_PROFILE,
} from '../constants';
import { queryAllRecords, insertNewRecord, deleteRecord } from '../../database/schemas';

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

export function resetTimer() {
  // clearInterval(interval);
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

export function updatePoopStatus(poop) {
  return {
    type: CHOOSE_POOP,
    poop,
  };
}

export function updatePoopShape(poopShape) {
  return {
    type: CHOOSE_POOP_SHAPE,
    poopShape,
  };
}

export function updatePoopColor(poopColor) {
  return {
    type: CHOOSE_POOP_COLOR,
    poopColor,
  };
}

export function updatePeeStatus(pee) {
  return {
    type: CHOOSE_PEE,
    pee,
  };
}

export function resetRecord() {
  return {
    type: RESET_RECORD,
  };
}

/*
 *  History actions
 */
export function updateHistoryData(historyData) {
  const sum = (acc, cur) => acc + cur;
  const size = historyData.length;
  const totalTime = historyData.map(item => item.time).reduce(sum);
  const totalDistance = historyData.map(item => item.distance).reduce(sum);
  const avgTime = Math.round(totalTime / size);
  const avgDistance = totalDistance / size;

  return {
    type: UPDATE_HISTORY_DATA,
    historyData,
    totalTime,
    totalDistance,
    avgTime,
    avgDistance,
  };
}

/*
 * Database operations.
 */
export const queryFromDatabase = () => {
  return (dispatch) => {
    dispatch({ type: QUERY_RECORDS_REQUEST });

    queryAllRecords().then((historyData) => {
      const sum = (acc, cur) => acc + cur;
      const size = historyData.length;
      let totalTime;
      let totalDistance;
      let avgTime;
      let avgDistance;
      if (size > 0) {
        totalTime = historyData.map(item => item.time).reduce(sum);
        totalDistance = historyData.map(item => item.distance).reduce(sum);
        avgTime = Math.round(totalTime / size);
        avgDistance = totalDistance / size;
      } else {
        console.log('historyData is empty');
        totalTime = 0;
        totalDistance = 0;
        avgTime = 0;
        avgDistance = 0;
      }

      dispatch({
        type: QUERY_RECORDS_SUCCESS,
        historyData,
        totalTime,
        totalDistance,
        avgTime,
        avgDistance,
      });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: QUERY_RECORDS_FAILURE, payload: error });
    });
  };
};

export const insertRecordToDb = (record) => {
  return (dispatch) => {
    dispatch({ type: INSERT_RECORD_REQUEST });

    insertNewRecord(record)
      .then(() => {
        dispatch({ type: INSERT_RECORD_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: INSERT_RECORD_FAILURE, payload: error });
      });
  };
};

export const deleteRecordFromDb = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_RECORD_REQUEST });

    deleteRecord(id)
      .then(() => {
        dispatch({ type: DELETE_RECORD_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: DELETE_RECORD_FAILURE, payload: error });
      });
  };
};

export const updateDogProfile = (avatar, dogName) => {
  return {
    type: UPDATE_DOG_PROFILE,
    avatar,
    dogName,
  };
};
