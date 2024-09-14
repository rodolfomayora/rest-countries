import { SuspenseCountryCard } from '#/components/SuspenseCountryCard';
import style from './style.module.scss';

type Props = {
  itemsQuantity?: number,
}

export function SuspenseCountriesGrid ({ itemsQuantity = 12 }: Props) {
  const listItems = Array(itemsQuantity).fill(0).map((_, index) => (
    <li key={index}>
      <SuspenseCountryCard style={{ width: 'auto' }} />
    </li>
  ));

  return <ul className={style.SuspenseCountriesGrid}>{listItems}</ul>;
}