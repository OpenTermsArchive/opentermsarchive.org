import * as FeatherIcons from 'react-icons/fi';

import React from 'react';
import classNames from 'classnames';
import s from './ButtonBloc.module.css';

type ButtonBlocProps = {
  className?: string;
  title?: string;
  desc?: string;
  iconName?: keyof typeof FeatherIcons;
  iconColor?: string;
  fillParent?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonBloc: React.FC<ButtonBlocProps> = ({
  children,
  iconName,
  iconColor = '#0496FF',
  fillParent = false,
  title,
  desc,
  className,
  ...props
}) => {
  const icon = iconName
    ? React.createElement(FeatherIcons[iconName], { color: iconColor })
    : undefined;

  return (
    <div
      className={classNames(
        s.buttonBloc,
        { [s.buttonBloc__fillParent]: fillParent === true },
        className
      )}
      {...props}
    >
      {icon ? <div className={classNames(s.buttonBloc_icon)}>{icon}</div> : undefined}
      {title ? <h3 className={classNames(s.buttonBloc_title)}>{title}</h3> : undefined}
      {desc ? <p className={classNames(s.buttonBloc_desc)}>{desc}</p> : undefined}
      <div className={classNames(s.buttonBloc_actions)}>{children}</div>
    </div>
  );
};

export default ButtonBloc;
