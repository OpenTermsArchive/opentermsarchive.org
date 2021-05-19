import Link from 'next/link';
import Logo from 'modules/Common/components/Logo';
import React from 'react';
import classNames from 'classnames';
import s from './Header.module.css';

type HeaderProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <header className={s.header}>
      <div className={s.header_logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={classNames(s.header_menus)}>{children}</div>
    </header>
  );
};

export default Header;
