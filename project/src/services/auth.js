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

export async function fetchAPIAdmin(endpoint, options = {}, params = {}) {
  options.headers = {
    Authorization: JSON.parse(localStorage.getItem('user')).token,
  };

  const { data, status } = await fetchAPI(endpoint, options, params);

  // Check if token is expired : redirect to login
  if (data && data.http_code === 401) {
    logout(false);
    redirectToAdminLogin();
  }

  return {
    data,
    status,
  };
}

export function isLogged() {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user;
}

export function isAdminLogged() {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user && user.superuser;
}

export function authMiddleware() {
  if (!isLogged()) {
    return;
  }

  const container = document.querySelector('header .right');
  if (!container) return;

  const user = JSON.parse(localStorage.getItem('user'));

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
