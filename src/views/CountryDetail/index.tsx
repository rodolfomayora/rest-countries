import React, { FC } from 'react';
import { Layout, Container } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCountryById } from '../../store/rootSelectors';

const CountryDetail: FC = () => {

  const { id } = useParams<any>();
  const country: any = useSelector(selectCountryById(id));

  const {
    name,
    nativeName,
    flagImage,
    population,
    region,
    subregion,capital,
    topLevelDomain
  } = country;

  return (
    <Layout>
      <main>
        <Container>
          <section>
            <img
              src={flagImage}
              alt={`${name} flag`}
              width="200"
            />
            <h2>{name}</h2>
            <p>Native Name: {nativeName}</p>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Sub Region: {subregion}</p>
            <p>Capital: {capital}</p>
            <p>Top Level Domain: {topLevelDomain}</p>
            <p>Currences: </p>
            <p>Languajes: </p>

            <div>Border Countries: </div>
          </section>
        </Container>
      </main>
    </Layout>
  );
}

export default CountryDetail;