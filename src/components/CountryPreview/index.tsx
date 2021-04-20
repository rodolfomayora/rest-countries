import React, { FC } from 'react';
import { CountryPreviewProps } from './types';
import style from './style.module.scss';

const CountryPreview: FC<CountryPreviewProps> = ({
  name,
  population,
  region,
  capital,
  flagImage
}) => (
  <article className={style.CountryPreview}>
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
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
      </div>
    </div>
  </article>
);

export default CountryPreview;