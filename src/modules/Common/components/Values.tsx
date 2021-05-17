import React from 'react';
import classNames from 'classnames';
import s from './Values.module.css';

type ValuesProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Values: React.FC<ValuesProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.values, className)} {...props}>
      {children}
    </div>
  );
};

export default Values;
