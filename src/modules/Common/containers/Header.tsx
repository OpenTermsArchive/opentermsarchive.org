import React from 'react';
import LanguageSwitcher from 'modules/I18n/components/LanguageSwitcher';
import s from './Header.module.css';
import Container from './Container';

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.header_content}>
        Header <LanguageSwitcher />{' '}
      </Container>
    </header>
  );
};

export default Header;
