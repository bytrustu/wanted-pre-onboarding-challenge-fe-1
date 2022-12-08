import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignInPage, SignUpPage, TodoPage } from './ui/pages';
import { PATH } from './lib/const/path';

const Router = () => (
  <Routes>
    <Route path={PATH.SIGN_IN} element={<SignInPage />} />
    <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
    <Route path={PATH.TODO} element={<TodoPage />} />
  </Routes>
);

export default Router;
