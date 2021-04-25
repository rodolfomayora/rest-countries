import React, { FC } from 'react';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import { LongArrowLeftIcon } from '../../assets/images';

const BackToHomeButton: FC = () => (
  <Link className={style.BackToHomeButton}
    to="/"
  >
    <LongArrowLeftIcon className={style.icon} />
    <span className={style.text}>Back</span>
  </Link>
);

export default BackToHomeButton;