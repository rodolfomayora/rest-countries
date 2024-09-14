import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CountryCard } from '#/components/CountryCard';
import { SuspenseCountriesGrid } from '#/components/SuspenseCountriesGrid';
// import { CountriesApi } from '#/api/dummy-countries';
import { CountriesApi } from '#/api/rest-countries';
import parseDigitsNumber from '#/utils/parseDigitsNumber';
import { CountryBase } from '#/types/Country';
import style from './style.module.scss';

function usePagination () {
  const quantity = 24;
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(() => quantity);

  function handlePrev (): void {
    if (offset === 0) return; 
    setOffset((offset) => offset - quantity);
    setLimit((limit => limit - quantity))
  }

  function handleNext (countriesLength: number):void {
    if (limit >= countriesLength) return;
    setOffset((offset) => offset + quantity);
    setLimit((limit => limit + quantity))
  }

  return { offset, limit, handlePrev, handleNext }
}

export function CountriesGrid () {
  const { offset, limit, handlePrev, handleNext } = usePagination();

  const { isLoading, isError, data:countries } = useQuery<CountryBase[]>({
    queryKey: ['countries'],
    // queryFn: () => CountriesApi.getAll(),
    queryFn: async () => {
      // return new Promise((_, rejects) => rejects()); // error (no delay required)
      await new Promise((resolve) => window.setTimeout(resolve, 2000)); // delay
      // return new Promise(((resolve) => resolve([]))); // no match
      return await CountriesApi.getAll();
    }
  })

  if (isLoading) {
    return <SuspenseCountriesGrid />;
  }

  if (isError) {
    return <div className={style.error}>Error loading countries</div>;
  }
  
  if (!countries || countries.length === 0) {
    return <div className={style.noMatch}>No match countries</div>;
  }

  // const listItems = countries.map((country) => (
  const listItems = countries.slice(offset, limit).map((country) => (
    <li key={country.id}>
      <Link
        to={`/CountryDetail/${country.id}`}
        style={{ display: 'block' }}
      >
        <CountryCard
          capital={country.capital}
          commonName={country.commonName}
          flagDescription={country.flagDescription}
          flagImage={country.flagImage}
          population={parseDigitsNumber(country.population)}
          region={country.region}
          style={{ width: 'auto' }}
        />
      </Link>
    </li>
  ))

  return (
    <>
      <ul className={style.CountriesGrid}>{listItems}</ul>

      <div className={style.buttonsWrapper}>
        <button className={style.button}onClick={handlePrev}>
          prev
        </button>

        <button className={style.button} onClick={() => handleNext(countries.length)}>
            next
        </button>
      </div>
    </>
  )
}