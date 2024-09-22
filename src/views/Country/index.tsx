import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { Layout } from '#/components/Layout';
import { Container } from '#/components/Container';
import { BackToHomeButton } from '#/components/BackToHomeButton';
import { Detail } from './Detail';
import { SuspenseDetail } from './SuspenseDetail';
import { ErrorDetail } from './ErrorDetail';
import style from './style.module.scss';

export function Country () {
  const { id } = useParams<{ id: string }>();
  return (
    <Layout pageTitle="Country">
      <main className={style.CountryDetail}>
        <Container>
          <section className={style.sectionWrapper}>
            <BackToHomeButton/>
            <ErrorBoundary fallback={<ErrorDetail countryId={id} />}>
              <Suspense fallback={<SuspenseDetail />}>
                <Detail countryId={id} />
              </Suspense>
            </ErrorBoundary>
          </section>
        </Container>
      </main>
    </Layout>
  );
}