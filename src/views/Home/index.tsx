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
  selectCountryName,
  selectAllCountries,
} from '../../store/rootSelectors';

const Home: FC = () => {

  const countryName:string = useSelector(selectCountryName);
  const countryList: Array<any> = useSelector(selectAllCountries);

  const [copyCountries, setCopyCountries] = useState<Array<any>>(countryList);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  useEffect(() => {
    setShowMessage(false);
    
    if (!countryName) {

      setCopyCountries(countryList);

    } else {

      const result = countryList.filter((country: any) => {
        return country.name
          .toLowerCase()
          .includes(countryName)
      });
  
      if (!result.length) setShowMessage(true)
  
      setCopyCountries(result);
    }
  },
  [countryName, countryList])

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
                    key={country.id}
                    name={country.name}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                    flagImage={country.flagImage}
                  />
              ))}

              {showMessage && (<div className={style.message}>Country no Found</div>)}
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
}

export default Home;