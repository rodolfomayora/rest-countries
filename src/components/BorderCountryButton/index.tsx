import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import { BorderCountryButtonProps } from './types';


const BorderCountryButton: FC<BorderCountryButtonProps> = ({
  children,
  countryId
}) => (
  <Link className={style.BorderCountryButton}
    to={`/${countryId}`}
  >
    {children}
  </Link>
);

export default BorderCountryButton;