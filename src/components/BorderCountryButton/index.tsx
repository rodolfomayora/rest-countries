import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import { BorderCountryButtonProps } from './types';
import style from './style.module.scss';

const BorderCountryButton: FC<BorderCountryButtonProps> = (props) => {

  const { children, countryId } = props;

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.BorderCountryButton,
    light: `${style.BorderCountryButton} ${style.light}`
  }

  return (
    <Link className={themes[theme]}
      to={`/CountryDetail/${countryId}`}
    >
      {children}
    </Link>
  );
}

export default BorderCountryButton;