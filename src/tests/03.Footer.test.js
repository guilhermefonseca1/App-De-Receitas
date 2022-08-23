import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/react";
import Foods from '../pages/Foods';

describe('Tests the Footer component', () => {
  it('Tests if components render correctly',()=> {
    renderWithRouterAndRedux(<Foods />);
    const btnDrinks = screen.getByTestId('drinks-bottom-btn')
    const btnFood = screen.getByTestId('food-bottom-btn');
  
    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
   
  });
  it('Tests if Footer can be redirect to foods or drinks', ()=> {
    const {history} = renderWithRouterAndRedux(<Foods />);

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnFood = screen.getByTestId('food-bottom-btn');

    userEvent.click(btnDrinks);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(btnFood);
    expect(history.location.pathname).toBe('/foods');
    const imgDrinks = screen.getByRole('img', { name: /drink/i });
    expect(imgDrinks).toHaveAttribute('src', 'drinkIcon.svg');
    const imgFoods = screen.getByRole('img', { name: /meal/i });
    expect(imgFoods).toHaveAttribute('src', 'mealIcon.svg');
  });

});