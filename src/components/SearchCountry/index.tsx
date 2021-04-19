import React, { FC, useState, ChangeEvent } from 'react';
import style from './style.module.scss';
import { SearchIcon } from '../../assets/images';

const SearchCountry: FC = () => {

  const [country, setCountry] = useState<string>('');

  return (
    <div className={style.SearchCountry}>
      <div className={style.searchButton}>
        <SearchIcon className={style.searchIcon} />
      </div>
  
      <input className={style.searchInput}
        name="countryName"
        type="search"
        placeholder="Search for a country..."
        value={country}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setCountry(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchCountry;