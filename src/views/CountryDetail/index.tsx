// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { useParams, useHistory } from 'react-router-dom';

// import { useTheme } from '../../hooks';
import {
  Layout,
  BackToHomeButton,
  BorderCountryButton
} from '../../components';
import style from './style.module.scss';
import { Container } from '#/components/Container';

// import { CountriesApi } from '#/api/dummy-countries';
// import { CountriesApi } from '#/api/rest-countries';
// import parseDigitsNumber from '#/utils/parseDigitsNumber'
// import { CountryDetails, BorderCountry } from '#/types/Country';
import { Detail } from './Detail';


export default function CountryDetail () {

  // const pageRedirect = useHistory().push;
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