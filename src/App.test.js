import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Testa o componente App', () => {
  test('Farewell, front-end', () => {
    render(<App />);
    const linkElement = screen.getByText(/TRYBE/i);
    expect(linkElement).toBeInTheDocument();
  });  
})

