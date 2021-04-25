import React, { FC, useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import style from './style.module.scss';
import {
  selectCountryName,
  selectRegionFilter,
  selectCountriesAsArray
} from '../../store/rootSelectors';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import CountryPreview from '../CountryPreview';
import mapArrayToMatriz from '../../utils/mapArrayToMatriz';

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


  const responsiveColumns = (width: number): number => {
    // SEE theese values on Comtainer Component Style
    // $extraLarge: 1320px;
    if (width >= 1280) return 4;
    // $large: 991px;
    if (width >= 875) return 3;
    // $small: 576px;
    if (width >= 550) return 2;
    // default mobile Firts
    return 1; 
  }

  const setVerticalGap = (width: number): number => {
    // $extraLarge: 1320px;
    if (width >= 1280) return 60;
    // $large: 991px;
    if (width >= 875) return 30;
    // $small: 576px;
    if (width >= 550) return 20;
    // default mobile Firts
    return 40; 
  }

  const isMobile = (width: number): boolean => {
    if (width >= 550) return true;
    return false
  }

  return (
    <div className={style.CountryList}>
      <AutoSizer>
        {({ width, height}) => (
          <FixedSizeGrid className={style.virtualList}
            width={width}
            height={height}
            columnCount={responsiveColumns(width)}
            columnWidth={width / responsiveColumns(width)}
            rowCount={Math.ceil(copyCountries.length / responsiveColumns(width))}
            rowHeight={335 + setVerticalGap(width)}
            itemData={mapArrayToMatriz(
              copyCountries,
              responsiveColumns(width)
            )}
          >
            {({ style, columnIndex, rowIndex, data }) => {
              return !!data[rowIndex][columnIndex] ? (
                <div style={{
                  ...style,
                  display: 'flex',
                  justifyContent: isMobile(width) ? 'flex-start' : 'center',
                  alignItems: 'flex-start'
                }}>
                  <CountryPreview
                    key={data[rowIndex][columnIndex].id}
                    id={data[rowIndex][columnIndex].id}
                    name={data[rowIndex][columnIndex].name}
                    population={data[rowIndex][columnIndex].population}
                    region={data[rowIndex][columnIndex].region}
                    capital={data[rowIndex][columnIndex].capital}
                    flagImage={data[rowIndex][columnIndex].flagImage}
                  />
                </div>
              ) : (
                <></>
              )
            }}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
}

export default CountryList;