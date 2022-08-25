import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipesAction } from '../redux/actions';

function Recipes({ requestApi, recipes }) {
  const iter = 12;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');
  console.log(path[1]);
  const keyApi = path[1] === 'foods' ? 'Meal' : 'Drink';

  useEffect(() => {
    requestApi(path[1]);
  }, []);
  console.log(recipes.meals);
  console.log(recipes.drinks);
  return (
    <div>

      {
        recipes.meals?.length > 0
        && recipes.meals.map((i, index) => index < iter && (
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



      {/* {
        recipes.drinks?.length > 0
        && recipes.drinks.map((i, index) => index < iter && (
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
      } */}

    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  requestApi: (path) => dispatch(recipesAction(path)),
});
const mapStateToProps = (state) => ({
  recipes: state.user.recipes,
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
