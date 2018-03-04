import { UPDATE_DOG_PROFILE } from '../constants';

const initialState = {
  avatar: null,
  dogName: '',
  birthday: '',
  inTakeDate: '',
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOG_PROFILE:
      return {
        ...state,
        avatar: action.avatar,
        dogName: action.dogName,
        birthday: action.birthday,
        inTakeDate: action.inTakeDate,
      };
    default:
      return state;
  }
}
