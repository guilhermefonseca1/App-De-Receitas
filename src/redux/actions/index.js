export const LOGIN = 'LOGIN';
export const RECIPE = 'RECIPE';

const emailAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

const getRecipesAction = (data) => ({
  type: RECIPE,
  recipes: data.meals,
});

function searchAction(inputValue, order) {
  return async (dispatch) => {
    let endpoint = '';
    if (order === 'ingredient') {
      endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    }
    if (order === 'name') {
      endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    }
    if (order === 'first-letter') {
      endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue[0]}`);
    }
    const data = await endpoint.json();
    dispatch(getRecipesAction(data));
  };
}

export { emailAction, searchAction };
