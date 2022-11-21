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
      <span className="span-margin" />
      <nav>
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
        >
          All
        </button>
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          // onClick={ (element) => handleFilterRecipes(element) }
        >
          Foods
        </button>
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          // onClick={ (element) => handleFilterRecipes(element) }
        >
          Drinks
        </button>
      </nav>
      <div className="container-recipes">
        {
          listRecipes.map((item, index) => (
            item.type === 'food' ? (
              <div key={ index } className="card-favorite">
                <img
                  className="img-favorite"
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <div className="container-favorite">
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                    className="title-recipes"
                  >
                    { item.name }
                  </h2>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="category"
                  >
                    { `${item.nationality} - ${item.category}` }
                  </p>

                  <div className="btn-margin">
                    <button type="button">
                      <img
                        src={ shareIcon }
                        alt="share"
                        data-testid={ `${index}-horizontal-share-btn` }
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
                </div>
              </div>
            ) : (
              <div
                className="container-recipes"
                key={ index }
              >
                <div className="card-favorite">
                  <img
                    className="img-favorite"
                    src={ item.image }
                    alt={ item.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <div className="container-favorite">
                    <h2
                      data-testid={ `${index}-horizontal-name` }
                      className="title-recipes"
                    >
                      { item.name }
                    </h2>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="category"
                    >
                      { `${item.category} - ${item.alcoholicOrNot}`}
                    </p>
                    <div className="btn-margin">
                      <button type="button">
                        <img
                          src={ shareIcon }
                          alt="share"
                          data-testid={ `${index}-horizontal-share-btn` }
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
                  </div>
                </div>
              </div>
            )))
        }
      </div>
    </div>

  );
}

export default FavoriteRecipes;
