import React from 'react';
import classNames from 'classnames';
import s from './Column.module.css';

type ColumnProps = {
  className?: string;
  width: number;
  title?: string;
  subtitle?: string;
  alignX?: 'center' | 'right'; //Default positionning is left
  alignY?: 'center' | 'bottom'; //Default positionning is top
  hideOnTablet?: boolean;
  mobileOrder?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const Column: React.FC<ColumnProps> = ({
  children,
  width,
  title,
  subtitle,
  alignX,
  alignY,
  hideOnTablet = false,
  mobileOrder = 0,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.column,
        s[`column__${width}`],
        { [s.column__hasAlign]: alignX != undefined || alignY != undefined },
        s[`column__alignX${alignX}`],
        s[`column__alignY${alignY}`],
        { [s.column__hideOnTablet]: hideOnTablet === true },
        s[`column__mobile__order${mobileOrder}`],
        className
      )}
      {...props}
    >
      <div className={s.column_header}>
        {subtitle ? (
          <div className={classNames('text__smallcaps', s.column_subtitle)}>{subtitle}</div>
        ) : undefined}
        {title ? <h2 className={s.column_title}>{title}</h2> : undefined}
      </div>
      <div className={s.column_desc}>{children}</div>
    </div>
  );
};

export default Column;
