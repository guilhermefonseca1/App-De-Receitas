import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const usePathname = () => {
    const location = useLocation();
    const title = location.pathname.split('/')[1].toUpperCase();
    return title;
  };

  return (
    <header>
      <button type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icon-profile" />
      </button>
      <h1 data-testid="page-title">{usePathname()}</h1>
      <button type="button">
        <img data-testid="search-top-btn" src={ searchIcon } alt="icon-profile" />
      </button>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Header;
