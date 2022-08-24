import { mealApi, drinkApi, drinkApiId, mealApiId } from '../../services/fetchApi';

export const LOGIN = 'LOGIN';
export const RECIPE = 'RECIPE';
export const DETAILS = 'DETAILS';

const emailAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

const getRecipesAction = (data, history) => ({
  type: RECIPE,
  recipes: data,
  history,
});

const detailsRecipes = (details) => ({
  type: DETAILS,
  details,
});

function searchAction(inputValue, order, path) {
  return async (dispatch) => {
    let id = '';
    let history = '';
    if (path === '/foods') {
      const meal = await mealApi(inputValue, order);
      if (meal.meals.length === 1) {
        id = meal.meals[0].idMeal;
        history = `${path}/${id}`;
      }
      dispatch(getRecipesAction(meal, history));
    }
    if (path === '/drinks') {
      const drink = await drinkApi(inputValue, order);
      if (drink.drinks.length === 1) {
        id = drink.drinks[0].idDrink;
        history = `${path}/${id}`;
      }
      dispatch(getRecipesAction(drink, history));
    }
  };
}

function detailsAction(path, id) {
  return async (dispatch) => {
    if (path === 'foods') {
      const detailsRecipe = await mealApiId(id);
      dispatch(detailsRecipes(detailsRecipe.meals));
    }
    if (path === 'drinks') {
      const detailsRecipe = await drinkApiId(id);
      dispatch(detailsRecipes(detailsRecipe.drinks));
    }
  };
}

export { emailAction, searchAction, detailsAction };
