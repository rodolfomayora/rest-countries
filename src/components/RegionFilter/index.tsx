import React, { FC, useState } from 'react';
import style from './style.module.scss';
import { ArrowDownIcon } from '../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { setRegionFilter } from '../../store/rootActions';
import { selectRegionFilter } from '../../store/rootSelectors';

const RegionFilter: FC = () => {

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const regions: Array<string> = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  const currentRegion: string = useSelector(selectRegionFilter);

  const setOptionStyle = (condition: boolean): string => {
    return condition
      ? style.option + ' ' + style.active
      : style.option;
  }

  return (
    <div className={style.RegionFilter}>
      <div className={style.toggleFilter}
        onClick={() => setIsOpen((crr:boolean) => !crr)}
      >
        Filter by Region
        <ArrowDownIcon
          className={isOpen ? style.arrow : style.arrowReverse}
        />
      </div>
      
      {isOpen && (
        <ul className={style.optionsWrapper}>
          {regions.map((region: string) => (
            <li className={setOptionStyle(region === currentRegion)}
              onClick={() => dispatch(setRegionFilter(region))}
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