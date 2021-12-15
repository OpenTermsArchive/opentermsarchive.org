import React from 'react';
import classNames from 'classnames';
import s from './Divider.module.css';

type DividerProps = React.HTMLAttributes<HTMLDivElement>;

const Divider: React.FC<DividerProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.divider, className)} {...props}>
      <hr />
      {children}
    </div>
  );
};

export default Divider;
