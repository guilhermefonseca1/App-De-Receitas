import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from "@testing-library/user-event";
import Profile from '../pages/Profile';
import { screen} from '@testing-library/react';

describe('Tests the Profile component', () => {
  it('checks if the text is rendered while typing', () => {
    renderWithRouterAndRedux(<Profile />)
    const profile = screen.getByTestId('profile-email')
    expect(profile).toBeDefined()
    const done = screen.getByTestId('profile-done-btn')
    const favorite = screen.getByTestId('profile-favorite-btn')
    const logout = screen.getByTestId('profile-logout-btn')
    userEvent.click(done)
    userEvent.click(favorite)
    userEvent.click(logout)
  })
});