import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CountryCard } from '#/components/CountryCard';
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

  return { quantity, offset, limit, handlePrev, handleNext }
}

export function CountriesGrid () {
  const { data } = useSuspenseQuery<CountryBase[]>({
    queryKey: ['countries'],
    queryFn: () => CountriesApi.getAll(),
  })

  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedRegion = query.get('region') ?? 'All';
  const selectedCountry = query.get('country') ?? '';

  // const countries = selectedRegion === 'All' ? data : data.filter((country) => {
  const result = selectedRegion === 'All' ? data : data.filter((country) => {
    const belongsToRegion = country.region === selectedRegion;
    return belongsToRegion;
  });


  const countries = result.filter((country) => {
    const matchSearch = country.commonName.toLocaleLowerCase().includes(selectedCountry.toLocaleLowerCase());
    return matchSearch;
  });


  const noResult = !countries || countries.length === 0;
  if (noResult) {
    return <div className={style.noMatch}>No match countries</div>;
  }


  // @ts-ignore
  const sortedCountries = countries.toSorted((a, b) => a.commonName.localeCompare(b.commonName, 'en')) as CountryBase[];


  const { quantity, offset, limit, handlePrev, handleNext } = usePagination();

  // const listItems = countries.slice(offset, limit).map((country) => (
  const listItems = sortedCountries.slice(offset, limit).map((country) => (
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

      {countries.length >= quantity ? (
        <div className={style.paginationAtions}>
          <div className={style.buttonsWrapper}>
            <button className={style.button}onClick={handlePrev}>
              prev
            </button>

            <button className={style.button} onClick={() => handleNext(countries.length)}>
              next
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}