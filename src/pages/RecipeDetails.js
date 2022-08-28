import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailsAction } from '../redux/actions';
import SimpleSlider from '../components/Carousel';

function RecipeDetails({ requestApi, recipe }) {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/');
  const path = id[id.length - 2];
  const idRecipe = id[id.length - 1];
  const [item, setItem] = useState('');
  const sendToLocalStorage = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(path === 'foods' ? 'Meal' : 'Drink');
  }, []);

  const renderIngredients = (elem) => {
    const keysIngredients = Object.keys(recipe[0])
      .filter((e) => e.includes('Ingredient'));
    return keysIngredients
      .map((e, i) => {
        const measure = `strMeasure${i + 1}`;
        if (elem[e] !== null && elem[e].length > 0) {
          return (
            <p
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${elem[e]} - ${elem[measure]}`}
            </p>
          );
        }
        return '';
      });
  };

  return (
    <div>
      Recipe Details
      {recipe.map((e) => (
        <section key={ e[`id${item}`] } className="container-details">
          <h1 data-testid="recipe-title">{e[`str${item}`]}</h1>
          <h3 data-testid="recipe-category">
            Category:
            {e.strCategory}
          </h3>
          {path === 'drinks' && <h4 data-testid="recipe-category">{e.strAlcoholic}</h4>}
          <img
            src={ e[`str${item}Thumb`] }
            alt="Recipe"
            width="30%"
            data-testid="recipe-photo"
          />
          <h3>Ingredients</h3>
          <button
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <div>{renderIngredients(e)}</div>

          <h3>Instructions</h3>
          <p data-testid="instructions">{e.strInstructions}</p>
          {path === 'foods'
              && <iframe
                width="320"
                height="220"
                src={ e.strYoutube }
                data-testid="video"
                title={ e[`str${item}`] }
              />}
          <SimpleSlider />
          <button
            className="startRecipes"
            type="button"
            data-testid="start-recipe-btn"
            name="Start Recipe"
            htmlFor="Start Recipe"
            onClick={ () => {
              sendToLocalStorage('inProgressRecipes', e);
              history.push(`${pathname}/in-progress`);
            } }
          >
            Continue Recipe
          </button>
        </section>

      ))}
    </div>
  );
}
RecipeDetails.propTypes = {
  requestApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.user.details,
  recipes: state.user.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: (path, id) => dispatch(detailsAction(path, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
