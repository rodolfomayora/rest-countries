import { useState, type ReactNode } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CountryBase } from '#/types/Country';
import { CountriesApi } from '#/api/dummy-countries';
// import { CountriesApi } from '#/api/rest-countries';
import { CountriesGrid } from '#/components/CountriesGrid';
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

// type Props = {
//   children: ReactNode,
// }

// export function PaginatedCdountries ({ children }: Props) {
export function PaginatedCdountries () {
  const { data } = useSuspenseQuery<CountryBase[]>({
    queryKey: ['countries'],
    // queryFn: () => CountriesApi.getAll(),
    queryFn: async () => {
      // return new Promise((_, rejects) => rejects()); // error (no delay required)
      await new Promise((resolve) => window.setTimeout(resolve, 2000)); // delay
      // return new Promise(((resolve) => resolve([]))); // no match
      return await CountriesApi.getAll();
    }
  })
  const countries = data;
  
  const { offset, limit, handlePrev, handleNext } = usePagination();
  const paginatedCounries = countries.slice(offset, limit);

  return (
    <>
      {/* {children} */}
      <CountriesGrid countries={paginatedCounries} />


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