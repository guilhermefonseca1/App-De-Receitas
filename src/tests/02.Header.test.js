import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from "@testing-library/user-event";
import {screen} from "@testing-library/react"
import Foods from '../pages/Foods';

describe('Tests the Header component', () => {
  it('Tests if components render correctly',()=> {
    renderWithRouterAndRedux(<Foods />)
    const btnSearch = screen.getByTestId('search-top-btn')
    const btnProfile = screen.getByTestId('profile-top-btn');
    const titleFood = screen.getByRole("heading", { name: /foods/i });
  
    expect(btnProfile).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    expect(titleFood).toBeInTheDocument();
   
  });
  it('Tests if header can be redirect to profile', ()=> {
    const {history} = renderWithRouterAndRedux(<Foods />)

    const btnProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');

    const imgProfile = screen.getByRole('img', { name: /icon\-profile/i })
    expect(imgProfile).toHaveAttribute('src', 'profileIcon.svg')
  });

  it('Tests if after button is clicked, input is rendered ',()=> {
    renderWithRouterAndRedux(<Foods />)
    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});