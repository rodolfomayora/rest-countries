import { useSuspenseQuery } from '@tanstack/react-query';
import { CountryDetails, BorderCountry } from '#/types/Country';
// import { CountriesApi } from '#/api/dummy-countries';
import { CountriesApi } from '#/api/rest-countries';
import { BorderCountryButton } from '#/components/BorderCountryButton';
import style from './style.module.scss';

const mapArrayToText = (arr: Array<string>) => arr.join(', ');

type Props = {
  countryId: CountryDetails['id'],
}

export function Detail ({ countryId }: Props) {

  const { data: countryData } = useSuspenseQuery<CountryDetails>({
    queryKey: ['countries', countryId],
    queryFn: () => CountriesApi.getById(countryId),
  })

  const { data: borderCountries } = useSuspenseQuery<BorderCountry[]>({
    queryKey: ['countries', countryId, 'border'],
    queryFn: async () => {
      const borderCountriesIds = countryData.borderCountries;
      const hasBorderCountries = !!borderCountriesIds && borderCountriesIds.length > 0;
      if (!hasBorderCountries) return []; // no border countries, then no request
      return await CountriesApi.getBorderCountries(borderCountriesIds);
    },
  })

  const capital = countryData?.capital || 'Has no capital'
  const subregion = countryData?.subregion || 'Has no subregion';
  const topLevelDomain = mapArrayToText(countryData?.topLevelDomain ?? []) || 'Has no top level domain';
  const currencies = mapArrayToText(countryData?.currencies ?? []) || 'Has no currencies';
  const languages = mapArrayToText(countryData?.languages ?? []) || 'Has no languajes';

  const listItems = borderCountries.length === 0
    ? <div>It does not have Border Countries</div>
    : borderCountries.map(({ id, commonName }) => (
      <BorderCountryButton key={id} countryId={id}>
        {commonName}
      </BorderCountryButton>
    ))

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
              {countryData.officialName}
            </p>
            <p>
              <span className={style.label}>Population:</span>
              {countryData.population}
            </p>
            <p>
              <span className={style.label}>Region:</span>
              {countryData.region}
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