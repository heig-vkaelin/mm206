const KEY = 'AQIOVX42';

export const BASE_URL = 'https://helseflora.herokuapp.com';

export const ENDPOINTS = {
  CATEGORIES: 'categories',
  PLANTS: 'plants',
  ZONES: 'plantzones',
  ADMIN_LOGIN: 'users/adminLogin',
  USER_LOGIN: 'users/login',
  USERS: 'users',
  COMMENTS: 'comments',
  SHIPPING_METHODS: 'shipping',
  ORDERS: 'orders',
};

export async function fetchAPI(endpoint, options = {}, additionnalParams = {}) {
  if (Object.values(ENDPOINTS).indexOf(endpoint) === -1) {
    return {
      error: 'Invalid endpoint',
      status: 404,
    };
  }

  const url = new URL(endpoint, BASE_URL);
  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of params) {
    url.searchParams.append(key, value);
  }
  for (const [key, value] of Object.entries(additionnalParams)) {
    url.searchParams.append(key, value);
  }
  url.searchParams.append('key', KEY);

  try {
    const response = await fetch(url.href, options);
    const data = await response.json();
    return {
      data,
      status: data.http_code ?? 200,
    };
  } catch (error) {
    // Redirect to global error page, example: rate limited by the API (429)
    window.location.href = '/src/error.html';
    return {
      data: null,
      status: 500,
    };
  }
}
