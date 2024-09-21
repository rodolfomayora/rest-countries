import { SearchCountry } from './SearchCountry';
import { RegionFilter } from './RegionFilter';
import style from './style.module.scss';

export function CountryFilters () {
  return (
    <div className={style.CountryFilters}>
      <SearchCountry />
      <RegionFilter />
    </div>
  );
}