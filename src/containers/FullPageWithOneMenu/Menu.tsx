import React, { useContext } from 'react';

import { Context } from './FullPageWithOneMenu';
import classNames from 'classnames';
import s from './FullPageWithOneMenu.module.scss';

const MainMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => {
  const { menuVisible } = useContext(Context);
  return (
    <aside
      className={classNames(s.menu, { [s['menu--visible']]: menuVisible }, className)}
      {...rest}
    >
      {children}
    </aside>
  );
};

export default MainMenu;
