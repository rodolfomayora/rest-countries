import React, { FC } from 'react';
import './assets/styles/styles.global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, CountryDetail } from './views';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Detail" component={CountryDetail} />
    </Switch>
  </BrowserRouter>
);

export default App;