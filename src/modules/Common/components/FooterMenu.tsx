import React from 'react';
import classNames from 'classnames';
import s from './FooterMenu.module.css';

type FooterMenuProps = {
  small?: boolean;
  align?: 'left' | 'right';
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FooterMenu: React.FC<FooterMenuProps> = ({
  children,
  small = false,
  align = 'left',
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.footerMenu,
        { [s.footerMenu__isSmall]: !!small },
        align === 'right' ? s.footerMenu__alignRight : null,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default FooterMenu;
