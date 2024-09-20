import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CountryDetails, BorderCountry } from '#/types/Country';
// import { CountriesApi } from '#/api/dummy-countries';
import { CountriesApi } from '#/api/rest-countries';
import style from './style.module.scss';

import { BorderCountryButton } from '#/components/BorderCountryButton';
import { SuspenseFlagImage } from './SuspenseFlagImage';
import { SuspenseData } from './SuspenseData';

const mapArrayToText = (arr: Array<string>) => arr.join(', ');

type Props = {
  countryId: string,
}

export function Detail ({ countryId }: Props) {
  const pageRedirect = useHistory().push;
  
  const [isLoading, setIsLoading] = useState(true);
  const [countryData, setCountryData] = useState<CountryDetails | null>(null);
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const result = await CountriesApi.getById(countryId);
        await new Promise((resolve) => window.setTimeout(resolve, 2000))
        setCountryData(result);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        return pageRedirect('/404');
      }
    })()
  }, [countryId])


  const [borderCountries, setBorderCountries] = useState<BorderCountry[] | null>();
  useEffect(() => {
    (async () => {
      if (!countryData) return;

      try {
        const { borderCountries } = countryData;
        const hasBorderCountries = borderCountries.length > 0;
        if (!hasBorderCountries) {
          setBorderCountries([]);
          return setIsLoading(false);
        }
        const result = await CountriesApi.getBorderCountries(borderCountries);
        setBorderCountries(result);

      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }

      } finally {
        setIsLoading(false);

      }

    })()
  }, [countryData])

  if (isLoading) return (
    <div className={style.Detail}>
      <div>
        <SuspenseFlagImage />
      </div>
      <SuspenseData />
    </div>
  )

  const capital = countryData?.capital || 'Has no capital'
  const subregion = countryData?.subregion || 'Has no subregion';
  const topLevelDomain = mapArrayToText(countryData?.topLevelDomain ?? []) || 'Has no top level domain';
  const currencies = mapArrayToText(countryData?.currencies ?? []) || 'Has no currencies';
  const languages = mapArrayToText(countryData?.languages ?? []) || 'Has no languajes';

  function generateList (borderCountries: any) {
    if (!borderCountries) return null;
    return borderCountries.length === 0
    ? <div>It does not have Border Countries</div>
    // @ts-ignore
    : borderCountries.map((country) => (
      <BorderCountryButton key={country.id} countryId={country.id}>
        {country.commonName}
      </BorderCountryButton>
    ))
  }
  const listItems = generateList(borderCountries);

  return (
    <div className={style.Detail}>
      <div>
        <img className={style.flagImage}
          src={countryData?.flagImage}
          alt={countryData?.flagDescription}
          width="200"
          height="100"
          loading="eager"
          decoding="sync"
        />
      </div>

      <div className={style.countryInfo}>
        <h2 className={style.countryName}>{countryData?.commonName}</h2>

        <div className={style.dataWrapper}>
          <div className={style.data}>
            <p>
              <span className={style.label}>Official Name:</span>
              {countryData?.officialName}
            </p>
            <p>
              <span className={style.label}>Population:</span>
              {countryData?.population}
            </p>
            <p>
              <span className={style.label}>Region:</span>
              {countryData?.region}
            </p>
            <p>
              <span className={style.label}>Sub Region: </span>
              {subregion}
            </p>
            <p>
              <span className={style.label}>Capital:</span>
              {capital}
            </p>
          </div>
          <div className={style.data}>
            <p>
              <span className={style.label}>Top Level Domains:</span>
              {topLevelDomain}
            </p>
            <p>
              <span className={style.label}>Currences:</span>
              {currencies}
            </p>
            <p>
              <span className={style.label}>languages:</span>
              {languages}
            </p>
          </div>
        </div>

        <section>
          <h3 className={style.borderSubtitle}>Border Countries:</h3>
          <div className={style.borderCountries}>
            {listItems}
          </div>
        </section>
      </div>
    </div>
  )
}