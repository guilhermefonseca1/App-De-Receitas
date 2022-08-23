import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAction } from '../redux/actions';

function SearchBar({ dispatchApi }) {
  const [order, setOrder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  console.log(history);

  return (
    <div>
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
          dispatchApi(inputValue, order);
        } }
      >
        Search
      </button>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchApi: (arg1, arg2) => dispatch(searchAction(arg1, arg2)),
});

SearchBar.propTypes = { dispatchApi: PropTypes.func.isRequired };
export default connect(null, mapDispatchToProps)(SearchBar);
