import React, { FC } from 'react';
import { Layout, BackToHomeButton } from '../../components';
import style from './style.module.scss';

const NoMatch404: FC = () => (
  <Layout>
    <main className={style.NoMatch404}>
      <h2 className={style.errorCode}>404</h2>
      <p>Country not found</p>
      <BackToHomeButton />
    </main>
  </Layout>
);

export default NoMatch404;