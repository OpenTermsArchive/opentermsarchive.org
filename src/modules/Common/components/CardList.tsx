import React from 'react';
import classNames from 'classnames';
import s from './CardList.module.css';

type CardListProps = {
  title?: string;
  subtitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CardList: React.FC<CardListProps> = ({ title, subtitle, children, className, ...props }) => {
  return (
    <div className={classNames(s.cardList, className)} {...props}>
      <div className={s.cardList_header}>
        {title && <h2 className={s.cardList_title}>{title}</h2>}
        {subtitle && <h3 className={classNames(s.cardList_subtitle, 'h3__light')}>{subtitle}</h3>}
      </div>
      <div className={classNames(s.cardList_items)}>{children}</div>
    </div>
  );
};

export default CardList;
