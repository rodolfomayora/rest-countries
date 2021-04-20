import React, { FC } from 'react';
import {
  Layout,
  Container,
  SearchCountry,
  RegionFilter,
  CountryPreview
} from '../../components';
import style from './style.module.scss';

import sampleData from '../../utils/sampleData';


const Home: FC = () => (
  <Layout>
    <main className={style.Home}>
      <Container>
        <div className={style.contentWrapper}>
          <div className={style.countryFilters}>
            <SearchCountry />
            <RegionFilter />
          </div>

          <div className={style.countryList}>
            {sampleData.map((country: any) => (
              <CountryPreview
                key={country.alpha3Code}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flagImage={country.flag}
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  </Layout>
);

export default Home;