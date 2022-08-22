import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ page, search }) {
  const history = useHistory();

  return (
    <header>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icon-profile" />
      </button>
      <h1 data-testid="page-title" className="title-page">{page}</h1>
      {
        search

            && (
              <button type="button" onClick={ () => {} }>
                <img data-testid="search-top-btn" src={ searchIcon } alt="icon-search" />
              </button>
            )
      }
    </header>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = { search: true };

export default Header;
