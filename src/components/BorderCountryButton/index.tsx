import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import { BorderCountryButtonProps } from './types';
import style from './style.module.scss';

const BorderCountryButton: FC<BorderCountryButtonProps> = (props) => {

  const { children, countryId } = props;

  const borderCountryButton = useTheme(style.BorderCountryButton, style.light);

  return (
    <Link className={borderCountryButton}
      to={`/CountryDetail/${countryId}`}
    >
      {children}
    </Link>
  );
}

export default BorderCountryButton;