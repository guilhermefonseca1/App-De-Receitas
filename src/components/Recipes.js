import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipesAction } from '../redux/actions';

function Recipes({ requestApi, recipes }) {
  const iter = 12;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');
  const keyApi = path[1] === 'foods' ? 'Meal' : 'Drink';
  const api = path[1] === 'foods' ? 'meals' : 'drinks';
  useEffect(() => {
    requestApi(path[1]);
  }, []);
  return (
    <div>

      {
        recipes[api]?.length > 0
        && recipes[api].map((i, index) => index < iter && (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ i[`str${keyApi}Thumb`] }
              alt={ i[`str${keyApi}`] }
              width="30%"
            />

            <p data-testid={ `${index}-card-name` }>{i[`str${keyApi}`]}</p>
          </div>
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
});
const mapStateToProps = (state) => ({
  recipes: state.user.recipes,
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
