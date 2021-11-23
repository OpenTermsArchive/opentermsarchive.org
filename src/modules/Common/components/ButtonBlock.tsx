import * as FeatherIcons from 'react-icons/fi';

import React from 'react';
import classNames from 'classnames';
import s from './ButtonBlock.module.css';

type ButtonBlocProps = {
  className?: string;
  title?: string;
  desc?: string;
  iconName?: keyof typeof FeatherIcons;
  iconColor?: string;
  fillParent?: boolean;
  dark?: boolean;
  white?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonBloc: React.FC<ButtonBlocProps> = ({
  children,
  iconName,
  iconColor = '#0496FF',
  fillParent = false,
  title,
  desc,
  dark = false,
  white = false,
  className,
  ...props
}) => {
  const icon = iconName
    ? React.createElement(FeatherIcons[iconName], { color: iconColor })
    : undefined;

  return (
    <div
      className={classNames(
        s.buttonBlock,
        { [s.buttonBlock__fillParent]: fillParent === true },
        { [s.buttonBlock__isDark]: dark === true },
        { [s.buttonBlock__isWhite]: white === true },
        className
      )}
      {...props}
    >
      {icon ? <div className={classNames(s.buttonBlock_icon)}>{icon}</div> : undefined}
      {title ? <h3 className={classNames(s.buttonBlock_title)}>{title}</h3> : undefined}
      {desc ? <p className={classNames(s.buttonBlock_desc)}>{desc}</p> : undefined}
      <div className={classNames(s.buttonBlock_actions)}>{children}</div>
    </div>
  );
};

export default ButtonBloc;
