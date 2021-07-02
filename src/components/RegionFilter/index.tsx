import React, { FC, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setRegionFilter } from '../../store/rootActions';
import { selectRegionFilter, selectTheme } from '../../store/rootSelectors';
import { ArrowDownIcon } from '../../assets/images';
import style from './style.module.scss';

const RegionFilter: FC = () => {

  const currentRegion: string = useSelector(selectRegionFilter);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(() => {
    return currentRegion === 'All'
      ? 'Filter by Region'
      : currentRegion;
  })

  const regions: Array<string> = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  const changeRegion = (region: string): void => {
    setLabel(region === 'All'
      ? 'All Regions'
      : region
    );

    dispatch(setRegionFilter(region));
  }

  const onClickSetIsOpen = () => setIsOpen((crr:boolean) => !crr);

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.RegionFilter,
    light: `${style.RegionFilter} ${style.light}`
  }

  const setOptionStyle = (condition: boolean): string => {
    return condition
    ? `${style.option} ${style.selected}`
    : style.option;
  }

  const setArrowStyle = (condition: boolean): string => {
    return condition
    ? style.arrow
    : style.arrowReverse;
  }

  return (
    <div className={themes[theme]}>
      <div className={style.toggleFilter}
        onClick={onClickSetIsOpen}
      >
        {label}
        <ArrowDownIcon className={setArrowStyle(isOpen)}/>
      </div>
      
      {isOpen && (
        <ul className={style.optionsWrapper}>
        {regions.map((region: string) => (
          <li className={setOptionStyle(region === currentRegion)}
            onClick={() => changeRegion(region)}
            key={region}
          >
            {region}
          </li>
        ))}
        </ul>
      )}
    </div>
  );
}

export default RegionFilter;