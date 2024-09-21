// import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTheme } from './store/rootSelectors';
// import {  setTheme } from './store/rootActions';
// import { ThemeStorage } from './storage/theme';
import { Countries } from './views/Countries';
import { Country } from './views/Country';
import { NoMatch404 } from './views/NoMatch404';
import { routes } from './config/routes';

export default function App () {
  // const dispatch = useDispatch();
  
  // useEffect(function getLocalStorageTheme () {
  //   const storagedTheme = ThemeStorage.get();
  //   if (!!storagedTheme) dispatch(setTheme(storagedTheme));

  // }, [dispatch])

  // const currentTheme = useSelector(selectTheme);
  // useEffect(function setLocalStorageTheme () {
  //   ThemeStorage.set(currentTheme);

  // }, [currentTheme])

  // useEffect(() => {
  //   const setHeaderThemeColor = () => {
  //     try {
  //       const metaThemeColor = document.querySelector('meta[name=theme-color]');
  //       if (!metaThemeColor) throw new Error('There ir no meta theme-color tag');
  //       const defaultColor: string = 'hsl(209, 23%, 22%)';
  //       const lightColor: string = 'hsl(0, 0%, 100%)';
  //       if (currentTheme === 'default') metaThemeColor.setAttribute('content', defaultColor);
  //       if (currentTheme === 'light') metaThemeColor.setAttribute('content', lightColor);

  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //       }
  //     }
  //   }

  //   setHeaderThemeColor();
  // },
  // [currentTheme])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.root} component={Countries} />
        <Route exact path={routes.country} component={Country} />
        <Route exact path={routes.unknown} component={NoMatch404} />
        <Route path="*" component={NoMatch404} />
      </Switch>
    </BrowserRouter>
  );
}