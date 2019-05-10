import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  tlogin,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};
async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username.toString(), password: password.toString() }),
  };

  const res = await fetch(`http://localhost:3042/login`, requestOptions);
  if (res.status === 200) {
    const user = await res.json();
    localStorage.setItem('token', user.token);
    return user;
  }
}
function tlogin(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${process.env.API_URL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(token => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(token);
      // localStorage.setItem('user', JSON.stringify(user));

      return token;
    });
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${process.env.API_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${process.env.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.API_URL}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.API_URL}/users/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${process.env.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // eslint-disable-next-line
        location.reload(true);
      } else if (response.status === 400) {
        // auto logout if 401 response returned from api
        logout();
        // eslint-disable-next-line
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
