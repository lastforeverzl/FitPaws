import {
  UPDATE_LOCATION,
  PAUSE_UPDATE_LOCATION,
  RESET_LOCATION,
} from '../constants';

const initialState = {
  routeCoordinates: [],
  distanceTravelled: 0,
  prevLatLng: {},
};

export default function location(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        routeCoordinates: state.routeCoordinates.concat(action.positionLatLngs),
        distanceTravelled: state.distanceTravelled + action.calcDistance,
        prevLatLng: action.newLatLngs,
      };
    case PAUSE_UPDATE_LOCATION:
      return {
        ...state,
      };
    case RESET_LOCATION:
      return initialState;
    default:
      return state;
  }
}
