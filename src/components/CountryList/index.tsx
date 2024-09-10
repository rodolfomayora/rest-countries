import { FC, useState, useEffect } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import { useSelector} from 'react-redux';

import {
  selectCountryName,
  selectRegionFilter,
  selectCountriesAsArray,
  selectTheme
} from '../../store/rootSelectors';
import CountryPreview from '../CountryPreview';
import style from './style.module.scss';
import mapArrayToMatriz from '../../utils/mapArrayToMatriz';

const CountryList: FC = () => {

  const allCountriesAsArray: Array<any> = useSelector(selectCountriesAsArray);
  const countryName: string = useSelector(selectCountryName);
  const regionFilter: string = useSelector(selectRegionFilter);

  const [copyCountries, setCopyCountries] = useState<Array<any>>([...allCountriesAsArray]);
  useEffect(() => {

    const compareName = (currentName: string, countryName: string) => {
      const parseCurrentName: string = currentName.trim().toLowerCase();
      const parseCountryName: string = countryName.trim().toLowerCase();
      return parseCurrentName.includes(parseCountryName);
    }

    const result = allCountriesAsArray.reduce((acc: any, crr: any) => {
      const { region, name } = crr;

      if (regionFilter === 'All' || region === regionFilter) {
        if (countryName === '') acc.push(crr);
        else if (compareName(name, countryName)) acc.push(crr);
      }

      return acc;
    }, [])

    setCopyCountries(result);
    
  },
  [allCountriesAsArray, regionFilter, countryName])


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

  const getItemKey = ({ columnIndex, rowIndex, data }: any): string => {
    return (data[rowIndex][columnIndex]?.id ?? `${rowIndex}${columnIndex}`);
  }

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.CountryList,
    light: `${style.CountryList} ${style.light}`
  }

  return (
    <div className={themes[theme]}>
      {!!allCountriesAsArray.length && !copyCountries.length && (
        <div className={style.noResult}>No result</div>
      )}
      {/* @ts-ignore */}
      <AutoSizer>
        {({ width, height}) => {
          const columnCount: number = responsiveColumns(width);
          const rowCount: number = Math.ceil(copyCountries.length / columnCount);
          const verticalGap: number = setVerticalGap(width);
          const rowHeight: number = 335 + verticalGap;

          return (
            // @ts-ignore
            <FixedSizeGrid className={style.virtualList}
              width={width}
              height={height}
              columnCount={columnCount}
              columnWidth={width / columnCount}
              rowCount={rowCount}
              rowHeight={rowHeight}
              itemData={mapArrayToMatriz(copyCountries, columnCount)}
              itemKey={getItemKey}
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
        )}}
      </AutoSizer>
    </div>
  );
}

export default CountryList;