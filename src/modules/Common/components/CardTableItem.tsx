import * as FeatherIcons from 'react-icons/fi';

import React from 'react';
import classNames from 'classnames';
import s from './CardTableItem.module.css';

type CardTableItemProps = {
  className?: string;
  title: string;
  iconName?: keyof typeof FeatherIcons;
  iconColor?: string;
  desc: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CardTableItem: React.FC<CardTableItemProps> = ({
  children,
  title,
  iconName,
  iconColor = 'var(--colorBlack600)',
  desc,
  className,
  ...props
}) => {
  const icon = iconName
    ? React.createElement(FeatherIcons[iconName], { color: iconColor })
    : undefined;

  return (
    <div className={classNames(s.cardTableItem, className)} {...props}>
      {icon && <div className={classNames(s.cardTableItem_icon)}>{icon}</div>}
      <div className={s.cardTableItem_title}>{title}</div>
      <div className={s.cardTableItem_desc}>{desc}</div>
    </div>
  );
};

export default CardTableItem;
