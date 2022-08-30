import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const getUser = () => {
    const email = JSON.parse(localStorage.getItem('user'));
    if (email === null) {
      return '';
    }
    return email.email;
  };
  const history = useHistory();

  return (
    <div>
      <Header page="Profile" search={ false } />
      <section>
        <p data-testid="profile-email">{getUser()}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout

        </button>

      </section>
      <Footer />
    </div>
  );
}

export default Profile;
