import { requestPost } from './client';
import { UserParam } from '../types/user.interface';

const postSignUp = async (user: UserParam) => {
  const url = '/auth/signup';
  const data = {
    email: user.email,
    password: user.password,
  };
  const response = await requestPost({
    url,
    data,
  });
  return response;
};

const postSignIn = async (user: UserParam) => {
  const url = '/auth/signin';
  const data = {
    email: user.email,
    password: user.password,
  };
  const response = await requestPost({
    url,
    data,
  });
  return response;
};

export default {
  postSignUp,
  postSignIn,
};
