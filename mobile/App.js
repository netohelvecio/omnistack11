import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings(['Expected style']);

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar barStyle="dark-content" backgroundColor="#eee" />
    </>
  );
}
