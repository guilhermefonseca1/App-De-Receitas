import { LOGIN, RECIPE, SEARCHED } from '../actions';

const INITIAL_STATE = { email: '', recipes: [], history: '', searched: false };

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
  case SEARCHED:
    return {
      ...state,
      searched: action.searched,
    };
  default:
    return state;
  }
};

export default user;
