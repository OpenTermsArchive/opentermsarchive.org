import React from 'react';
import classNames from 'classnames';
import s from './FooterMenu.module.css';

type FooterMenuProps = {
  small?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FooterMenu: React.FC<FooterMenuProps> = ({
  children,
  small = false,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(s.footerMenu, { [s.footerMenu__isSmall]: !!small }, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default FooterMenu;
