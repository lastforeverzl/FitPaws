import {
  CHOOSE_FEEL_SCALE,
  CHOOSE_POOP_SHAPE,
  CHOOSE_POOP_COLOR,
  CHOOSE_PEE,
  CHOOSE_POOP,
} from '../constants';

const initialState = {
  feelScale: 0,
  poop: false,
  poopShape: 0,
  poopColor: 0,
  pee: true,
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
        pee: true,
      };
    default:
      return state;
  }
}
