const KEY = 'AQIOVX42';

export const BASE_URL = 'https://helseflora.herokuapp.com';

export const ENDPOINTS = {
  CATEGORIES: 'categories',
  PLANTS: 'plants',
};

export async function fetchAPI(endpoint, params = {}) {
  if (Object.values(ENDPOINTS).indexOf(endpoint) === -1) {
    return {
      error: 'Invalid endpoint',
      status: 404,
    };
  }

  const url = new URL(endpoint, BASE_URL);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  url.searchParams.append('key', KEY);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return {
      data,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
    };
  }
}
