import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods({ mealsToProps, searchToProps }) {
  useEffect(() => { }, [mealsToProps]);
  if (searchToProps && mealsToProps.meals.length === 0) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  const iter = 11;
  return (
    <div>
      <Header page="Foods" />
      <div className="food-card">
        {searchToProps && (
          mealsToProps.meals.map((i, index) => index < iter && (
            <>
              <p data-testid={ `${index}-recipe-card` } />
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strMealThumb }
                alt={ i.strMeal }
                width="30%"
              />

              <p data-testid={ `${index}-card-name` }>{i.strMeal}</p>
            </>
          )))}
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
