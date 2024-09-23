import style from './style.module.scss';

type Props = {
  countryId: string,
}

export function ErrorDetail ({ countryId }: Props) {
  return (
    <div className={style.ErrorDetial}>
      <h2>Country Not Found</h2>
      <p>NOT valid id: <strong>{countryId}</strong></p>
    </div>
  )
}