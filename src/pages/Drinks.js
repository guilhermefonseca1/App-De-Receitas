import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { drinkCategories } from '../services/fetchApi';

function Drinks({ drinksToProps, searchToProps }) {
  useEffect(() => { drinkCategories(); }, []);
  const iter = 12;
  const condition = (drinksToProps !== undefined && drinksToProps.drinks !== null);
  return (
    <div>
      <Header page="Drinks" />
      <div className="drinks-card">
        {condition && searchToProps ? (
          drinksToProps.drinks.map((i, index) => index < iter && (
            <div>
              <p data-testid={ `${index}-recipe-card` } />
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strDrinkThumb }
                alt={ i.strDrink }
                width="30%"
              />

              <p data-testid={ `${index}-card-name` }>{i.strDrink}</p>
            </div>
          ))
        ) : <Recipes /> }
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
