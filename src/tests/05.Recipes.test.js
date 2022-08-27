import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
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

  it('Verify if when recipe button is clicked, the user is redirected to details page', async () => {
    const {history} = renderWithRouterAndRedux(<App/>);
    history.push('/foods');

    expect(history.location.pathname).toBe('/foods');

    const recipeBtn = await screen.findByTestId('0-recipe-card');
    expect(recipeBtn).toBeDefined();
    
    userEvent.click(recipeBtn);
    expect(history.location.pathname).toBe('/foods/52977');

    const recipeTitle = screen.findByRole('heading', { name: /Corba/i });
    expect(recipeTitle).toBeDefined();

    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(recipeImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    const category = await screen.findByText(/Category:Side/i);
    expect(category).toBeDefined();

  });
  it('Verify if the store state of meals changes', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const {store, history} = renderWithRouterAndRedux(<App/>, initialState);

    expect(store.getState().user).toEqual(initialState.user);

    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    
    expect(store.getState().user.recipes).toEqual(meals);

    const recipeBtn = await screen.findByTestId('0-recipe-card');
    userEvent.click(recipeBtn);
    expect(history.location.pathname).toBe('/foods/52977');
    expect(store.getState().user.details).toHaveLength(0);

    expect(screen.findByTestId('instructions')).toBeDefined();
  });
  it('Verify if getRecipesAction return the expected value', () => {
    const expectedResult = {
      type: RECIPE,
      recipes: meals,
      history: '',
    };

    expect(getRecipesAction(meals, '')).toEqual(expectedResult);
  });
  //
});