import React, { FC, useState, useEffect } from 'react';
import style from './style.module.scss';
import CountryPreview from '../CountryPreview';
import { useSelector } from 'react-redux';
import {
  selectCountryName,
  selectAllCountries,
} from '../../store/rootSelectors';

const CountryList: FC = () => {

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
    <div className={style.CountryList}>
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
  
      {showMessage && (<div className={style.message}>Country not Found</div>)}
    </div>
  );
}

export default CountryList;