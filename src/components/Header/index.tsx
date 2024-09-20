import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import { Container } from '#/components/Container';
import ToggleThemeButton from '../ToggleThemeButton';
import style from './style.module.scss';

export function Header () {
  const headerStyle = useTheme(style.Header, style.light);
  return (
    <header className={headerStyle}>
      <Container>
        <section className={style.headerWrapper}>
          <Link to="/">
            <h1 className={style.mainTitle}>
              Where in the world?
            </h1>
          </Link>
          
          <ToggleThemeButton />
        </section>
      </Container>
    </header>
  );
}