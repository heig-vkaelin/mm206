import { fetchAPI, ENDPOINTS } from './api.js';

function createBasicAuthString(username, password) {
  return 'basic ' + btoa(username + ':' + password);
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

export function isAdminLogged() {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user && user.superuser;
}

export function adminMiddleware() {
  if (!isAdminLogged()) {
    window.location.href = 'admin/login';
  }
}

export function logout() {
  localStorage.removeItem('user');
  location.reload();
}
