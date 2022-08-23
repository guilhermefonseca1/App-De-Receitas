import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ email }) {
  const renderUserEmail = () => {
    if (email !== '') {
      const userObj = (window.localStorage.getItem('user') || []);
      const obj = JSON.parse(userObj);
      const userEmail = obj.email;
      return userEmail;
    }
  };
  const history = useHistory();

  return (
    <div>
      <Header page="Profile" search={ false } />
      <section>
        <p data-testid="profile-email">{renderUserEmail()}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>

      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

Profile.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Profile);
