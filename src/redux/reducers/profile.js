import { UPDATE_DOG_PROFILE } from '../constants';

const initialState = {
  avatar: null,
  dogName: '',
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOG_PROFILE:
      return {
        ...state,
        avatar: action.avatar,
        dogName: action.dogName,
      };
    default:
      return state;
  }
}
