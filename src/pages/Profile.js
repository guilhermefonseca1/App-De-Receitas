import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rockGlass from '../images/rockGlass.svg';

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
      <section className="container-profile">
        <p data-testid="profile-email">{getUser()}</p>
        <button
          className="btn-done"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="btn-favorite"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          className="btn-logout"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout

        </button>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <h1 className="title-logo-profile">FIVE FOOD</h1>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
