import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import { useTheme } from '../../hooks';
import {
  CountryFilters
} from '../../components';
import { Container } from '#/components/Container';
import { CountriesGrid } from '#/components/CountriesGrid';
import { SuspenseCountriesGrid } from '#/components/SuspenseCountriesGrid';
import { ErrorCountriesGrid } from '#/components/ErrorCountriesGrid';
import { Layout } from '#/components/Layout';
import style from './style.module.scss';

export function Home () {
  // const homeStyle = useTheme(style.Home, style.light);

  return (
    <Layout pageTitle="Home">
      {/* <main className={homeStyle}> */}
      <main className={style.Home}>
        <Container>
          <div className={style.content}>
            <CountryFilters />
            <ErrorBoundary fallback={<ErrorCountriesGrid />}>
              <Suspense fallback={<SuspenseCountriesGrid />}>
                <CountriesGrid />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Container>
      </main>
    </Layout>
  );
}