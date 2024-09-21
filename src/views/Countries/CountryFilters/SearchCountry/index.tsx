import { ChangeEvent, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { SearchIcon } from '../../../../assets/images';
import style from './style.module.scss';

function debounce (callback: Function, delay: number) {
  let timeout: number | undefined = undefined;
  return (...args: any[]) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(()=> callback(...args), delay);
  }
}

export function SearchCountry () {
  const ref = useRef(null);

  const locale = useLocation();
  const query = new URLSearchParams(locale.search);
  const country = query.get('country') ?? '';
  
  useEffect(() => {
    // @ts-ignore
    ref.current.value = country; // input initializtion
  // }, [])
  }, [country])

  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const input = value; 
    const parsedInput = input.trim();
    const newQuery = new URLSearchParams(query);
    if (input === '') {
      newQuery.delete('country');
    } else {
      newQuery.set('country', parsedInput);
    }
    newQuery.set('page', '1'); // reset page
    history.replace(`?${newQuery}`);
  }

  const debouncedChange = debounce(handleChange, 500);

  return (
    <div className={style.SearchCountry}>
      <div className={style.searchButton}>
        <SearchIcon className={style.searchIcon} />
      </div>
  
      <input className={style.searchInput}
        name="countryName"
        type="search"
        placeholder="Search for a country..."
        onChange={debouncedChange}
        ref={ref}
      />
    </div>
  );
}