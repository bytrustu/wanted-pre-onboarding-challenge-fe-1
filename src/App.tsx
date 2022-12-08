import React from 'react';

import Router from './Router';
import GlobalStyles from './ui/core/GlobalStyles';
import useDetectAuth from './ui/hooks/useDetectAuth';

const App = () => {
  useDetectAuth();
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
};
export default App;
