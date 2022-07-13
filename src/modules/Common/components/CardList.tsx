import React from 'react';
import classNames from 'classnames';
import s from './CardList.module.css';

type CardListProps = {
  title?: string;
  centerTitle?: boolean;
  subtitle?: string;
  small?: boolean;
  big?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const CardList: React.FC<CardListProps> = ({
  title,
  centerTitle,
  subtitle,
  small,
  big,
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames(s.cardList, className)} {...props}>
      <div
        className={classNames(s.cardList_header, {
          [s.cardList_header__isCenter]: centerTitle === true,
        })}
      >
        {title && <h2 className={classNames(s.cardList_title)}>{title}</h2>}
        {subtitle && <h3 className={classNames(s.cardList_subtitle, 'h3__light')}>{subtitle}</h3>}
      </div>
      <div
        className={classNames(s.cardList_items, {
          [s.cardList_items__isSmall]: small === true,
          [s.cardList_items__isBig]: big === true,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default CardList;
