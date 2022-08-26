import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipesAction, searchAction } from '../redux/actions';

function Recipes({ requestApi, recipes, categories, dispatchApi }) {
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState(0);
  const iter = 12;
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');
  const keyApi = path[1] === 'foods' ? 'Meal' : 'Drink';
  const api = path[1] === 'foods' ? 'meals' : 'drinks';
  useEffect(() => { requestApi(path[1]); }, [filter]);
  const len = 5;
  const auxCategories = [];
  const condition = recipes[api] !== undefined;
  const auxIds = [];
  if (condition) {
    const lenEl = 12;
    recipes[api].forEach((i, j) => j < lenEl && auxIds.push(Object.values(i)[0]));
  }

  categories.slice(0, len).forEach((i) => auxCategories.push(Object.values(i)[0]));

  return (
    <div>
      {auxCategories.map((i, index) => (
        <button
          type="button"
          key={ index }
          value={ i }
          data-testid={ `${i}-category-filter` }
          onClick={ ({ target }) => {
            dispatchApi(target.value, 'filtered', pathname); setSearch(search + 1);
            if (search > 0) {
              setSearch(0); setFilter(!filter);
            }
          } }
        >
          {i}
        </button>))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilter(!filter) }
      >
        All
      </button>

      {
        recipes[api]?.length > 0
        && recipes[api].map((i, index) => index < iter && (
          <button
            type="button"
            data-testid={ `${index}-recipe-card` }
            key={ index }
            onClick={ () => history.push(`${pathname}/${auxIds[index]}`) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ i[`str${keyApi}Thumb`] }
              alt={ i[`str${keyApi}`] }
              width="30%"
            />

            <p data-testid={ `${index}-card-name` }>{i[`str${keyApi}`]}</p>
          </button>
        ))
      }

    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.array,
  requestApi: PropTypes.func,
}.isRequired;
const mapDispatchToProps = (dispatch) => ({
  requestApi: (path) => dispatch(recipesAction(path)),
  dispatchApi: (inputValue, order, path) => dispatch(
    searchAction(inputValue, order, path),
  ),
});
const mapStateToProps = (state) => ({
  recipes: state.user.recipes,
  categories: state.user.categories,
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
