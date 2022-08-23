import { mealApi, drinkApi } from '../../services/fetchApi';

export const LOGIN = 'LOGIN';
export const RECIPE = 'RECIPE';

const emailAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

const getRecipesAction = (data) => ({
  type: RECIPE,
  recipes: data,
});

function searchAction(inputValue, order, path) {
  return async (dispatch) => {
    if (path === '/foods') {
      const meal = await mealApi(inputValue, order);
      dispatch(getRecipesAction(meal));
    }
    if (path === '/drinks') {
      const drink = await drinkApi(inputValue, order);
      dispatch(getRecipesAction(drink));
    }
  };
}

export { emailAction, searchAction };
