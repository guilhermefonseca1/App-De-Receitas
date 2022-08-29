import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './style/ElementsDoneRecipes.css';

const clipBoardCopy = require('clipboard-copy');

function ElementsDoneRecipes({ doneRecipes }) {
  const [urlOfPageCopied, setUrlOfPageCopied] = useState(false);

  const MAGIC_NUMBER = 2;

  const handleUrl = (item) => {
    const url = `http://localhost:3000/${item.type}s/${item.id}`;
    clipBoardCopy(url);
    setUrlOfPageCopied(true);
    const TIME = 2000;
    setTimeout(() => {
      setUrlOfPageCopied(false);
    }, TIME);
  };

  return (
    <section className="copyUrl">
      {
        urlOfPageCopied && <h2>Link copied!</h2>
      }
      {
        doneRecipes.map((item, index) => (
          <div className="doneRecipesItem" key={ index }>
            <Link to={ `/${item.type}s/${item.id}` } className="thumbImageItem">
              <img
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
                className="thumbImage"
              />
            </Link>
            <div className="containerDoneRecipesItem">
              <div className="shareDoneRecipesItem">
                {
                  item.type === 'food' ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { `${item.nationality} - ${item.category}` }
                    </p>
                  )
                    : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { item.category }
                        { item.alcoholicOrNot }
                      </p>
                    )
                }
                <button
                  type="button"
                  onClick={ () => handleUrl(item) }
                  className="buttonIcon"
                >
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="shareIconDoneRecipesItem"
                  />
                </button>
              </div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>
                  {item.name}
                </h3>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Done in: ${item.doneDate}`}
              </p>
              <ul>
                {
                  item.tags.slice(0, MAGIC_NUMBER).map((tag, indexTag) => (
                    <li
                      className="tagDoneRecipesItem"
                      key={ indexTag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        ))
      }
    </section>
  );
}

ElementsDoneRecipes.propTypes = {
  doneRecipes: PropTypes.arrayOf.isRequired,
};

export default ElementsDoneRecipes;
