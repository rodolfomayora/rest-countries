import type { ComponentProps } from 'react';
import style from './style.module.scss';

type Props = ComponentProps<'article'>

export function SuspenseCountryCard (props: Props) {
  return (
    <article className={style.SuspenseCountryCard} style={props?.style ?? {}}>
      <div className={style.flagImage}></div>
      <div className={style.summary}>
        <h2 className={style.name}></h2>
        <div className={style.info}>
          <div className={style.label}></div>
          <div className={style.label}></div>
          <div className={style.label}></div>
        </div>
      </div>
    </article>
  )
}