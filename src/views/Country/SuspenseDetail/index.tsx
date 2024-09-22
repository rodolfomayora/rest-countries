import { SuspenseFlagImage } from './SuspenseFlagImage';
import { SuspenseData } from './SuspenseData';
import style from './style.module.scss';

export function SuspenseDetail () {
  return (
    <div className={style.SuspenseDetail}>
      <div>
        <SuspenseFlagImage />
      </div>
      <SuspenseData />
    </div>
  )
}