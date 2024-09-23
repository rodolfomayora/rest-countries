import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { LongArrowLeftIcon } from '../../assets/images';
import style from './style.module.scss';

export function BackToHomeButton () {
  return  (
    <Link className={style.BackToHomeButton} to={routes.root}>
      <LongArrowLeftIcon className={style.icon} />
      <span className={style.text}>Back</span>
    </Link>
  );
}