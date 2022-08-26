import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailsAction } from '../redux/actions';

function RecipeDetails({ requestApi, recipe }) {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const id = pathname.split('/');
  const path = id[id.length - 2];
  const idRecipe = id[id.length - 1];
  const [item, setItem] = useState('');
  const renderIngredients = (elem) => {
    const keysIngredients = Object.keys(recipe[0])
      .filter((e) => e.includes('Ingredient'));
    return keysIngredients
      .map((e, i) => {
        const measure = `strMeasure${i + 1}`;
        if (elem[e] !== null) {
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

  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(
      path === 'foods' ? 'Meal' : 'Drink',
    );
  }, []);
  return (
    <div>
      Recipe Details
      {recipe.map((e, i) => (
        <section key={ e[`id${item}`] }>
          <h1 data-testid="recipe-title">{e[`str${item}`]}</h1>
          <h3 data-testid="recipe-category">
            Category:
            {e.strCategory}
            <button
              type="button"
              onClick={ () => history.push(`${window.location.pathname}/in-progress`) }
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </h3>
          {path === 'drinks' && <h4 data-testid="recipe-category">{e.strAlcoholic}</h4>}
          <img
            src={ e[`str${item}Thumb`] }
            alt="Recipe"
            width="30%"
            data-testid="recipe-photo"
          />
          <h3>Ingredients</h3>
          { renderIngredients(e)}
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
          <p data-testid={ `${i}-recomendation-card` }>Sugestões</p>
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
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: (path, id) => dispatch(detailsAction(path, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
