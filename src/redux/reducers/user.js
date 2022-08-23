import { LOGIN, RECIPE } from '../actions';

const INITIAL_STATE = { email: '', recipes: [] };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  case RECIPE:
    return {
      ...state,
      recipes: action.recipes,
    };
  default:
    return state;
  }
};

export default user;
