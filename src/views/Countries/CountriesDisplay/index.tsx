import { useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
// import { CountriesApi } from '#/api/dummy-countries';
import { CountriesApi } from '#/api/rest-countries';
import { CountryBase } from '#/types/Country';
import { CountriesGrid } from './CountriesGrid';
import style from './style.module.scss';

export function CountriesDisplay () {
  const { data } = useSuspenseQuery<CountryBase[]>({
    queryKey: ['countries'],
    queryFn: () => CountriesApi.getAll(),
  })

  const location = useLocation();
  const query = new URLSearchParams(location.search);


  // REGION FILTER
  const selectedRegion = query.get('region') ?? 'All';
  // const countries = selectedRegion === 'All' ? data : data.filter((country) => {
  const result = selectedRegion === 'All' ? data : data.filter((country) => {
    const belongsToRegion = country.region === selectedRegion;
    return belongsToRegion;
  });


  // COUNTRY NAME FILTER
  const selectedCountry = query.get('country') ?? '';
  const countries = result.filter((country) => {
    const matchSearch = country.commonName.toLocaleLowerCase().includes(selectedCountry.toLocaleLowerCase());
    return matchSearch;
  });


  const noResult = !countries || countries.length === 0;
  if (noResult) {
    return <div className={style.noMatch}>No match countries</div>;
  }


  // SORT
  // @ts-ignore
  const sortedCountries = countries.toSorted((a, b) => a.commonName.localeCompare(b.commonName, 'en')) as CountryBase[];


  // PAGINATION
  // const selectedPage = query.get('page');
  const selectedPage = Number(query.get('page') || '1');
  const quantityToRender = 24;
  const offset = (selectedPage - 1) * quantityToRender;
  const limit = offset + quantityToRender;
  const totalCountries = countries.length;

  const history = useHistory();

  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);

    if (totalCountries > quantityToRender) {
      newQuery.set('page', String(selectedPage));
    
    } 

    if (selectedPage === 1 && totalCountries <= quantityToRender) {
      newQuery.delete('page');
    }

    history.replace(`?${newQuery}`);

  }, [history.replace, location.search,  selectedPage, totalCountries, quantityToRender])

  function handlePrev () {
    const next = new URLSearchParams(location.search);
    if (selectedPage === 1) return `?${next}`; // disabled: select same page
    next.set('page', String(Number(selectedPage) - 1));
    return `?${next}`;
  }

  function handleNext () {
    const next = new URLSearchParams(location.search);
    if (limit >= totalCountries) return `?${next}`; // disabled: select same page
    next.set('page', String(Number(selectedPage) + 1));
    return `?${next}`;
  }

  const paginatedCountries = sortedCountries.slice(offset, limit);

  return (
    <>
      <CountriesGrid countries={paginatedCountries} />

      {totalCountries > quantityToRender ? (
        <div className={style.paginationAtions}>
          <div className={style.buttonsWrapper}>
            <Link className={style.button} to={handlePrev()}>
              prev
            </Link>

            <Link className={style.button} to={handleNext()}>
              next
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}