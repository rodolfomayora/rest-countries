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

  useEffect(() => {
    const setHeaderThemeColor = () => {
      try {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (!metaThemeColor) throw new Error('There ir no meta theme-color tag');
        const defaultColor: string = 'hsl(209, 23%, 22%)';
        const lightColor: string = 'hsl(0, 0%, 100%)';
        if (currentTheme === 'default') metaThemeColor.setAttribute('content', defaultColor);
        if (currentTheme === 'light') metaThemeColor.setAttribute('content', lightColor);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    setHeaderThemeColor();
  },
  [currentTheme])

  return (
    // @ts-ignore
    <BrowserRouter>
      {/* @ts-ignore */}
      <Switch>
        {/* @ts-ignore */}
        <Route exact path="/" component={Home} />
        {/* @ts-ignore */}
        <Route exact path="/404" component={NoMatch404} />
        {/* @ts-ignore */}
        <Route path="/CountryDetail/:id" component={CountryDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;