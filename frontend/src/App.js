import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './router';
import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
