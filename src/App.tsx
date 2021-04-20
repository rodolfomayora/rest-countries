import React, { FC } from 'react';
import './assets/styles/styles.global.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, CountryDetail } from './views';
import { useDispatch } from 'react-redux';
import { fetchCountries } from './store/rootActions';

const App: FC = () => {

  const dispatch = useDispatch();
  dispatch(fetchCountries());

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Detail" component={CountryDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;