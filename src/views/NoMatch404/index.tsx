import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import { Layout, BackToHomeButton } from '../../components';
import style from './style.module.scss';

const NoMatch404: FC = () => {

  const theme = useSelector(selectTheme);

  const themes = {
    default: style.NoMatch404,
    light: `${style.NoMatch404} ${style.light}`
  }

  return (
    <Layout pageTitle="404">
      <main className={themes[theme]}>
        <h2 className={style.errorCode}>404</h2>
        <p>Country not found</p>
        <BackToHomeButton />
      </main>
    </Layout>
  );
}

export default NoMatch404;