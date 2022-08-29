import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { detailsAction } from '../redux/actions';
import SimpleSlider from '../components/Carousel';

const copy = require('clipboard-copy');

function RecipeDetails({ requestApi, recipe }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/');
  const path = id[id.length - 2];
  const idRecipe = id[id.length - 1];
  const [item, setItem] = useState('');
  // const [local, setLocal] = useState(false);
  // const getToLocalStorage = () => {
  //   const recipeLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   return setLocal(recipeLocal);
  // };

  const sendToLocalStorage = (key, obj) => {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous) {
      localStorage.setItem(key, JSON.stringify([...previous, obj]));
    }
    if (!previous) {
      localStorage.setItem(key, JSON.stringify([obj]));
    }
  };

  const checkFavorite = (key) => {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous) {
      return previous.some((i) => i.id === recipe[0][`id${item}`]);
    }
  };

  let objToStore = {};
  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(path === 'foods' ? 'Meal' : 'Drink');
    // getToLocalStorage();
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

  const getClipBoard = async (arg) => {
    const time = 1000;
    await copy(arg).then(setCopied(true));
    setInterval(() => setCopied(false), time);
  };

  const getAlcohol = (obj) => {
    if (path === 'foods') {
      return '';
    }
    return obj.strAlcoholic;
  };

  const getNationality = (obj) => {
    if (path === 'foods') {
      return obj.strArea;
    }
    return '';
  };

  return (
    <div>
      { copied && <p>Link copied! </p>}
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
            onClick={ () => {
              getClipBoard(`http://localhost:3000${pathname}`);
            } }
          >
            Share
          </button>

          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => {
              const sliced = -1;
              objToStore = {
                id: e[`id${item}`],
                type: path.slice(0, sliced),
                nationality: getNationality(e),
                category: e.strCategory,
                alcoholicOrNot: getAlcohol(e),
                name: e[`str${item}`],
                image: e[`str${item}Thumb`] };

              sendToLocalStorage('favoriteRecipes', objToStore);
            } }
            src={ checkFavorite('favoriteRecipes') ? blackHeartIcon : whiteHeartIcon }
            alt="Favorito"
          />

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
            {/* {local
            && local[`str${item}`] === e[`str${item}`]
              ? 'Continue Recipe' : 'Start Recipe'} */}
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
