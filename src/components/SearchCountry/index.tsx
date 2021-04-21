import React, { FC, ChangeEvent } from 'react';
import style from './style.module.scss';
import { SearchIcon } from '../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryName } from '../../store/rootSelectors';
import { setCountryName } from '../../store/rootActions';

const SearchCountry: FC = () => {

  const dispatch = useDispatch();
  const countryName: string = useSelector(selectCountryName);

  return (
    <div className={style.SearchCountry}>
      <div className={style.searchButton}>
        <SearchIcon className={style.searchIcon} />
      </div>
  
      <input className={style.searchInput}
        name="countryName"
        type="search"
        placeholder="Search for a country..."
        value={countryName}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
          return dispatch(setCountryName(target.value
            .trim()
            .toLowerCase()  
          ))
        }}
      />
    </div>
  );
}

export default SearchCountry;