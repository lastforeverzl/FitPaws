import {
  CHOOSE_FEEL_SCALE,
  CHOOSE_POOP_SHAPE,
  CHOOSE_POOP_COLOR,
  CHOOSE_PEE,
  CHOOSE_POOP,
  RESET_RECORD,
  INSERT_RECORD_REQUEST,
  INSERT_RECORD_SUCCESS,
  INSERT_RECORD_FAILURE,
} from '../constants';

const initialState = {
  feelScale: 0,
  poop: false,
  poopShape: 0,
  poopColor: 0,
  pee: true,
  error: '',
  loading: false,
};

export default function record(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_FEEL_SCALE:
      return {
        ...state,
        feelScale: action.feelScale,
      };
    case CHOOSE_POOP:
      return {
        ...state,
        poop: action.poop,
      };
    case CHOOSE_POOP_SHAPE:
      return {
        ...state,
        poopShape: action.poopShape,
      };
    case CHOOSE_POOP_COLOR:
      return {
        ...state,
        poopColor: action.poopColor,
      };
    case CHOOSE_PEE:
      return {
        ...state,
        pee: action.pee,
      };
    case RESET_RECORD:
      return initialState;
    case INSERT_RECORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INSERT_RECORD_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
      };
    case INSERT_RECORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
