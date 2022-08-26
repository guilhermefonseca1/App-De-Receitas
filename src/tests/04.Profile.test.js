import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('Tests from Profile component', () => {
  it('test if the page Profile is correctly rendered', () => {
    const { history } = renderWithRouterAndRedux(<App/>);

    const inputEmail = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');
    // const profilePic = screen.getByTestId('profile-top-btn');
    const profileBtn = screen.getByTestId('profile-btn');
    const email = screen.getByTestId('profile-email');

    userEvent.type(inputEmail, 'email@test.com');
    userEvent.type(passInput, '00000000000000000');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/foods')
    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    expect(email).toBeInTheDocument();
    expect(email).toContain('email@test.com');
  });
});

// test if the user email is rendered on page profile