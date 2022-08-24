import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { useLocation } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import SearchBar from '../components/SearchBar';
import Foods from '../pages/Foods';

describe('Tests the Login component', () => {
  it('checks if the text is rendered while typing', () => {
    const {getByTestId} = renderWithRouterAndRedux(<SearchBar />)
    const inputText = getByTestId('search-input');
    userEvent.type(inputText,'nome')
    expect('nome').toBeDefined()
  })
  it('checks the global alert', () => {
    const {getByTestId} = renderWithRouterAndRedux(<SearchBar/>)
    const inputText = getByTestId('search-input');
    const button = getByTestId("exec-search-btn")
    const name = getByTestId("name-search-radio")
    userEvent.click(name)
    userEvent.type(inputText, "nome")
    userEvent.click(button)
    expect('Your search must have only 1 (one) character').toBeDefined()
  })
  it('checks the page details', () => {
    const {getByTestId } = renderWithRouterAndRedux(<SearchBar/>)
    const inputText = getByTestId('search-input');
    const button = getByTestId("exec-search-btn")
    const ingredient = getByTestId("ingredient-search-radio")
    userEvent.click(ingredient)
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    const {getByTestId } = renderWithRouterAndRedux(<SearchBar/>)
    const inputText = getByTestId('search-input');
    const button = getByTestId("exec-search-btn")
    const letter = getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'chicken')
    userEvent.click(button)
  })
  it('checks the first letter', () => {
    const {getByTestId } = renderWithRouterAndRedux(<SearchBar/>)
    const inputText = getByTestId('search-input');
    const button = getByTestId("exec-search-btn")
    const letter = getByTestId("first-letter-search-radio")
    userEvent.click(letter)
    userEvent.type(inputText, 'c')
    userEvent.click(button)
  })
  it('checks if the pathname to page details', () => {
    const {getByTestId} = renderWithRouterAndRedux(<Foods/>)
    const search = getByTestId("search-top-btn")
    userEvent.click(search)
    const location = useLocation()
  })
  
})