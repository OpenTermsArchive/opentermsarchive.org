import Logo from '../components/Logo';
import React from 'react';
import classNames from 'classnames';
import getConfig from 'next/config';
import s from './Footer.module.css';

const { publicRuntimeConfig } = getConfig();

type FooterProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<FooterProps> = ({ children, className, ...props }) => {
  return (
    <footer className={classNames(s.footer, className)} {...props}>
      <Logo />
      <div className={classNames(s.footer_menus)}>{children}</div>
      <div className={classNames(s.version)}>v{publicRuntimeConfig?.version}</div>
    </footer>
  );
};

export default Footer;
