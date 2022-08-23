import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const userObj = window.localStorage.getItem('user');
  const obj = JSON.parse(userObj);
  const userEmail = obj.email;
  return (
    <div>
      <Header page="Profile" search={ false } />
      <p data-testid="profile-email">{userEmail}</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
