import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { CountryBase } from '#/types/Country';
import { CountryCard } from '#/components/CountryCard';
import parseDigitsNumber from '#/utils/parseDigitsNumber';
import style from './style.module.scss';

type Props = {
  countries: CountryBase[],
}

export function CountriesGrid ({ countries }: Props) {
  const listItems = countries.map(({
    region,
    population,
    id,
    flagImage,
    flagDescription,
    commonName,
    capital,
  }) => {
    const countryRoute = routes.country.replace(':id', id);
    return (
      <li key={id}>
        <Link to={countryRoute} style={{ display: 'block' }}>
          <CountryCard
            capital={capital}
            commonName={commonName}
            flagDescription={flagDescription}
            flagImage={flagImage}
            population={parseDigitsNumber(population)}
            region={region}
            style={{ width: 'auto' }}
          />
        </Link>
      </li>
    )
  });

  return <ul className={style.CountriesGrid}>{listItems}</ul>
}