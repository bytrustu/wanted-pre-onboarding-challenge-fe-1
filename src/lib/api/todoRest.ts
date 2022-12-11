import { requestGet, requestPost } from './client';
import { getAccessToken } from '../utils/accessTokenStore';

const getHeaders = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

const postCreateTodo = async (todo: string) => {
  const url = '/todos';
  const headers = getHeaders();
  const data = {
    todo,
  };
  const response = await requestPost({
    url,
    headers,
    data,
  });
  return response;
};

const getTodos = async () => {
  const url = '/todos';
  const headers = getHeaders();
  const response = await requestGet({
    url,
    headers,
  });
  return response;
};

export default {
  postCreateTodo,
  getTodos,
};
