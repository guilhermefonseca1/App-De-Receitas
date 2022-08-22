import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ page, search }) {
  const [isToggle, setToggle] = useState(false);
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
            <button type="button" onClick={ () => setToggle(!isToggle) }>
              <img data-testid="search-top-btn" src={ searchIcon } alt="icon-search" />
            </button>
          )
      }
      { isToggle && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = { search: true };

export default Header;
