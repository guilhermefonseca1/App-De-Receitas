import { LOGIN, RECIPE } from '../actions';

const INITIAL_STATE = { email: '', recipes: [], history: '' };

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
      history: action.history,
    };
  default:
    return state;
  }
};

export default user;
