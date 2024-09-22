import style from './style.module.scss';

export function SuspenseData () {
  return (
    <div className={style.SuspenseData}>
      <div className={style.countryName}></div>

      <div className={style.dataWrapper}>
        <div className={style.data}>
          <div className={style.label}></div>
          <div className={style.label}></div>
          <div className={style.label}></div>
          <div className={style.label}></div>
          <div className={style.label}></div>
        </div>
        <div className={style.data}>
          <div className={style.label}></div>
          <div className={style.label}></div>
          <div className={style.label}></div>
        </div>
      </div>

      <section>
        <div className={style.borderSubtitle}></div>
        <div className={style.borderCountries}></div>
      </section>
    </div>
  )
}