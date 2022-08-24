import { LOGIN, RECIPE, DETAILS } from '../actions';

const INITIAL_STATE = { email: '', recipes: [], history: '', details: [] };

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
  case DETAILS:
    return {
      ...state,
      details: action.details,
    };
  default:
    return state;
  }
};

export default user;
