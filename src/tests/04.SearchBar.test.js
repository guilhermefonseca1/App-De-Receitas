import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { useLocation } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import SearchBar from '../components/SearchBar';
import Foods from '../pages/Foods';
import { getByTestId, screen } from '@testing-library/react';

describe('Tests the Login component', () => {
  it('checks if the text is rendered while typing', () => {
    renderWithRouterAndRedux(<SearchBar />)
    const inputText = screen.getByTestId('search-input');
    userEvent.type(inputText,'nome')
    expect('nome').toBeDefined()
  })
  it('checks the global alert', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const name = screen.getByTestId("name-search-radio")
    userEvent.click(name)
    userEvent.type(inputText, "nome")
    userEvent.click(button)
    expect('Your search must have only 1 (one) character').toBeDefined()
  })
  it('checks the page details', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const ingredient = screen.getByTestId("ingredient-search-radio")
    userEvent.click(ingredient);
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const letter = screen.getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    renderWithRouterAndRedux(<SearchBar/>)
    const inputText = screen.getByTestId('search-input');
    const button = screen.getByTestId("exec-search-btn")
    const letter = screen.getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'c')
    userEvent.click(button)
  })
});