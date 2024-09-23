import type { ReactNode } from 'react';
import { routes } from '#/config/routes';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

type Props = {
  children: ReactNode,
  countryId: string,
}

export function BorderCountryButton ({ children, countryId }: Props) {
  const countryRoute = routes.country.replace(':id', countryId);
  return (
    <Link className={style.BorderCountryButton} to={countryRoute}>
      {children}
    </Link>
  );
}