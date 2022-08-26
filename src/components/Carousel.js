import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SimpleSlider({ recipes }) {
  const six = 6;
  const iter = six;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');
  const suggestion = path[1] === 'foods' ? 'drinks' : 'meals';
  const keySuggestion = path[1] === 'foods' ? 'Drink' : 'Meal';
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <div className="container-carousel">
      <h2>Recommended</h2>
      <Slider { ...settings }>
        {
          recipes[suggestion]?.length > 0
        && recipes[suggestion].map((i, index) => index < iter && (
          <div
            data-testid={
              `${index}-recomendation-card`
            }
            key={ index }
            className="card-carousel"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ i[`str${keySuggestion}Thumb`] }
              alt={ i[`str${keySuggestion}`] }
              className="img-carousel"
            />

            <p data-testid={ `${index}-recomendation-title` }>
              {i[`str${keySuggestion}`]}
            </p>
          </div>
        ))
        }
      </Slider>
    </div>
  );
}

SimpleSlider.propTypes = {
  recipes: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.user.details,
  recipes: state.user.recipes,
});

export default connect(mapStateToProps)(SimpleSlider);
