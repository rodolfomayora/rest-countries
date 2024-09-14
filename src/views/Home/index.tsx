// import { useTheme } from '../../hooks';
import {
  CountryFilters
} from '../../components';
import { Container } from '#/components/Container';
import { CountriesGrid } from '#/components/CountriesGrid';
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
            {/* <CountryFilters /> */}
            <CountriesGrid />
          </div>
        </Container>
      </main>
    </Layout>
  );
}