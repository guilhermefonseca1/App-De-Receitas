import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [listRecipes, setListRecipes] = useState([]);
  useEffect(() => {
    const searchItem = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [{ id: 52771,
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];
    setListRecipes(searchItem);
  }, []);
  return (
    <div>
      <Header page="Favorite Recipes" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          // onClick={ (element) => handleFilterRecipes(element) }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          // onClick={ (element) => handleFilterRecipes(element) }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          listRecipes.map((item, index) => (
            item.type === 'food' ? (
              <div key={ index }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { item.name }
                </h2>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${item.nationality} - ${item.category}` }
                </p>
                <p>
                  { item.nationality }
                </p>
                <button type="button">
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="shareIconDoneRecipesItem"
                  />
                </button>
                <button
                  type="button"
                >
                  <img
                    src={ blackHeartIcon }
                    alt="favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            ) : (
              <div
                key={ index }
              >
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { item.name }
                </h2>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { item.category }
                  { item.alcoholicOrNot }
                </p>
                <p>
                  { item.nationality }
                </p>
                <p>
                  { item.alcoholicOrNot }
                </p>
                <button type="button">
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="shareIconDoneRecipesItem"
                  />
                </button>
                <button
                  type="button"
                >
                  <img
                    src={ blackHeartIcon }
                    alt="favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            )))
        }
      </div>
    </div>

  );
}

export default FavoriteRecipes;
