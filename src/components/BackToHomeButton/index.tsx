import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import { LongArrowLeftIcon } from '../../assets/images';
import style from './style.module.scss';

const BackToHomeButton: FC = () => {

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.BackToHomeButton,
    light: `${style.BackToHomeButton} ${style.light}`
  }

  return  (
    <Link className={themes[theme]}
      to="/"
    >
      <LongArrowLeftIcon className={style.icon} />
      <span className={style.text}>Back</span>
    </Link>
  );
}

export default BackToHomeButton;