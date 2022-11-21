import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { detailsAction } from '../redux/actions';
import SimpleSlider from '../components/Carousel';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({ requestApi, recipe }) {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState(0);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/');
  const path = id[id.length - 2];
  const idRecipe = id[id.length - 1];
  const [item, setItem] = useState('');

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

  let objToStore = {};
  useEffect(() => {
    requestApi(path, idRecipe);
    setItem(path === 'foods' ? 'Meal' : 'Drink');
    checkFavorite('favoriteRecipes');
  }, []);

  const renderIngredients = (elem) => {
    const keysIngredients = Object.keys(recipe[0])
      .filter((e) => e.includes('Ingredient'));
    return keysIngredients
      .map((e, i) => {
        const measure = `strMeasure${i + 1}`;
        if (elem[e] !== null && elem[e].length > 0) {
          return (
            <tr
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <td className="ingredient">{elem[e]}</td>
              <td className="quantity">{elem[measure]}</td>
            </tr>
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

      {recipe.map((e) => (
        <section key={ e[`id${item}`] } className="container-details">
          <img
            src={ e[`str${item}Thumb`] }
            alt="Recipe"
            data-testid="recipe-photo"
            className="img-details"
          />
          <div className="container-title">
            <h1
              className="title-details"
              data-testid="recipe-title"
            >
              {e[`str${item}`]}

            </h1>
            <div>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  getClipBoard(`http://localhost:3000${pathname}`);
                } }
              >
                <img src={ shareIcon } alt="Share" />
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
            {`Category: ${e.strCategory}`}
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
              {renderIngredients(e)}
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
