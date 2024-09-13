import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CountryCard } from '#/components/CountryCard';
// import { CountriesApi } from '#/api/dummy-countries';
import { CountriesApi } from '#/api/rest-countries';
import { SuspenseCountryCard } from '../SuspenseCountryCard';
import parseDigitsNumber from '#/utils/parseDigitsNumber';
import { CountryBase } from '#/types/Country';
import style from './style.module.scss';

export function CountriesGrid () {
  const quantity = 24;
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(() => quantity);

  const [countries, setCountries] = useState<CountryBase[]>([]);
  useEffect(() => {
    (async () => {
      const result = await CountriesApi.getAll();
      await new Promise((resolve) => window.setTimeout(resolve, 2000));
      setCountries(result);
    })()
  }, [])

  if (countries.length === 0) {
    const listItems = Array(12).fill(0).map((_, index) => (
      <li key={index}>
        <SuspenseCountryCard style={{ width: 'auto' }} />
      </li>
    ))

    return <ul className={style.CountriesGrid}>{listItems}</ul>
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

      <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '20px' }}>
        <button onClick={() => {
          if (offset === 0) return; 
          setOffset((offset) => offset - quantity);
          setLimit((limit => limit - quantity))
        }}>prev</button>

        <button onClick={() => {
          if (limit >= countries.length) return;
          setOffset((offset) => offset + quantity);
          setLimit((limit => limit + quantity))
        }}>next</button>
      </div>
    </>
  )
}