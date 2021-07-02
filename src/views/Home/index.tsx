import React, { FC } from 'react';

import { useTheme } from '../../hooks';
import {
  Layout,
  Container,
  CountryList,
  CountryFilters
} from '../../components';
import style from './style.module.scss';

const Home: FC = () => {

  const homeStyle = useTheme(style.Home, style.light);

  return (
    <Layout pageTitle="Home">
      <main className={homeStyle}>
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