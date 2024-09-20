import { useParams } from 'react-router-dom';
// import { useTheme } from '../../hooks';
import { BackToHomeButton } from '../../components';
import style from './style.module.scss';
import { Container } from '#/components/Container';
// import { BorderCountryButton } from '#/components/BorderCountryButton';
import { Layout } from '#/components/Layout';
import { Detail } from './Detail';

export function CountryDetail () {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout pageTitle="Country Detail">
      <main className={style.CountryDetail}>
        <Container>
          <section className={style.sectionWrapper}>
            <BackToHomeButton/>
            <Detail countryId={id} />
          </section>
        </Container>
      </main>
    </Layout>
  );
}