const ACCESS_TOKEN_KEY = 'access_token';

export const getAccessToken = () => JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) || '');

export const setAccessToken = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
