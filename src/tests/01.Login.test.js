import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import Login from '../pages/Login';
import userEvent from "@testing-library/user-event";

describe('Tests the Login component', () => {
  it('checks if button is correctly disabled', () => {
    const {getByTestId} = renderWithRouterAndRedux(<App />)
    const email = getByTestId('email-input');
    const password = getByTestId('password-input')
    const button = getByTestId('login-submit-btn')

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()

    userEvent.type(email, 'user@')
    userEvent.type(password, '123456')
    expect(button).toBeDisabled();
  })
  it('checks if button is correctly enabled', () => {
    const {getByTestId} = renderWithRouterAndRedux(<App />)
    const email = getByTestId('email-input');
    const password = getByTestId('password-input')
    const button = getByTestId('login-submit-btn')

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()

    userEvent.type(email, 'user@gmail.com')
    userEvent.type(password, '1234567')
    expect(button).toBeEnabled();
    userEvent.click(button)
  })


})