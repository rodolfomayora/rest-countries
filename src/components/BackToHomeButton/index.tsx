import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import { LongArrowLeftIcon } from '../../assets/images';
import style from './style.module.scss';

const BackToHomeButton: FC = () => {

  const backButtonStyle = useTheme(style.BackToHomeButton, style.light);

  return  (
    <Link className={backButtonStyle}
      to="/"
    >
      <LongArrowLeftIcon className={style.icon} />
      <span className={style.text}>Back</span>
    </Link>
  );
}

export default BackToHomeButton;