import React from 'react';
import s from './Header.module.css';
import Container from './Container';

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.header_content}>Header</Container>
    </header>
  );
};

export default Header;
