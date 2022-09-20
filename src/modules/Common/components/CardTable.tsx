import React from 'react';
import classNames from 'classnames';
import s from './CardTable.module.css';

type CardTableProps = React.HTMLAttributes<HTMLDivElement>;

const CardTable: React.FC<CardTableProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.cardTable, className)} {...props}>
      {children}
    </div>
  );
};

export default CardTable;
