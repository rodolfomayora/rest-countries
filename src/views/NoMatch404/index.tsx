import { BackToHomeButton } from '../../components';
import { Layout } from '#/components/Layout';
import style from './style.module.scss';

export function NoMatch404 () {
  return (
    <Layout pageTitle="404">
      <main className={style.NoMatch404}>
        <h2 className={style.errorCode}>404</h2>
        <p>Country not found</p>
        <BackToHomeButton />
      </main>
    </Layout>
  );
}