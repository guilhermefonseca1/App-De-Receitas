import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks({ drinksToProps, searchToProps }) {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const iter = 12;
  const condition = (drinksToProps !== undefined && drinksToProps.drinks !== null);
  return (
    <div>
      <Header page="Drinks" />
      <span className="span-margin" />
      <div className="container-recipes">
        {condition && searchToProps ? (
          drinksToProps.drinks.map((i, index) => index < iter && (
            <button
              type="button"
              className="card-recipe"
              onClick={ () => history.push(`${pathname}/${i.idDrink}`) }
            >

              <p data-testid={ `${index}-recipe-card` } />
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strDrinkThumb }
                alt={ i.strDrink }
                className="img-recipes"
              />

              <p
                data-testid={ `${index}-card-name` }
                className="title-recipes"
              >
                {i.strDrink}

              </p>
            </button>

          ))
        ) : <div><Recipes /></div> }
      </div>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  drinksToProps: PropTypes.shape({
    drinks: PropTypes.shape({
      map: PropTypes.func,
    }),
  }),
  searchToProps: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  drinksToProps: user.recipes,
  searchToProps: user.searched,
});

export default connect(mapStateToProps)(Drinks);
