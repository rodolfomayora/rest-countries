import React, { FC, useState, useEffect } from 'react';
import style from './style.module.scss';
import CountryPreview from '../CountryPreview';
import { useSelector } from 'react-redux';
import {
  selectCountryName,
  selectRegionFilter,
  selectCountriesAsArray
} from '../../store/rootSelectors';

const CountryList: FC = () => {

  const countryName: string = useSelector(selectCountryName);
  const regionFilter: string = useSelector(selectRegionFilter);
  const allCountries: Array<any> = useSelector(selectCountriesAsArray);
  const [copyCountries, setCopyCountries] = useState<Array<any>>([...allCountries]);

  useEffect(() => {

    const compareName = (currentName: string, countryName: string) => {
      const parseCurrentName: string = currentName.trim().toLowerCase();
      const parseCountryName: string = countryName.trim().toLowerCase();
      return parseCurrentName.includes(parseCountryName);
    }

    const result = allCountries.reduce((acc: any, crr: any) => {
      const { region, name } = crr;

      if (regionFilter === 'All' || region === regionFilter) {
        if (countryName === '') acc.push(crr);
        else if (compareName(name, countryName)) acc.push(crr);
      }

      return acc;
    }, [])

    setCopyCountries(result);
    
  },
  [allCountries, regionFilter, countryName])

  return (
    <div className={style.CountryList}>
      {!!copyCountries.length ? copyCountries.map((country: any) => (
        <CountryPreview
          key={country.id}
          id={country.id}
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
          flagImage={country.flagImage}
        />
      )) : (
        <div className={style.message}>Country not Found</div>
      )}
    </div>
  );
}

export default CountryList;