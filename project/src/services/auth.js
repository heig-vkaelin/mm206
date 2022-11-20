import { fetchAPI, ENDPOINTS } from './api.js';

function createBasicAuthString(username, password) {
  return 'basic ' + btoa(username + ':' + password);
}

function redirectToAdminLogin() {
  window.location.href = '/src/admin/login.html';
}

function redirectToLogin() {
  window.location.href = '/src/login.html';
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export async function login(username, password, admin = false) {
  const endpoint = admin ? ENDPOINTS.ADMIN_LOGIN : ENDPOINTS.USER_LOGIN;

  const response = await fetchAPI(endpoint, {
    method: 'POST',
    headers: {
      authorization: createBasicAuthString(username, password),
    },
  });

  if (!response.data || !response.data.logindata) {
    return {
      success: false,
      data: response.data ? response.data.msg : response.error,
    };
  }

  // Store user
  localStorage.setItem('user', JSON.stringify(response.data.logindata));

  return {
    success: true,
    data: response.data.logindata,
  };
}

export async function fetchAPIAuth(endpoint, options = {}, params = {}) {
  const user = getUser();
  if (user) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = user.token;
  }

  const { data, status } = await fetchAPI(endpoint, options, params);

  // Check if auth token is expired : logout
  if (data && data.http_code === 401) {
    logout(false);

    if (user.superuser) {
      redirectToAdminLogin();
    }
  }

  return {
    data,
    status,
  };
}

export function isLogged() {
  const user = getUser();
  return !!user;
}

export function isAdminLogged() {
  const user = getUser();
  return !!user && user.superuser;
}

export function authMiddleware(redirect = false) {
  if (!isLogged()) {
    if (redirect) {
      redirectToLogin();
    }
    return;
  }

  const container = document.querySelector('header .right');
  if (!container) return;

  const user = getUser();

  const iconContainer = document.createElement('a');
  iconContainer.href = 'settings.html';
  iconContainer.classList.add('icon-container');
  iconContainer.innerHTML = `<img src="${user.thumb}"/>`;

  container.appendChild(iconContainer);
}

export function guestMiddleware() {
  if (isLogged()) {
    history.back();
  }
}

export function adminMiddleware() {
  if (!isAdminLogged()) {
    redirectToAdminLogin();
  }
}

export function logout(reload = true) {
  localStorage.removeItem('user');
  if (reload) {
    location.reload();
  }
}

export function updateStoredUser(newUser) {
  const updated = {
    ...getUser(),
    ...newUser,
  };
  localStorage.setItem('user', JSON.stringify(updated));
}
