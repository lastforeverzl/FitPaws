import {
  UPDATE_HISTORY_DATA,
  QUERY_RECORDS_REQUEST,
  QUERY_RECORDS_SUCCESS,
  QUERY_RECORDS_FAILURE,
  DELETE_RECORD_REQUEST,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILURE,
} from '../constants';

const initialState = {
  totalTime: 0,
  totalDistance: 0,
  avgTime: 0,
  avgDistance: 0,
  historyData: [],
  error: '',
  loading: false,
};

export default function history(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HISTORY_DATA:
      return {
        ...state,
        historyData: action.historyData,
        totalTime: action.totalTime,
        totalDistance: action.totalDistance,
        avgTime: action.avgTime,
        avgDistance: action.avgDistance,
      };
    case QUERY_RECORDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case QUERY_RECORDS_SUCCESS:
      return {
        ...state,
        historyData: action.historyData,
        totalTime: action.totalTime,
        totalDistance: action.totalDistance,
        avgTime: action.avgTime,
        avgDistance: action.avgDistance,
        error: '',
        loading: false,
      };
    case QUERY_RECORDS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_RECORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_RECORD_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
      };
    case DELETE_RECORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
