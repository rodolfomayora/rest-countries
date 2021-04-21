import React, { FC } from 'react';
import {
  Layout,
  Container,
  CountryList,
  CountryFilters
} from '../../components';
import style from './style.module.scss';

const Home: FC = () => (
  <Layout>
    <main className={style.Home}>
      <Container>
        <div className={style.contentWrapper}>
          <CountryFilters />
          <CountryList />
        </div>
      </Container>
    </main>
  </Layout>
);

export default Home;