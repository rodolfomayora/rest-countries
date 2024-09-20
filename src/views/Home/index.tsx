import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Container } from '#/components/Container';
import { CountryFilters } from '#/components/CountryFilters';
import { CountriesGrid } from '#/components/CountriesGrid';
import { SuspenseCountriesGrid } from '#/components/SuspenseCountriesGrid';
import { ErrorCountriesGrid } from '#/components/ErrorCountriesGrid';
import { Layout } from '#/components/Layout';
import style from './style.module.scss';

export function Home () {
  return (
    <Layout pageTitle="Home">
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