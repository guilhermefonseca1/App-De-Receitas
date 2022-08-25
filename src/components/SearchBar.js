import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAction } from '../redux/actions';

function SearchBar({ dispatchApi, historyToProps }) {
  console.log(historyToProps);
  const [order, setOrder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  if (historyToProps) {
    console.log('entra no if');
    history.push(historyToProps);
  }

  return (
    <div className="container-search">
      <div className="container-input">
        <input
          type="text"
          data-testid="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            if (inputValue.length > 1 && order === 'first-letter') {
              global.alert('Your search must have only 1 (one) character');
            }
            dispatchApi(inputValue, order, pathname);
          } }
        >
          Search
        </button>
      </div>
      <label htmlFor="search">
        <input
          type="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          name="order"
          onClick={ ({ target }) => { setOrder(target.value); } }
        />
        Ingredient
        <input
          type="radio"
          value="name"
          data-testid="name-search-radio"
          name="order"
          onClick={ ({ target }) => setOrder(target.value) }
        />
        Name
        <input
          type="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
          name="order"
          onClick={ ({ target }) => { setOrder(target.value); } }
        />
        Letter
      </label>

    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  historyToProps: user.history,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchApi: (inputValue, order, path) => dispatch(
    searchAction(inputValue, order, path),
  ),
});

SearchBar.propTypes = {
  dispatchApi: PropTypes.func.isRequired,
  idToProps: PropTypes.any,
  recipesToProps: PropTypes.shape({
    drinks: PropTypes.shape({
      length: PropTypes.number,
    }),
    meals: PropTypes.shape({
      length: PropTypes.number,
    }),
  }),
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
