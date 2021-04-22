import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import style from './style.module.scss';
import { SearchIcon } from '../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryName } from '../../store/rootSelectors';
import { setCountryName } from '../../store/rootActions';

const SearchCountry: FC = () => {

  const dispatch = useDispatch();
  const countryName: string = useSelector(selectCountryName);

  const [input, setInput] = useState<string>(countryName);

  useEffect(() => {
    const debounceCountryName: number = window.setTimeout(() => {
      dispatch(setCountryName(input.trim().toLowerCase()))
    }, 800)

    return () => window.clearInterval(debounceCountryName);
  },
  [input, dispatch])

  return (
    <div className={style.SearchCountry}>
      <div className={style.searchButton}>
        <SearchIcon className={style.searchIcon} />
      </div>
  
      <input className={style.searchInput}
        name="countryName"
        type="search"
        placeholder="Search for a country..."
        value={input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchCountry;