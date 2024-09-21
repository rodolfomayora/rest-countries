import { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { ArrowDownIcon } from '../../../../assets/images';
import style from './style.module.scss';

export function RegionFilter () {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedRegion = query.get('region');
  // query.get puede ser: null, '', o un valor no esperado

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((isOpen) => !isOpen);

  const regions: Array<string> = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'All',
  ];

  const history = useHistory();
  // if region query param is defined, then it should be validated, if not just ignore
  // if region query param is empty "", then it should bereplace by a default value
  if (selectedRegion !== null  && !regions.includes(selectedRegion)) {
    query.set('region', 'All');
    history.replace(`?${query}`);
  }

  const label = selectedRegion === null
    ? 'Filter by Region'
    : selectedRegion === ''
    ? 'Filter by Region'
    : selectedRegion
    ;

  const listItems = regions.map((region: string) => {
    // create a new URLSearchParams from a previous URLSearchParams

    // const itemQuery = new URLSearchParams(query);
    // itemQuery.set('region', region);
    
    const itemQuery = new URLSearchParams(location.search);
    itemQuery.set('region', region);
    itemQuery.set('page', '1'); // reset page

    const route = `?${itemQuery}`;
    return (
      <li key={region}>
        <Link className={style.option}
          to={route}
          onClick={() => setIsOpen(false)}
          data-seleted={region === selectedRegion}
        >
          {region}
        </Link>
      </li>
    )
  })

  return (
    <div className={style.RegionFilter}>
      <button className={style.toggle}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className={style.label}>{label}</span>
        <ArrowDownIcon className={style.arrow}/>
      </button>
      <ul className={style.optionsWrapper}>{listItems}</ul>
    </div>
  );
}