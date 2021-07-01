import React, { FC, ChangeEvent, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectCountryName, selectTheme } from '../../store/rootSelectors';
import { setCountryName } from '../../store/rootActions';
import { SearchIcon } from '../../assets/images';
import style from './style.module.scss';

const SearchCountry: FC = () => {

  const dispatch = useDispatch();
  const countryName: string = useSelector(selectCountryName);

  const [input, setInput] = useState<string>(countryName);
  useEffect(() => {
    const debounceCountryName: number = window.setTimeout(() => {
      dispatch(setCountryName(input.trim().toLowerCase()))
    },500)

    return () => window.clearInterval(debounceCountryName);
  },
  [input, dispatch])

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.SearchCountry,
    light: `${style.SearchCountry} ${style.light}`
  }

  return (
    <div className={themes[theme]}>
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