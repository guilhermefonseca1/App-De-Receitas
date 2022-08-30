import React, { useState, useEffect } from 'react';
import ElementsDoneRecipes from '../components/ElementsDoneRecipes';
import Header from '../components/Header';
// import '../style/DoneRecipes.css';

function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState([]);

  const doneRecipes = () => {
    if (localStorage.getItem('doneRecipes')) {
      setFilterRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  };

  useEffect(() => {
    doneRecipes();
  }, []);

  const handleFilterRecipes = ({ target }) => {
    const { name } = target;
    doneRecipes();
    if (name !== 'all') {
      const newRecipes = filterRecipes.filter((item) => item.type === name);
      setFilterRecipes(newRecipes);
    }
  };
  return (
    <div className="doneRecipes">
      <Header page="Done Recipes" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ (element) => handleFilterRecipes(element) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ (element) => handleFilterRecipes(element) }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ (element) => handleFilterRecipes(element) }
        >
          Drinks
        </button>
      </div>
      <ElementsDoneRecipes doneRecipes={ filterRecipes } />
    </div>
  );
}

export default DoneRecipes;
