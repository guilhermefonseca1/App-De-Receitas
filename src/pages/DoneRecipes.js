import React from 'react';
import ElementsDoneRecipes from '../components/ElementsDoneRecipes';

import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header page="Done Recipes" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <ElementsDoneRecipes />
    </div>
  );
}

export default DoneRecipes;
