import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import Container from '../Container';
import ToggleThemeButton from '../ToggleThemeButton';
import style from './style.module.scss';

const Header: FC = () => {

  const theme = useSelector(selectTheme);

  const themes: any = {
    default: style.Header,
    light: `${style.Header} ${style.light}`
  }

  return (
    <header className={themes[theme]}>
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

export default Header;