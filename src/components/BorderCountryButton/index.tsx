import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import style from './style.module.scss';

type Props = {
  children: ReactNode,
  countryId: string,
}

export default function BorderCountryButton ({ children, countryId }: Props) {
  const borderCountryButton = useTheme(style.BorderCountryButton, style.light);
  return (
    <Link className={borderCountryButton}
      to={`/CountryDetail/${countryId}`}
    >
      {children}
    </Link>
  );
}