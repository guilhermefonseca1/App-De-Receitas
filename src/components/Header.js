import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ page, search }) {
  // const usePathname = () => {
  //   const location = useLocation();
  //   return setTitle(location.pathname.split('/')[1].toUpperCase());
  // };

  return (
    <header>
      <button type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icon-profile" />
      </button>
      <h1 data-testid="page-title" className="title-page">{page}</h1>
      {
        search

            && (
              <button type="button">
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
