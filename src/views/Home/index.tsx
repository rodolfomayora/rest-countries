import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import {
  Layout,
  Container,
  CountryList,
  CountryFilters
} from '../../components';
import style from './style.module.scss';

const Home: FC = () => {

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.Home,
    light: `${style.Home} ${style.light}`
  }

  return (
    <Layout pageTitle="Home">
      <main className={themes[theme]}>
        <Container>
          <div className={style.contentWrapper}>
            <div className={style.searchWrapper}>
              <CountryFilters />
            </div>
            <CountryList />
          </div>
        </Container>
      </main>
    </Layout>
  );
}

export default Home;