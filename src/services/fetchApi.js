export const mealApi = async (inputValue, order) => {
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
  return data;
};

export const drinkApi = async (inputValue, order) => {
  let response = '';
  try {
    if (order === 'ingredient') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    }
    if (order === 'name') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    }
    if (order === 'first-letter') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue[0]}`);
    }
    const drinkObj = await response.json();
    if (drinkObj.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    return drinkObj;
  } catch (e) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export const mealApiId = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const meal = await response.json();
  return meal;
};

export const drinkApiId = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const drink = await response.json();
  return drink;
};
