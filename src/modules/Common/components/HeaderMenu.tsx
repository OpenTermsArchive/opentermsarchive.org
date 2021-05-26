import React from 'react';
import classNames from 'classnames';
import s from './HeaderMenu.module.css';

type HeaderMenuProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const HeaderMenu: React.FC<HeaderMenuProps> = ({ children, className, ...props }) => {
  return (
    <nav className={classNames(s.headerMenu, className)} {...props}>
      {children}
    </nav>
  );
};

export default HeaderMenu;
