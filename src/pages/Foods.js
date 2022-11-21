import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Foods({ mealsToProps, searchToProps }) {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const iter = 12;
  const condition = (mealsToProps !== undefined && mealsToProps.meals !== null);
  return (
    <div>
      <Header page="Foods" />
      <span className="span-margin" />
      <div className="container-recipes">
        {searchToProps && condition ? (
          mealsToProps.meals.map((i, index) => index < iter && (
            <button
              type="button"
              className="card-recipe"
              onClick={ () => history.push(`${pathname}/${i.idMeal}`) }
            >
              <p data-testid={ `${index}-recipe-card` } />
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strMealThumb }
                alt={ i.strMeal }
                className="img-recipes"
              />

              <p
                data-testid={ `${index}-card-name` }
                className="title-recipes"
              >
                {i.strMeal}

              </p>
            </button>
          ))) : <div><Recipes /></div>}
      </div>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  mealsToProps: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ user }) => ({
  mealsToProps: user.recipes,
  searchToProps: user.searched,
});

export default connect(mapStateToProps)(Foods);
