import {
  requestDelete, requestGet, requestPost, requestPut,
} from './client';
import { getAccessToken } from '../utils/accessTokenStore';
import { Todo } from '../types/todo.interface';

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

const putUpdateTodo = async (todoItem: Todo) => {
  const url = `/todos/${todoItem.id}`;
  const headers = getHeaders();
  const data = {
    todo: todoItem.todo,
    isCompleted: todoItem.isCompleted,
  };
  const response = await requestPut({
    url,
    headers,
    data,
  });
  return response;
};

const deleteTodo = async (todoId: number) => {
  const url = `/todos/${todoId}`;
  const headers = getHeaders();
  const response = await requestDelete({
    url,
    headers,
  });
  return response;
};

export default {
  postCreateTodo,
  getTodos,
  putUpdateTodo,
  deleteTodo,
};
