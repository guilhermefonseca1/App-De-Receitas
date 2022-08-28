import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './style/ElementsDoneRecipes.css';

function ElementsDoneRecipes() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const MAGIC_NUMBER = 2;
  return (
    <section>
      {
        doneRecipes.map((item, index) => (
          <div className="doneRecipesItem" key={ index }>
            <Link to={ `/${item.type}s/${item.id}` }>
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
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  className="shareIconDoneRecipesItem"
                />
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

export default ElementsDoneRecipes;
