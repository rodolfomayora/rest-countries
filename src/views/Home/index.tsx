import React, { FC } from 'react';
import {
  Layout,
  Container,
  SearchCountry,
  RegionFilter,
  CountryList
} from '../../components';
import style from './style.module.scss';

const Home: FC = () => (
  <Layout>
    <main className={style.Home}>
      <Container>
        <div className={style.contentWrapper}>
          <div className={style.countryFilters}>
            <SearchCountry />
            <RegionFilter />
          </div>

          <CountryList />
        </div>
      </Container>
    </main>
  </Layout>
);

export default Home;