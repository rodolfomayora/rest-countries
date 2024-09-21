import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { Container } from '#/components/Container';
import { ToggleThemeButton } from '#/components/ToggleThemeButton';
import style from './style.module.scss';

export function Header () {
  return (
    <header className={style.Header}>
      <Container>
        <section className={style.headerWrapper}>
          <Link to={routes.root}>
            <h1 className={style.mainTitle}>
              Where in the world?
            </h1>
          </Link>
          <div className={style.buttonWrapper}>
            <ToggleThemeButton />
          </div>
        </section>
      </Container>
    </header>
  );
}