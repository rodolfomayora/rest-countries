import React, { FC } from 'react';

import SearchCountry from '../SearchCountry';
import RegionFilter from '../RegionFilter';
import style from './style.module.scss';

const CountryFilters: FC = () => (
  <div className={style.countryFilters}>
    <SearchCountry />
    <RegionFilter />
  </div>
);

export default CountryFilters;