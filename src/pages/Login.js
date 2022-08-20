import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import emailAction from '../redux/actions';

const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const magicNumber = 6;

function Login({ dispatchEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [button, setButton] = useState(true);
  const history = useHistory();

  const sendToLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    history.push('/foods');
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        data-testid="email-input"
        onChange={ ({ target }) => {
          setEmail(target.value);
          // setButton(!(valid.test(target.value) && password.length > magicNumber));
        } }
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        onChange={ ({ target }) => {
          setPassword(target.value);
          // setButton(!(valid.test(email) && target.value.length > magicNumber));
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(valid.test(email) && password.length > magicNumber) }
        onClick={ () => {
          dispatchEmail(email);
          sendToLocalStorage();
        } }
      >
        Enter
      </button>
    </div>

  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (payload) => dispatch(emailAction(payload)),
});

Login.propTypes = { dispatchEmail: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Login);
