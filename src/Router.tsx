import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignInPage, SignUpPage, TodoPage } from './ui/pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/todo" element={<TodoPage />} />
  </Routes>
);

export default Router;
