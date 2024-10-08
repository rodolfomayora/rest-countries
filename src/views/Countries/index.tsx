import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from '#/components/Layout';
import { Container } from '#/components/Container';
import { CountryFilters } from './CountryFilters';
import { CountriesDisplay } from './CountriesDisplay';
import { SuspenseCountriesGrid } from './CountriesDisplay/SuspenseCountriesGrid';
import { ErrorCountriesGrid } from './CountriesDisplay/ErrorCountriesGrid';
import style from './style.module.scss';

export function Countries () {
  return (
    <Layout pageTitle="Home">
      <main className={style.Countries}>
        <Container>
          <div className={style.content}>
            <CountryFilters />
            <ErrorBoundary fallback={<ErrorCountriesGrid />}>
              <Suspense fallback={<SuspenseCountriesGrid />}>
                <CountriesDisplay />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Container>
      </main>
    </Layout>
  );
}