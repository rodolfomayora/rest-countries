import React, { FC } from 'react';
import style from './style.module.scss';
import SearchCountry from '../SearchCountry';
import RegionFilter from '../RegionFilter';

const CountryFilters: FC = () => (
  <div className={style.countryFilters}>
    <SearchCountry />
    <RegionFilter />
  </div>
);

export default CountryFilters;