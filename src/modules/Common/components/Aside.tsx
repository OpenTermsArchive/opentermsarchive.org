import React from 'react';
import s from './Aside.module.css';

type AsideProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Aside: React.FC<AsideProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}: AsideProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <aside {...props} className={s.aside}>
      {children}
    </aside>
  );
};

export default Aside;
