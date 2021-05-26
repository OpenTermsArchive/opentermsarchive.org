import React, { useContext } from 'react';

import { Context } from './FullPageWithOneMenu';
import classnames from 'classnames';
import s from './FullPageWithOneMenu.module.scss';

const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => {
  const { toggleMenu } = useContext(Context);

  return (
    <header className={classnames(s.header, className)} {...rest}>
      <button className={s.burger} onClick={toggleMenu}>
        ok
      </button>
      {children}
    </header>
  );
};

export default Header;
