import { LOGIN, RECIPE, SEARCHED, RECIPES, DETAILS } from '../actions';

const len = 5;
const INITIAL_STATE = { email: '',
  recipes: [],
  history: '',
  searched: false,
  details: [],
  categories: [] };

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
  case SEARCHED:
    return {
      ...state,
      searched: action.searched,
    };
  case RECIPES:
    return {
      ...state,
      recipes: action.recipes,
      categories: action.categories.slice(0, len),
    };
  default:
    return state;
  }
};

export default user;
