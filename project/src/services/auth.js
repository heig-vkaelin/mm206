import { fetchAPI, ENDPOINTS } from './api.js';

function createBasicAuthString(username, password) {
  return 'basic ' + btoa(username + ':' + password);
}

function redirectToLogin() {
  window.location.href = '/src/admin/login.html';
}

export async function adminLogin(username, password) {
  const response = await fetchAPI(ENDPOINTS.ADMIN_LOGIN, {
    method: 'POST',
    headers: {
      Authorization: createBasicAuthString(username, password),
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
    redirectToLogin();
  }

  return {
    data,
    status,
  };
}

export function isAdminLogged() {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user && user.superuser;
}

export function adminMiddleware() {
  if (!isAdminLogged()) {
    redirectToLogin();
  }
}

export function logout(reload = true) {
  localStorage.removeItem('user');
  if (reload) {
    location.reload();
  }
}
