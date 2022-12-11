const ACCESS_TOKEN_KEY = 'access_token';

export const getAccessToken = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) || '');
  } catch (e) {
    return '';
  }
};

export const setAccessToken = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const getHasAccessToken = () => !!getAccessToken();
