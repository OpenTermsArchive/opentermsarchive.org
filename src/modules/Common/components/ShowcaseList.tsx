import React from 'react';
import classNames from 'classnames';
import s from './ShowcaseList.module.css';

type ShowcaseListProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ShowcaseList: React.FC<ShowcaseListProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.showcaseList, className)} {...props}>
      {children}
    </div>
  );
};

export default ShowcaseList;
