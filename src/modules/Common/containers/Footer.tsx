import Logo from '../components/Logo';
import React from 'react';
import classNames from 'classnames';
import s from './Footer.module.css';

type FooterProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<FooterProps> = ({ children, className, ...props }) => {
  return (
    <footer className={classNames(s.footer, className)} {...props}>
      <Logo />
      <div className={classNames(s.footer_menus)}>{children}</div>
    </footer>
  );
};

export default Footer;
