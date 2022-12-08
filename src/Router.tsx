import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SignInPage, SignUpPage, MainPage } from './ui/pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/main" element={<MainPage />} />
  </Routes>
);

export default Router;
