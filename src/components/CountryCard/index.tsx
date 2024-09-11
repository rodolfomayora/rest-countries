import style from './style.module.scss';

type Props = {
  capital: string,
  flagImage: string,
  flagAtl?: string,
  name: string,
  population: string | number,
  region: string,
}

export function CountryCard (props: Props) {
  const alt = props?.flagAtl || `${props.name} Flag`;
  return (
    <article className={style.CountryCard}>
      <img className={style.flagImage}
        src={props.flagImage}
        alt={alt}
        height="150"
        width="250"
        loading="lazy"
        decoding="auto"
      />
      <div className={style.summary}>
        <h2 className={style.name}>{props.name}</h2>
        <div className={style.info}>
          <p><span className={style.label}>Population:</span> {props.population}</p>
          <p><span className={style.label}>Region:</span> {props.region}</p>
          <p><span className={style.label}>Capital:</span> {props.capital}</p>
        </div>
      </div>
    </article>
  )
}