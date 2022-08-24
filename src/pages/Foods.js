import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods({ mealsToProps, searchToProps }) {
  useEffect(() => { }, [mealsToProps]);
  const iter = 11;
  const condition = (mealsToProps !== undefined && mealsToProps.meals !== null);
  return (
    <div>
      <Header page="Foods" />
      <div className="food-card">
        {searchToProps && condition && (
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
