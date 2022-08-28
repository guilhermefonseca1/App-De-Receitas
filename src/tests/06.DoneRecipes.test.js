import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Tests to page recipes', () => {
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

  it('Verify if the component DoneRecipes renders correctly', async () => {
    const {history} = renderWithRouterAndRedux(<App/>);
    history.push('/done-recipes');

    expect(history.location.pathname).toBe('/done-recipes');

    const doneRecipes = await screen.findByTestId('filter-by-all-btn');
    expect(doneRecipes).toBeDefined();
    
});
});