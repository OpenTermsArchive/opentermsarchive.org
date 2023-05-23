import React from 'react';
import classNames from 'classnames';
import s from './CardList.module.css';

export type CardListProps = {
  title?: string;
  titleLevel?: 'h2' | 'h3' | 'h4' | 'h5';
  centerTitle?: boolean;
  subtitle?: string;
  subtitleLevel?: 'h3' | 'h4' | 'h5';
  small?: boolean;
  big?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const CardList: React.FC<CardListProps> = ({
  title,
  titleLevel = 'h2',
  centerTitle,
  subtitle,
  subtitleLevel = 'h3',
  small,
  big,
  children,
  className,
  ...props
}) => {
  const TitleComponent = titleLevel;
  const SubTitleComponent = subtitleLevel;

  return (
    <div className={classNames(s.cardList, className)} {...props}>
      <div
        className={classNames(s.cardList_header, {
          [s.cardList_header__isCenter]: centerTitle === true,
        })}
      >
        {title && <TitleComponent className={classNames(s.cardList_title)}>{title}</TitleComponent>}
        {subtitle && (
          <SubTitleComponent
            className={classNames(s.cardList_subtitle, `${subtitleLevel}__light`)}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></SubTitleComponent>
        )}
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
