import { AUTHENTICATE, SET_LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.password,
        userId: action.username,
        password: action.password,
        didTryAutoLogin: true
      };
    case SET_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
