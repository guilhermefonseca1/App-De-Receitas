import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import userEvent from "@testing-library/user-event";
import Profile from '../pages/Profile';

describe('Tests the Profile component', () => {
  it('checks if the text is rendered while typing', () => {
    const {getByTestId} = renderWithRouterAndRedux(<Profile />)
    ['profile-email', 'profile-done-btn','profile-logout-btn','profile-favorite-btn'].
    forEach((i) => expect(getByTestId(i).toBeDefined()));
  })
});