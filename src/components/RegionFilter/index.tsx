import React, { FC, useState } from 'react';
import style from './style.module.scss';
import { ArrowDownIcon } from '../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { setRegionFilter } from '../../store/rootActions';
import { selectRegionFilter } from '../../store/rootSelectors';

const RegionFilter: FC = () => {

  const dispatch = useDispatch();
  const currentRegion: string = useSelector(selectRegionFilter);

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

  const setOptionStyle = (condition: boolean): string => {
    return condition
      ? style.option + ' ' + style.active
      : style.option;
  }

  const changeRegion = (region: string): void => {
    setLabel(region === 'All'
      ? 'All Regions'
      : region
    );
    dispatch(setRegionFilter(region));
  }

  return (
    <div className={style.RegionFilter}>
      <div className={style.toggleFilter}
        onClick={() => setIsOpen((crr:boolean) => !crr)}
      >
        {label}
        <ArrowDownIcon className={isOpen
          ? style.arrow
          : style.arrowReverse
        }/>
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