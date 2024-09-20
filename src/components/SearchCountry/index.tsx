import { ChangeEvent, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { SearchIcon } from '../../assets/images';
import style from './style.module.scss';

export function SearchCountry () {

  const locale = useLocation();
  const query = new URLSearchParams(locale.search);
  const country = query.get('country') ?? '';

  const history = useHistory();

  const [input, setInput] = useState<string>(country);
  useEffect(() => {
    const debounceTime: number = 500;

    const debounceCountryName: number = window.setTimeout(() => {
      // const parsedInput = input.trim().toLowerCase();
      const parsedInput = input.trim();
      const newQuery = new URLSearchParams(query);
      if (input === '') {
        newQuery.delete('country');
      } else {
        newQuery.set('country', parsedInput);
      }
      history.replace(`?${newQuery}`);

      // dispatch(setCountryName(input.trim().toLowerCase()))
    }, debounceTime)

    return () => window.clearInterval(debounceCountryName);
  },
  [input, history.replace])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  }

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
        onChange={handleChange}
      />
    </div>
  );
}