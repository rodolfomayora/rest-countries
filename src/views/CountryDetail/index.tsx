import React, { FC } from 'react';
import {
  Layout,
  Container,
  BackToHomeButton,
  BorderCountryButton
} from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCountryById,
  selectAllCountriesById,
} from '../../store/rootSelectors';
import style from './style.module.scss';

const CountryDetail: FC = () => {

  const { id } = useParams<any>();

  const countriesById: any = useSelector(selectAllCountriesById);
  const countryData: any = useSelector(selectCountryById(id));

  const {
    name,
    nativeName,
    flagImage,
    region,
    population,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borderCountries
  } = countryData;

  const mapArrayToText = (arr: Array<string>) => arr.join(', ');

  const currenciesNames: string = mapArrayToText(currencies);

  const languagesName: string = mapArrayToText(languages);

  return (
    <Layout>
      <main className={style.CountryDetail}>
        <Container>
          <section className={style.sectionWrapper}>
            <BackToHomeButton/>

            <div className={style.infoContainer}>
              <div className={style.flagWrapper}>
                <div className={style.flagLayer}>
                  <div className={style.flagContent}>
                    <img className={style.flagImage}
                      src={flagImage}
                      alt={`${name} flag`}
                      width="200"
                      height="100"
                    />
                  </div>
                </div>
              </div>

              <div className={style.blockInfo}>
                <div className={style.countryInfo}>
                  <h2 className={style.countryName}>{name}</h2>
                  
                  <div className={style.countryData}>
                    <div className={style.data}>
                      <p>
                        <span className={style.label}>
                          Native Name:
                        </span>{' '}
                        {nativeName}
                      </p>
                      <p>
                        <span className={style.label}>
                          Population:
                        </span>{' '}
                        {population}
                      </p>
                      <p>
                        <span className={style.label}>
                          Region:
                        </span>{' '}
                        {region}
                      </p>
                      <p>
                        <span className={style.label}>
                          Sub Region: 
                        </span>{' '}
                        {subregion}
                      </p>
                      <p>
                        <span className={style.label}>
                          Capital:
                        </span>{' '}
                        {capital}
                      </p>
                    </div>

                    <div className={style.data}>
                      <p>
                        <span className={style.label}>
                          Top Level Domain:
                        </span>{' '}
                        {topLevelDomain}
                      </p>
                      <p>
                        <span className={style.label}>
                          Currences:
                        </span>{' '}
                        {currenciesNames}
                      </p>
                      <p>
                        <span className={style.label}>
                          Languajes:
                        </span>{' '}
                        {languagesName}
                      </p>
                    </div>
                  </div>
                </div>

                <section>
                  <h3 className={style.borderSubtitle}>Border Countries:</h3>
                  <div className={style.borderCountries}>
                    {!!borderCountries.length ? (
                      borderCountries.map((countryId: string) => (
                        <BorderCountryButton countryId={countryId}
                          key={countryId}
                        >
                          {countriesById[countryId].name}
                        </BorderCountryButton>
                      ))
                    ) : (
                      <div>It does not have Border Countries</div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </Layout>
  );
}

export default CountryDetail;