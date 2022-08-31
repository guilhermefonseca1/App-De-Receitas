import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import RecipeInProgress from '../pages/RecipeInProgress';
import { screen } from '@testing-library/react';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('Tests page Recipes in progress', () => {
  const RECIPE = 'RECIPE';

  const getRecipesAction = (data, history) => ({
    type: RECIPE,
    recipes: data,
    history,
  });

  const initialState = {
    user: {
      email: '',
      recipes: [],
      history: '',
      searched: false,
      details: [],
      categories: []
    }
  }

  afterEach(() => {
    jest.resetAllMocks();
  });
 
  it('Test route to page', () => {
  const { history } =  renderWithRouterAndRedux(<RecipeInProgress />)
  history.push('/foods/53060/in-progress')
  const { pathname } = history.location;
  expect(pathname).toBe('/foods/53060/in-progress');
  });
  
  it('Test page buttons on drinks', async () => {
      const {history} = renderWithRouterAndRedux(<App />);
      history.push('/drinks/17222/in-progress')
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/17222/in-progress');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(shareBtn).toBeInTheDocument()
    expect(favoriteBtn).toBeInTheDocument()
    expect(finishBtn).toBeInTheDocument()
  });
  
  it('Test title', () => {
    renderWithRouterAndRedux(<RecipeInProgress />)
   const title = screen.getByText(/recipe in progress/i)
   expect(title).toBeInTheDocument()
   });

   it('test recipe elemts in drinks', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    history.push('/drinks/17222/in-progress');
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/17222/in-progress');
    const recipeBtn = await screen.findByTestId("favorite-btn")
    expect(recipeBtn).toBeDefined();
  });
  })

