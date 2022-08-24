import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchAction } from '../redux/actions';

function Recipes({ requestApi, recipes }) {
  const iter = 11;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');
  console.log(path);
  const keyApi = path[1] === 'foods' ? 'Meal' : 'Drink';

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      {/* {
        recipes.meals.map((i, index) => index < iter && (
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
  requestApi: () => dispatch(searchAction()),
});
const mapStateToProps = (state) => ({
  recipes: state.user.recipes,
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
