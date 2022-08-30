import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailsAction } from '../redux/actions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress({ requestApi, recipe }) {
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/');
  const idRecipe = id[id.length - 2];
  const path = id[1];
  const [item, setItem] = useState('');
  const [line, setLine] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clicked, setClicked] = useState(false);

  let objToStore = {};
  let test = '';

  const checkFavorite = async (key) => {
    const previous = JSON.parse(localStorage.getItem(key));
    console.log(previous);
    if (previous) {
      const test2 = previous.some((i) => i.id === idRecipe);
      console.log(test2);
      setClicked(test2);
    }
  };

  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(
      path === 'foods' ? 'Meal' : 'Drink',
    );
    test = recipe;
    console.log(recipe);
  }, []);
  const sendToLocalStorage = (key, obj) => {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous) {
      localStorage.setItem(key, JSON.stringify([...previous, obj]));
    }
    if (!previous) {
      localStorage.setItem(key, JSON.stringify([obj]));
    }
  };

  const getClipBoard = async (arg) => {
    const time = 5000;
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

  const handleClick = (event) => {
    const { checked, value } = event.target;
    setLine(value);
    if (checked) {
      setLine(true);
    } else {
      setLine(false);
    }
  };

  const renderIngredients = (elem) => {
    const keysIngredients = Object.keys(recipe[0])
      .filter((e) => e.includes('Ingredient'));
    return keysIngredients
      .map((e, i) => {
        const measure = `strMeasure${i + 1}`;
        if (elem[e] !== null && elem[e] !== '') {
          return (
            <div>
              <p
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${elem[e]} - ${elem[measure]}`}
              </p>
              <label
                htmlFor={ e }
                data-testid={ `${i}-ingredient-step` }
                className={ line ? 'risca' : '' }
              >
                <input
                  name={ e }
                  value={ i }
                  type="checkbox"
                  onClick={ handleClick }
                />
              </label>
            </div>
          );
        }
        return '';
      });
  };

  return (
    <div>
      Recipe In progress
      {recipe.map((e) => (
        <section key={ e[`id${item}`] }>
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
          <input
            type="image"
            data-testid="share-btn"
            onClick={ () => {
              getClipBoard(`http://localhost:3000/${path}/${idRecipe}`);
            } }
            src={ shareIcon }
            alt="ShareIcon"
          />
          { copied && <p>Link copied! </p>}

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
              checkFavorite('favoriteRecipes');
            } }
            src={ clicked ? blackHeartIcon : whiteHeartIcon }
            alt="Favorito"
          />
          <button
            type="button"
            name="finish"
            // onClick={ () => history.push(`${window.location.pathname}/in-progress`) }
            data-testid="finish-recipe-btn"
          >
            finish
          </button>

        </section>

      ))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  requestApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.user.details,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: (path, id) => dispatch(detailsAction(path, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
