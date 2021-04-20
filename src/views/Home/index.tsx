import React, { FC, useState, useEffect } from 'react';
import {
  Layout,
  Container,
  SearchCountry,
  RegionFilter,
  CountryPreview
} from '../../components';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import {
  countriesWithIdSelector,
  countryNameSelector,
} from '../../store/rootSelectors';

const Home: FC = () => {

  const countryName:string = useSelector(countryNameSelector);
  const countriesList: Array<any> = useSelector(countriesWithIdSelector);
  const [copyCountries, setCopyCountries] = useState<Array<any>>(countriesList);
  useEffect(() => {
    const result = countriesList.filter((country: any) => {
      return country.name
      .toLowerCase()
      .includes(countryName)
    });

    setCopyCountries(result);
  },
  [countryName, countriesList])

  return (
    <Layout>
      <main className={style.Home}>
        <Container>
          <div className={style.contentWrapper}>
            <div className={style.countryFilters}>
              <SearchCountry />
              <RegionFilter />
            </div>
  
            <div className={style.countryList}>
              {!!copyCountries.length && copyCountries
                .map((country: any) => (
                  <CountryPreview
                    // key={(index + 1).toString()}
                    key={country.id}
                    name={country.name}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                    flagImage={country.flag}
                  />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
}

export default Home;