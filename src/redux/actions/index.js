export const LOGIN = 'LOGIN';

const emailAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

export default emailAction;
