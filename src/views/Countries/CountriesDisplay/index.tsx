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
    // queryFn: async () => {
    //   await new Promise((resolve) => setInterval(resolve, 2000));
    //   return CountriesApi.getAll()
    // },
  })

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedRegion = query.get('region') ?? 'All';
  const selectedCountry = query.get('country') ?? '';
  const selectedPage = Number(query.get('page') || '1');


  // REGION FILTER
  // const countries = selectedRegion === 'All' ? data : data.filter((country) => {
  const result = selectedRegion === 'All' ? data : data.filter((country) => {
    const belongsToRegion = country.region === selectedRegion;
    return belongsToRegion;
  });


  // COUNTRY NAME FILTER
  const countries = result.filter((country) => {
    const matchSearch = country.commonName.toLowerCase().includes(selectedCountry.toLowerCase());
    return matchSearch;
  });



  // ?? moved to top
  const quantityToRender = 24;
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


  // const noResult = !countries || countries.length === 0;
  const noResult = countries.length === 0;
  if (noResult) {
    return <div className={style.noMatch}>No match countries</div>;
  }


  // SORT
  // @ts-ignore
  const sortedCountries = countries.toSorted((a, b) => a.commonName.localeCompare(b.commonName, 'en')) as CountryBase[];


  // PAGINATION
  // const selectedPage = query.get('page');
  const offset = (selectedPage - 1) * quantityToRender;
  const limit = offset + quantityToRender;
  
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