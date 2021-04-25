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

  const mapArrayToText = (arr: Array<string>) => arr.join(', ');

  return (
    <Layout>
      <main className={style.CountryDetail}>
        <Container>
          <section className={style.sectionWrapper}>
            <BackToHomeButton/>

            {!!countryData && (
              <div className={style.infoContainer}>
                <div className={style.flagWrapper}>
                  <div className={style.flagLayer}>
                    <div className={style.flagContent}>
                      <img className={style.flagImage}
                        src={countryData.flagImage}
                        alt={`${countryData.name} flag`}
                        width="200"
                        height="100"
                      />
                    </div>
                  </div>
                </div>

                <div className={style.blockInfo}>
                  <div className={style.countryInfo}>
                    <h2 className={style.countryName}>{countryData.name}</h2>
                    
                    <div className={style.countryData}>
                      <div className={style.data}>
                        <p>
                          <span className={style.label}>
                            Native Name:
                          </span>{' '}
                          {countryData.nativeName}
                        </p>
                        <p>
                          <span className={style.label}>
                            Population:
                          </span>{' '}
                          {countryData.population}
                        </p>
                        <p>
                          <span className={style.label}>
                            Region:
                          </span>{' '}
                          {countryData.region}
                        </p>
                        <p>
                          <span className={style.label}>
                            Sub Region: 
                          </span>{' '}
                          {countryData.subregion}
                        </p>
                        <p>
                          <span className={style.label}>
                            Capital:
                          </span>{' '}
                          {countryData.capital}
                        </p>
                      </div>

                      <div className={style.data}>
                        <p>
                          <span className={style.label}>
                            Top Level Domain:
                          </span>{' '}
                          {countryData.topLevelDomain}
                        </p>
                        <p>
                          <span className={style.label}>
                            Currences:
                          </span>{' '}
                          {mapArrayToText(countryData.currencies ?? [])}
                        </p>
                        <p>
                          <span className={style.label}>
                            Languajes:
                          </span>{' '}
                          {mapArrayToText(countryData.languagesName ?? [])}
                        </p>
                      </div>
                    </div>
                  </div>

                  <section>
                    <h3 className={style.borderSubtitle}>Border Countries:</h3>
                    <div className={style.borderCountries}>
                      {!!countryData.borderCountries?.length ? (
                        countryData.borderCountries.map((countryId: string) => (
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
            )}
          </section>
        </Container>
      </main>
    </Layout>
  );
}

export default CountryDetail;