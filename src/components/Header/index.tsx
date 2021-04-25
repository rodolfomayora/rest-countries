import React, { FC } from 'react';
import Container from '../Container';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => (
  <header className={style.Header}>
    <Container>
      <section className={style.headerWrapper}>
        <Link to="/">
          <h1 className={style.mainTitle}>
            Where in the world?
          </h1>
        </Link>
      </section>
    </Container>
  </header>
);

export default Header;