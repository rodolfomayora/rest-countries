import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import { CountryPreviewProps } from './types';
import style from './style.module.scss';

const CountryPreview: FC<CountryPreviewProps> = (props) => {
  const { capital, flagImage, id, name, population, region } = props;

  const countryPreviewStyle = useTheme(style.CountryPreview, style.light);

  return (
    <article className={countryPreviewStyle}>
      <Link className={style.previewWrapper}
        to={`/CountryDetail/${id}`}
      >
        <div className={style.flagWrapper}>
          <img className={style.flagImage}
            src={flagImage}
            alt={`${name} Flag`}
            height="150"
            width="250"
          />
        </div>
  
        <div className={style.countrySummary}>
          <h2 className={style.countryName}>
            {name}
          </h2>
          <div className={style.info}>
            <p><span className={style.label}>Population:</span> {population}</p>
            <p><span className={style.label}>Region:</span> {region}</p>
            <p><span className={style.label}>Capital:</span> {capital}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CountryPreview;