import React from 'react';
import s from './Footer.module.css';
import Container from './Container';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container className={s.footer_content}>Footer 123</Container>
    </footer>
  );
};

export default Footer;
