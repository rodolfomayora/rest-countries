import { useEffect, useMemo } from 'react'
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
    queryFn: ({ signal }) => CountriesApi.getAll({ signal }),
    // queryFn: async () => {
    //   await new Promise((resolve) => setInterval(resolve, 2000));
    //   return CountriesApi.getAll()
    // },
  })

  const countries = data;
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedRegion = query.get('region') ?? 'All';
  const selectedCountry = query.get('country') ?? '';
  const selectedPage = Number(query.get('page') || '1');


  // 1. FILTERS
  const filteredCountries = countries.reduce((result, country) => {

    // Filter by REGION
    if (selectedRegion !== 'All') {
      // 1. if filter is NOT 'All', then apply filter, otherwise ignore filter
      const belongsToRegion = country.region === selectedRegion;
      // 2. if country not belongs to selected region, then jump next iteration
      if (!belongsToRegion) return result;
    }

    // Filter by COUNTRY NAME
    if (selectedCountry !== '') {
      // 1. if filter is Not empty, then apply filter, otherwise ignore filter
      const matchSearch = country.commonName.toLowerCase().includes(selectedCountry.toLowerCase());
      // 2. if country not match to search by name, then jump next iteration
      if (!matchSearch) return result;
    }

    // if pass all filters good then add country to result
    return result.concat(country);

  }, [] as CountryBase[]);


  // URL management
  const itemsPerPage = 24;
  const totalCountries = filteredCountries.length;

  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);

    if (totalCountries > itemsPerPage) {
      newQuery.set('page', String(selectedPage));
    } 

    if (selectedPage === 1 && totalCountries <= itemsPerPage) {
      newQuery.delete('page');
    }

    history.replace(`?${newQuery}`);

    window.scrollTo(0, 0); // scroll to top


  }, [history.replace, location.search,  selectedPage, totalCountries, itemsPerPage])


  // Conditional Rendering
  const noResult = filteredCountries.length === 0;
  if (noResult) {
    return <div className={style.noMatch}>No match countries</div>;
  }


  // 2. SORT
  // @ts-ignore
  const sortedCountries = filteredCountries.toSorted((a, b) => {
    return a.commonName.localeCompare(b.commonName, 'en');
  }) as CountryBase[];


  // 3. PAGINATION (to reduce rendering)
  const offset = (selectedPage - 1) * itemsPerPage;
  const limit = offset + itemsPerPage;
  const paginatedCountries = sortedCountries.slice(offset, limit);
  
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

  return (
    <>
      <CountriesGrid countries={paginatedCountries} />

      {totalCountries > itemsPerPage ? (
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