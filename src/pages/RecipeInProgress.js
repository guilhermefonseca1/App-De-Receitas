import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailsAction } from '../redux/actions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const auxArray = [];

function RecipeInProgress({ requestApi, recipe }) {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const id = pathname.split('/');
  const idRecipe = id[id.length - 2];
  const path = id[1];
  const [item, setItem] = useState('');
  const [line, setLine] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState(0);
  const [button, setButton] = useState(true);
  const [newArray, setNewArray] = useState([]);

  let objToStore = {};

  const sendToLocalStorage = (key, obj, filter) => {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous && filter === '') {
      localStorage.setItem(key, JSON.stringify([...previous, obj]));
    }
    if (!previous) {
      localStorage.setItem(key, JSON.stringify([obj]));
    }
    if (previous && filter === 'filter') {
      localStorage.setItem(key, JSON.stringify(previous.filter((i) => i.id !== obj.id)));
    }
  };

  const checkFavorite = (key) => {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous) {
      const test = previous.some((i) => i.id === idRecipe);
      setClicked(test);
    }
  };

  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(
      path === 'foods' ? 'Meal' : 'Drink',
    );
    checkFavorite('favoriteRecipes');
  }, []);

  useEffect(() => {
    if (recipe[0] !== undefined) {
      const arrayOfIngredients = Object.keys(recipe[0]).filter((e, i) => e
        .includes('strIngredient') && Object.values(recipe[0])[i] !== ''
        && Object.values(recipe[0])[i] !== null);
      setNewArray(arrayOfIngredients);
    }
  }, [recipe]);

  const handleClick = (event) => {
    const { checked, value } = event.target;
    auxArray.push(value);
    setLine(value);
    if (checked) {
      setLine(true);
    } else {
      setLine(false);
    }
    if (auxArray.length === newArray.length) {
      setButton(false);
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
            <tr className="container-checkbox">
              <td
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
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
                  <td className="ingredient">{elem[e]}</td>
                  <td className="quantity">{elem[measure]}</td>

                </label>
              </td>
            </tr>
          );
        }
        return '';
      });
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
  return (
    <div>
      {recipe.map((e) => (
        <section key={ e[`id${item}`] } className="container-details">
          <img
            src={ e[`str${item}Thumb`] }
            alt="Recipe"
            width="30%"
            data-testid="recipe-photo"
            className="img-details"
          />
          <div className="container-title">
            <h1 data-testid="recipe-title">{e[`str${item}`]}</h1>

            <div>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  getClipBoard(`http://localhost:3000/${path}/${idRecipe}`);
                } }

              >
                <img
                  src={ shareIcon }
                  alt="ShareIcon"
                />
              </button>
              <button
                type="button"
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
                  sendToLocalStorage('favoriteRecipes', objToStore, '');
                  setClicked(!clicked);
                  setSearch(search + 1);
                  if (search > 0) {
                    setSearch(0);
                    sendToLocalStorage('favoriteRecipes', objToStore, 'filter');
                  }
                } }

              >
                <img
                  src={ clicked ? blackHeartIcon : whiteHeartIcon }
                  alt="Favorito"
                />
              </button>
              { copied && <p>Link copied! </p>}
            </div>
          </div>
          <h3 data-testid="recipe-category" className="category">
            Category:
            {e.strCategory}
          </h3>
          {path === 'drinks'
          && (
            <h4
              data-testid="recipe-category"
              className="category"
            >
              {e.strAlcoholic}
            </h4>
          )}
          <h3 className="titles-details ">Ingredients</h3>
          <table>
            <tbody>
              { renderIngredients(e)}
            </tbody>
          </table>
          <h3 className="titles-details ">Instructions</h3>
          <p data-testid="instructions" className="instructions">{e.strInstructions}</p>
          {path === 'foods'
          && <iframe
            width="320"
            height="220"
            src={ e.strYoutube.replace('watch', 'embed') }
            data-testid="video"
            title={ e[`str${item}`] }
          />}

          <button
            className="btn-finish"
            type="button"
            name="finish"
            disabled={ button }
            onClick={ () => history.push('/done-recipes') }
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
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
