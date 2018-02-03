import {
  SHOW_SLIDING_PANEL,
  HIDE_SLIDING_PANEL,
} from '../constants';

const initialState = {
  panelVisible: false,
};

export default function slidingPanel(state = initialState, action) {
  switch (action.type) {
    case SHOW_SLIDING_PANEL:
      return { panelVisible: action.panelVisible };
    case HIDE_SLIDING_PANEL:
      return { panelVisible: action.panelVisible };
    default:
      return state;
  }
}
