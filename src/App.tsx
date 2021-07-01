import React, { FC, useEffect } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectTheme } from './store/rootSelectors';
import { fetchCountries, setTheme } from './store/rootActions';
import { Home, CountryDetail, NoMatch404 } from './views';
import './assets/styles/styles.global.scss';

const App: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const initializeCountryGlobalState = () => dispatch(fetchCountries());
    initializeCountryGlobalState();
  },
  [dispatch])
  
  useEffect(() => {
    const getLocalStorageTheme = () => {
      const storagedTheme: any = window.localStorage.getItem('theme');
      if (!!storagedTheme) dispatch(setTheme(storagedTheme));
    }

    getLocalStorageTheme();
  },
  [dispatch])

  const currentTheme = useSelector(selectTheme);
  useEffect(() => {
    const setLocalStorageTheme = () => {
      try {
        window.localStorage.setItem('theme', currentTheme);
      } catch(error) {
        console.error(error);
      }
    }

    setLocalStorageTheme();
  },
  [currentTheme])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/404" component={NoMatch404} />
        <Route path="/CountryDetail/:id" component={CountryDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;