import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAction } from '../redux/actions';

function SearchBar({ dispatchApi, historyToProps }) {
  const [order, setOrder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  if (historyToProps) {
    history.push(historyToProps);
  }

  return (
    <div className="container-search">
      <div className="container-input">
        <input
          className="input-search"
          type="text"
          data-testid="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
        <button
          className="btn-search"
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
      <div className="container-radio">
        <label htmlFor="ingredient" className="radio-search">
          <input
            id="ingredient"
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            name="order"
            onClick={ ({ target }) => { setOrder(target.value); } }
          />
          Ingredient
        </label>
        <label htmlFor="name" className="radio-search">
          <input
            id="name"
            type="radio"
            value="name"
            data-testid="name-search-radio"
            name="order"
            onClick={ ({ target }) => setOrder(target.value) }
          />
          Name
        </label>
        <label htmlFor="letter" className="radio-search">
          <input
            id="letter"
            type="radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
            name="order"
            onClick={ ({ target }) => { setOrder(target.value); } }
          />
          Letter
        </label>
      </div>
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
