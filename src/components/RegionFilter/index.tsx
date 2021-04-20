import React, { FC, useState } from 'react';
import style from './style.module.scss';
import { ArrowDownIcon } from '../../assets/images';

const RegionFilter: FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <ul className={style.filterOptions}>
          <li>Africa</li>
          <li>America</li>
          <li>Asia</li>
          <li>Europe</li>
          <li>Oceania</li>
        </ul>
      )}
    </div>
  );
}

export default RegionFilter;