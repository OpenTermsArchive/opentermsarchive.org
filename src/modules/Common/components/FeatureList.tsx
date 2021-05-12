import React from 'react';
import s from './FeatureList.module.css';
import classNames from 'classnames';

type FeatureListProps = {
  // TODO
} & React.HTMLAttributes<HTMLDivElement>;

const FeatureList: React.FC<FeatureListProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.featureList, className)} {...props}>
      {children}
    </div>
  );
};

export default FeatureList;
