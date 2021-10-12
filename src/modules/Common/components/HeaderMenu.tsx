import React from 'react';
import classNames from 'classnames';
import s from './HeaderMenu.module.css';

type HeaderMenuProps = {
  className?: string;
  type?: 'primary' | 'secondary';
} & React.HTMLAttributes<HTMLDivElement>;

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  children,
  className,
  type = 'primary',
  ...props
}) => {
  const classes = classNames(
    s.headerMenu,
    {
      [s.headerMenu__primary]: type === 'primary',
      [s.headerMenu__secondary]: type === 'secondary',
    },
    className
  );

  return (
    <nav className={classes} {...props}>
      {children}
    </nav>
  );
};

export default HeaderMenu;
