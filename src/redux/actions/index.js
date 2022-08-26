import { mealApi, drinkApi, drinkApiId, mealApiId } from '../../services/fetchApi';

export const LOGIN = 'LOGIN';
export const RECIPE = 'RECIPE';
export const DETAILS = 'DETAILS';
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

const detailsRecipes = (details) => ({
  type: DETAILS,
  details,
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

      dispatch(getRecipesAction(meal, history));
    }
    if (path === '/drinks') {
      const drink = await drinkApi(inputValue, order);
      if (drink !== undefined && drink.drinks !== null && drink.drinks.length === 1) {
        id = drink.drinks[0].idDrink;
        history = `${path}/${id}`;
      }
      dispatch(getRecipesAction(drink, history));
    }
    dispatch(getBoolAction(true));
  };
}

function detailsAction(path, id) {
  return async (dispatch) => {
    // if (bool === true && path === 'foods') {

    // }
    // if (bool === true && path === 'drinks') {

    // }
    if (path === 'foods') {
      const drink = await drinkApi();
      console.log(drink);
      dispatch(initialRecipesAction(drink));
      const detailsRecipe = await mealApiId(id);
      dispatch(detailsRecipes(detailsRecipe.meals));
    }
    if (path === 'drinks') {
      const meal = await mealApi();
      console.log(meal);
      dispatch(initialRecipesAction(meal));
      const detailsRecipe = await drinkApiId(id);
      dispatch(detailsRecipes(detailsRecipe.drinks));
    }
  };
}

function recipesAction(path) {
  return async (dispatch) => {
    if (path === 'foods') {
      const meal = await mealApi();
      dispatch(initialRecipesAction(meal));
    }
    if (path === 'drinks') {
      const drink = await drinkApi();
      dispatch(initialRecipesAction(drink));
    }
  };
}
export { emailAction, searchAction, getBoolAction, detailsAction, recipesAction };
