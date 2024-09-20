import { SearchCountry } from '#/components/SearchCountry';
import { RegionFilter } from '#/components/RegionFilter';
import style from './style.module.scss';

export function CountryFilters () {
  return (
    <div className={style.CountryFilters}>
      <SearchCountry />
      <RegionFilter />
    </div>
  );
}