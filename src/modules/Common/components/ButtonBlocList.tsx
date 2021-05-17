import React from 'react';
import s from './ButtonBlocList.module.css';
import classNames from 'classnames';

type ButtonBlocListProps = {
  className?: string;
  subTitle: string;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonBlocList: React.FC<ButtonBlocListProps> = ({
  children,
  subTitle,
  title,
  className,
  ...props
}) => {
  return (
    <div className={classNames(s.buttonbloclist, className)} {...props}>
      <div className={classNames(s.buttonbloclist_header)}>
        <div className={classNames(s.buttonbloclist_subtitle, 'text__smallcaps')}>{subTitle}</div>
        <h2 className={classNames(s.buttonbloclist_title)}>{title}</h2>
      </div>
      <div className={classNames(s.buttonbloclist_items)}>{children}</div>
    </div>
  );
};

export default ButtonBlocList;
