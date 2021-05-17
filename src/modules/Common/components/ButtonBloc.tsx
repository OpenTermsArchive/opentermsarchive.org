import React from 'react';
import s from './ButtonBloc.module.css';
import classNames from 'classnames';
import * as FeatherIcons from 'react-icons/fi';

type ButtonBlocProps = {
  className?: string;
  tilte?: string;
  desc?: string;
  iconName?: keyof typeof FeatherIcons;
  iconColor?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonBloc: React.FC<ButtonBlocProps> = ({
  children,
  iconName,
  iconColor = '#0496FF',
  title,
  desc,
  className,
  ...props
}) => {
  const icon = iconName
    ? React.createElement(FeatherIcons[iconName], { color: iconColor })
    : undefined;

  return (
    <div className={classNames(s.buttonbloc, className)} {...props}>
      {icon ? <div className={classNames(s.buttonbloc_icon)}>{icon}</div> : undefined}
      {title ? <h3 className={classNames(s.buttonbloc_title)}>{title}</h3> : undefined}
      {desc ? <p className={classNames(s.buttonbloc_desc)}>{desc}</p> : undefined}
      <div className={classNames(s.buttonbloc_actions)}>{children}</div>
    </div>
  );
};

export default ButtonBloc;
