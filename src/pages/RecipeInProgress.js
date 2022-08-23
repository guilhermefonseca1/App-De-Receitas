import React from 'react';
import { connect } from 'react-redux';

function RecipeInProgress(props) {
  // const getRecipesuser = (data, history) => ({
  //   type: RECIPE,
  //   recipes: data,
  //   history,
  // });
  console.log(props);
  return (
    <div>
      Recipe In Progress
      <img
        id="img"
        type="img"
        data-testid="recipe-photo"
        src=""
        alt=""
      />
      imagem
      <h1
        id="title"
        type="text"
        data-testid="recipe-title"
      >
        titulo
      </h1>
      <button
        id="buttonShare"
        type="button"
        data-testid="recipe-share-btn"
      >
        compartilhar
      </button>
      <button
        id="buttonFavorite"
        type="button"
        data-testid="recipe-favorite-btn"
      >
        favoritar
      </button>
      <span
        id="category"
        type="text"
        data-testid="recipe-category"
      >
        texte da categoria
      </span>
      <li
        id="ingridient"
        type="text"
        // data-testid={ `${index}-ingredient-step` }
      >
        ingredientes
      </li>
      <span
        id="instructions"
        type="text"
        data-testid="recipe-instructions"
      >
        instrucoes
      </span>
      <button
        id="buttonFinish"
        type="button"
        data-testid="recipe-finish-recipe-btn"
      >
        finalizar receita
      </button>

    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  recipes: user.recipes,
  historyToProps: user.history,
});

export default connect(mapStateToProps)(RecipeInProgress);
