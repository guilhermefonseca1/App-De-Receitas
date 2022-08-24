import { mealApi, drinkApi } from '../../services/fetchApi';

export const LOGIN = 'LOGIN';
export const RECIPE = 'RECIPE';
export const SEARCHED = 'SEARCHED';
export const RECIPES = 'RECIPES';

const emailAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

const getRecipesAction = (data, history) => ({
  type: RECIPE,
  recipes: data,
  history,
});

const getBoolAction = (bool) => ({
  type: SEARCHED,
  searched: bool,
});

const initialRecipesAction = (data) => ({
  type: RECIPES,
  recipes: data,
});

function searchAction(inputValue, order, path) {
  return async (dispatch) => {
    let id = '';
    let history = '';
    if (path === '/foods') {
      const meal = await mealApi(inputValue, order);
      if (meal.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (meal.meals !== null && meal.meals.length === 1) {
        id = meal.meals[0].idMeal;
        history = `${path}/${id}`;
      }
      dispatch(initialRecipesAction(meal));
      dispatch(getRecipesAction(meal, history));
    }
    if (path === '/drinks') {
      const drink = await drinkApi(inputValue, order);
      if (drink !== undefined && drink.drinks !== null && drink.drinks.length === 1) {
        id = drink.drinks[0].idDrink;
        history = `${path}/${id}`;
      }

      dispatch(initialRecipesAction(drink));
      dispatch(getRecipesAction(drink, history));
    }
    dispatch(getBoolAction(true));
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
export { emailAction, searchAction, getBoolAction };
