import React, { FC } from 'react';

import { useTheme } from '../../hooks';

import { Layout, BackToHomeButton } from '../../components';
import style from './style.module.scss';

const NoMatch404: FC = () => {

  const noMatch404Style = useTheme(style.NoMatch404, style.light);

  return (
    <Layout pageTitle="404">
      <main className={noMatch404Style}>
        <h2 className={style.errorCode}>404</h2>
        <p>Country not found</p>
        <BackToHomeButton />
      </main>
    </Layout>
  );
}

export default NoMatch404;