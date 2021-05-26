import React from 'react';
import s from './FullPageWithOneMenu.module.scss';

const Main: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <main className={`${s.main} ${className}`} {...rest}>
    {children}
  </main>
);
export default Main;
