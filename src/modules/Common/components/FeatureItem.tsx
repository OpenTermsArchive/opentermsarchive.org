import React from 'react';
import s from './FeatureItem.module.css';
import classNames from 'classnames';
import * as FeatherIcons from 'react-icons/fi';

type FeatureItemProps = {
  iconName: keyof typeof FeatherIcons;
  iconColor?: string;
  title: string;
  desc: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FeatureItem: React.FC<FeatureItemProps> = ({
  children,
  iconName,
  iconColor = '#0496FF',
  title,
  desc,
  className,
  ...props
}) => {
  const icon = React.createElement(FeatherIcons[iconName], { color: iconColor });
  return (
    <div className={classNames(s.featureItem, className)} {...props}>
      <div className={s.featureItem_icon}>{icon}</div>
      <div className={s.featureItem_info}>
        <h4 className={classNames(s.featureItem_title)}>{title}</h4>
        <div className={classNames('text__light', s.featureItem_desc)}>{desc}</div>
      </div>
    </div>
  );
};

export default FeatureItem;
