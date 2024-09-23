import type { CSSProperties } from 'react';
import style from './style.module.scss';

type Props = {
  capital: string,
  commonName: string,
  flagDescription: string,
  flagImage: string,
  population: string | number,
  region: string,
  style: CSSProperties,
}

export function CountryCard (props: Props) {
  return (
    <article className={style.CountryCard} style={props?.style ?? {}}>
      <img className={style.flagImage}
        src={props.flagImage}
        alt={props.flagDescription}
        height="150"
        width="250"
        loading="lazy"
        decoding="auto"
      />
      <div className={style.summary}>
        <h2 className={style.name}>{props.commonName}</h2>
        <div className={style.info}>
          <p><span className={style.label}>Population:</span> {props.population}</p>
          <p><span className={style.label}>Region:</span> {props.region}</p>
          <p><span className={style.label}>Capital:</span> {props.capital}</p>
        </div>
      </div>
    </article>
  )
}