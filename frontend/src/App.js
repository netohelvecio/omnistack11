import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './router';
import GlobalStyle from './styles/global';
import { Toast } from './styles/toast';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
      <Toast />
    </BrowserRouter>
  );
}

export default App;
