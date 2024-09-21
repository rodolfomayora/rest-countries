import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { useTheme } from '../../hooks';
import { LongArrowLeftIcon } from '../../assets/images';
import style from './style.module.scss';

export function BackToHomeButton () {

  const backButtonStyle = useTheme(style.BackToHomeButton, style.light);

  return  (
    <Link className={backButtonStyle} to={routes.root}>
      <LongArrowLeftIcon className={style.icon} />
      <span className={style.text}>Back</span>
    </Link>
  );
}