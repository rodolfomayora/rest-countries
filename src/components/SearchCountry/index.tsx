import React, { FC, ChangeEvent, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectCountryName } from '../../store/rootSelectors';
import { useTheme } from '../../hooks';
import { setCountryName } from '../../store/rootActions';
import { SearchIcon } from '../../assets/images';
import style from './style.module.scss';

const SearchCountry: FC = () => {

  const countryName: string = useSelector(selectCountryName);
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>(countryName);
  useEffect(() => {
    const debounceTime: number = 500;

    const debounceCountryName: number = window.setTimeout(() => {
      dispatch(setCountryName(input.trim().toLowerCase()))
    }, debounceTime)

    return () => window.clearInterval(debounceCountryName);
  },
  [input, dispatch])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  }

  const searchCountryStyle = useTheme(style.SearchCountry, style.light);

  return (
    <div className={searchCountryStyle}>
      <div className={style.searchButton}>
        <SearchIcon className={style.searchIcon} />
      </div>
  
      <input className={style.searchInput}
        name="countryName"
        type="search"
        placeholder="Search for a country..."
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchCountry;